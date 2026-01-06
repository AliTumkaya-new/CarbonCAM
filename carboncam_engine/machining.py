from __future__ import annotations


def _parse_hhmm_to_minutes(value: str) -> int:
    """Parses 'HH:MM' into minutes since midnight."""

    parts = value.strip().split(":")
    if len(parts) != 2:
        raise ValueError("time must be in HH:MM format")
    hour = int(parts[0])
    minute = int(parts[1])
    if hour < 0 or hour > 23:
        raise ValueError("hour must be between 0 and 23")
    if minute < 0 or minute > 59:
        raise ValueError("minute must be between 0 and 59")
    return hour * 60 + minute


def _overlap_minutes(a_start: int, a_end: int, b_start: int, b_end: int) -> int:
    start = max(a_start, b_start)
    end = min(a_end, b_end)
    return max(0, end - start)


def estimate_energy_cost(
    *,
    total_energy_kwh: float,
    tariff_type: str,
    operation_start_hhmm: str,
    operation_end_hhmm: str | None,
    process_time_minutes: float,
    currency: str = "TRY",
    # Rates (per kWh)
    single_rate_per_kwh: float | None = None,
    day_rate_per_kwh: float | None = None,
    peak_rate_per_kwh: float | None = None,
    night_rate_per_kwh: float | None = None,
    # Time window boundaries (minutes since midnight)
    day_start_min: int = 6 * 60,
    peak_start_min: int = 17 * 60,
    night_start_min: int = 22 * 60,
) -> dict[str, float | str]:
    """Estimates electricity cost using Single or 3-time (Multi) tariff.

    - Single: cost = kWh * single_rate_per_kwh
    - Multi: splits the operation duration across Day/Peak/Night windows and applies
      weighted average rate.
    """

    if total_energy_kwh < 0:
        raise ValueError("total_energy_kwh must be >= 0")
    if process_time_minutes <= 0:
        raise ValueError("process_time_minutes must be > 0")

    tariff = tariff_type.strip().lower()
    start_min = _parse_hhmm_to_minutes(operation_start_hhmm)

    if operation_end_hhmm:
        end_min = _parse_hhmm_to_minutes(operation_end_hhmm)
        if end_min <= start_min:
            end_min += 24 * 60
        duration_min = float(end_min - start_min)
    else:
        duration_min = float(process_time_minutes)
        end_min = start_min + int(round(duration_min))

    # Use provided process_time_minutes as the authoritative duration for cost split.
    # If end time is provided, we still compute split using that range.
    effective_duration_min = duration_min if operation_end_hhmm else float(process_time_minutes)
    interval_start = start_min
    interval_end = start_min + int(round(effective_duration_min))

    if tariff == "single":
        if single_rate_per_kwh is None or single_rate_per_kwh <= 0:
            raise ValueError("single_rate_per_kwh must be provided and > 0 for Single tariff")
        return {
            "energy_cost": float(total_energy_kwh) * float(single_rate_per_kwh),
            "energy_currency": currency,
            "applied_rate_per_kwh": float(single_rate_per_kwh),
            "minutes_day": 0.0,
            "minutes_peak": 0.0,
            "minutes_night": float(effective_duration_min),
        }

    if tariff != "multi":
        raise ValueError("tariff_type must be 'Single' or 'Multi'")

    if day_rate_per_kwh is None or peak_rate_per_kwh is None or night_rate_per_kwh is None:
        raise ValueError("day/peak/night rates must be provided for Multi tariff")
    if day_rate_per_kwh <= 0 or peak_rate_per_kwh <= 0 or night_rate_per_kwh <= 0:
        raise ValueError("day/peak/night rates must be > 0")

    # Define windows for a day. Night wraps around midnight.
    windows = {
        "day": [(day_start_min, peak_start_min)],
        "peak": [(peak_start_min, night_start_min)],
        "night": [(night_start_min, 24 * 60), (0, day_start_min)],
    }

    minutes_day = 0
    minutes_peak = 0
    minutes_night = 0

    # Compute overlaps for up to two days (handles crossing midnight).
    for offset in (0, 24 * 60):
        for seg_start, seg_end in windows["day"]:
            minutes_day += _overlap_minutes(interval_start, interval_end, seg_start + offset, seg_end + offset)
        for seg_start, seg_end in windows["peak"]:
            minutes_peak += _overlap_minutes(interval_start, interval_end, seg_start + offset, seg_end + offset)
        for seg_start, seg_end in windows["night"]:
            minutes_night += _overlap_minutes(interval_start, interval_end, seg_start + offset, seg_end + offset)

    total_minutes = max(1, interval_end - interval_start)
    weighted_rate = (
        (minutes_day * float(day_rate_per_kwh))
        + (minutes_peak * float(peak_rate_per_kwh))
        + (minutes_night * float(night_rate_per_kwh))
    ) / float(total_minutes)

    return {
        "energy_cost": float(total_energy_kwh) * float(weighted_rate),
        "energy_currency": currency,
        "applied_rate_per_kwh": float(weighted_rate),
        "minutes_day": float(minutes_day),
        "minutes_peak": float(minutes_peak),
        "minutes_night": float(minutes_night),
    }


def calculate_machining_carbon(
    initial_weight_kg: float,
    final_weight_kg: float,
    process_time_minutes: float,
    kc_value: float,
    standby_power_kw: float,
    carbon_intensity: float,
    density: float,
) -> dict[str, float]:
    """Talaşlı imalat enerji tüketimi ve CO2 hesabı.

    Parametre birimleri (önerilen):
    - initial_weight_kg, final_weight_kg: kg
    - process_time_minutes: dakika
    - kc_value: (kullanılan modele göre) enerji katsayısı
    - standby_power_kw: kW
    - carbon_intensity: kgCO2 / kWh
    - density: kg / m^3  (örn. çelik ~7850)

    Dönüş:
    - removed_material_weight_kg
    - removed_volume_cm3
    - processing_energy_kwh
    - idle_energy_kwh
    - total_energy_kwh
    - total_carbon_kg
    """

    if initial_weight_kg < 0 or final_weight_kg < 0:
        raise ValueError("Weights must be non-negative.")
    if final_weight_kg > initial_weight_kg:
        raise ValueError("final_weight_kg cannot be greater than initial_weight_kg.")
    if process_time_minutes <= 0:
        raise ValueError("process_time_minutes must be > 0.")
    if kc_value <= 0:
        raise ValueError("kc_value must be > 0.")
    if standby_power_kw < 0:
        raise ValueError("standby_power_kw must be >= 0.")
    if carbon_intensity <= 0:
        raise ValueError("carbon_intensity must be > 0.")
    if density <= 0:
        raise ValueError("density must be > 0.")

    removed_material_weight = initial_weight_kg - final_weight_kg

    # removed_volume_cm3 = removed_mass(kg) / density(kg/m^3) -> m^3, sonra cm^3'e çevir
    removed_volume_cm3 = (removed_material_weight / density) * 1_000_000.0

    # Kesme Enerjisi (Processing Energy): (Volume * Kc) / 60 / 1000 / 0.85
    processing_energy_kwh = (removed_volume_cm3 * kc_value) / 60.0 / 1000.0 / 0.85

    # Boşta Bekleme Enerjisi (Idle Energy): standby_power_kw * (process_time_minutes / 60)
    idle_energy_kwh = standby_power_kw * (process_time_minutes / 60.0)

    total_energy_kwh = processing_energy_kwh + idle_energy_kwh
    total_carbon = total_energy_kwh * carbon_intensity

    return {
        "removed_material_weight_kg": removed_material_weight,
        "removed_volume_cm3": removed_volume_cm3,
        "processing_energy_kwh": processing_energy_kwh,
        "idle_energy_kwh": idle_energy_kwh,
        "total_energy_kwh": total_energy_kwh,
        "total_carbon_kg": total_carbon,
    }


if __name__ == "__main__":
    result = calculate_machining_carbon(
        initial_weight_kg=10.0,
        final_weight_kg=9.2,
        process_time_minutes=30.0,
        kc_value=2400.0,
        standby_power_kw=1.5,
        carbon_intensity=0.44,
        density=7850.0,
    )

    print(result)
