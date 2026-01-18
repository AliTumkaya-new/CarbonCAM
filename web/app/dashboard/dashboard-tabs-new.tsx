"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

// Icons
const CalculatorIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

const CameraIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
    />
  </svg>
);

const CodeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
    />
  </svg>
);

const BoltIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
    />
  </svg>
);

const ImageIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);

type Tab = "calculator" | "upload" | "api";

type CalculationResult = {
  total_carbon_kg: number;
  total_energy_kwh: number;
  processing_energy_kwh: number;
  idle_energy_kwh: number;
  removed_material_weight_kg?: number;
  removed_volume_cm3?: number;
  machine_name?: string;
  material_name?: string;
};

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
  preview?: string;
  status: "uploading" | "analyzing" | "ready" | "calculating" | "done" | "error";
  analysis?: {
    machine_type: string;
    machine_key: string;
    category: string;
    confidence: number;
    confidence_percent: number;
    description: string;
    detected_brand?: string;
    detected_model?: string;
    additional_info?: string;
  };
  specifications?: {
    standby_power_kw: number;
    operating_power_kw: number;
    efficiency_percent: number;
    description: string;
  };
  // User selections for brand/model
  selectedBrand?: string;
  selectedModel?: string;
  customPowerKw?: number;
  calculationResult?: {
    total_carbon_kg: number;
    total_energy_kwh: number;
    operating_energy_kwh: number;
    standby_energy_kwh: number;
    equivalents: {
      trees_needed: number;
      car_km_equivalent: number;
      smartphone_charges: number;
    };
  };
  operatingHours?: string;
  standbyHours?: string;
  errorMessage?: string;
};

// Comprehensive Brand Database with accurate power specifications from datasheets
// Includes major global manufacturers for industrial machinery
const BRAND_DATABASE: Record<string, { brands: { name: string; models: { name: string; power_kw: number }[] }[] }> = {
  cnc_machine: {
    brands: [
      { name: "Mazak", models: [
        { name: "VTC-800/30SR", power_kw: 30 }, { name: "Quick Turn 250MY", power_kw: 18.5 }, { name: "Integrex i-200S", power_kw: 30 },
        { name: "VCN-530C", power_kw: 22 }, { name: "Variaxis i-700", power_kw: 37 }, { name: "HCN-5000", power_kw: 37 },
        { name: "Quick Turn 200MSY", power_kw: 15 }, { name: "Integrex e-420H", power_kw: 30 }, { name: "OPTIPLEX 3015 DDL", power_kw: 45 }
      ]},
      { name: "DMG Mori", models: [
        { name: "DMU 50", power_kw: 25 }, { name: "NLX 2500/700", power_kw: 22 }, { name: "CTX beta 800 TC", power_kw: 20 },
        { name: "DMC 850V", power_kw: 28 }, { name: "NTX 1000", power_kw: 22 }, { name: "CMX 600V", power_kw: 18.5 },
        { name: "DMU 80 eVo", power_kw: 35 }, { name: "CLX 450", power_kw: 14 }, { name: "NLX 4000", power_kw: 37 }
      ]},
      { name: "Haas", models: [
        { name: "VF-2", power_kw: 22.4 }, { name: "ST-10", power_kw: 11.2 }, { name: "UMC-750", power_kw: 22.4 },
        { name: "VF-3", power_kw: 22.4 }, { name: "ST-20", power_kw: 14.9 }, { name: "VF-4", power_kw: 22.4 },
        { name: "TM-1", power_kw: 5.6 }, { name: "ST-25", power_kw: 22.4 }, { name: "VF-5/40", power_kw: 22.4 },
        { name: "EC-400", power_kw: 22.4 }, { name: "ST-30", power_kw: 22.4 }, { name: "VF-6/40", power_kw: 22.4 }
      ]},
      { name: "Doosan", models: [
        { name: "DNM 500", power_kw: 18.5 }, { name: "Puma 2600SY", power_kw: 22 }, { name: "NHP 5000", power_kw: 30 },
        { name: "DVF 5000", power_kw: 25 }, { name: "Lynx 2100", power_kw: 15 }, { name: "Puma 3100", power_kw: 26 },
        { name: "DNM 650", power_kw: 22 }, { name: "NHP 6300", power_kw: 35 }, { name: "Puma TT1800SY", power_kw: 18.5 }
      ]},
      { name: "Okuma", models: [
        { name: "Genos M560-V", power_kw: 22 }, { name: "LB3000 EX II", power_kw: 18.5 }, { name: "MULTUS U3000", power_kw: 22 },
        { name: "MB-56VA", power_kw: 30 }, { name: "LU3000 EX", power_kw: 22 }, { name: "MA-600HII", power_kw: 37 },
        { name: "GENOS L3000-e", power_kw: 22 }, { name: "MU-5000V", power_kw: 22 }
      ]},
      { name: "Makino", models: [
        { name: "PS95", power_kw: 22 }, { name: "a51nx", power_kw: 22 }, { name: "D500", power_kw: 30 },
        { name: "F5", power_kw: 22 }, { name: "a61nx", power_kw: 30 }, { name: "V33i", power_kw: 15 },
        { name: "a81nx", power_kw: 37 }, { name: "F3", power_kw: 18.5 }
      ]},
      { name: "Fanuc", models: [
        { name: "Robodrill α-D21MiB5", power_kw: 11 }, { name: "Robodrill α-D21LiB5", power_kw: 11 },
        { name: "Robocut α-C400iC", power_kw: 8 }, { name: "Robocut α-C600iC", power_kw: 10 }
      ]},
      { name: "Hardinge", models: [
        { name: "GS 150", power_kw: 11 }, { name: "GS 200", power_kw: 15 }, { name: "T-42", power_kw: 11 },
        { name: "T-51", power_kw: 15 }, { name: "Quest 6/42", power_kw: 11 }
      ]},
      { name: "Brother", models: [
        { name: "Speedio M140X2", power_kw: 7.5 }, { name: "Speedio S700X1", power_kw: 11 },
        { name: "Speedio R650X1", power_kw: 11 }, { name: "TC-32B QT", power_kw: 7.5 }
      ]},
      { name: "Hurco", models: [
        { name: "VMX42i", power_kw: 18.5 }, { name: "VM10i", power_kw: 11 }, { name: "VMX60i", power_kw: 22 },
        { name: "TM8i", power_kw: 11 }, { name: "VMX84", power_kw: 30 }
      ]},
      { name: "Hyundai WIA", models: [
        { name: "F500", power_kw: 18.5 }, { name: "L2000SY", power_kw: 15 }, { name: "KF5600", power_kw: 22 },
        { name: "LM1800TTSY", power_kw: 18.5 }, { name: "HS5000", power_kw: 26 }
      ]},
      { name: "Citizen", models: [
        { name: "Cincom L20", power_kw: 3.7 }, { name: "Cincom D25", power_kw: 5.5 }, { name: "Miyano BNE-51SY", power_kw: 11 }
      ]},
      { name: "Star", models: [
        { name: "SR-20R", power_kw: 3.7 }, { name: "SR-32JII", power_kw: 5.5 }, { name: "SV-38R", power_kw: 7.5 }
      ]},
      { name: "Nakamura-Tome", models: [
        { name: "SC-300", power_kw: 15 }, { name: "WT-300", power_kw: 22 }, { name: "AS-200", power_kw: 18.5 }
      ]},
      { name: "SMEC (Samsung)", models: [
        { name: "SL 2500", power_kw: 15 }, { name: "PL 2000", power_kw: 18.5 }, { name: "SL 3500", power_kw: 22 }
      ]},
      { name: "Spinner", models: [
        { name: "VC750", power_kw: 15 }, { name: "TC600", power_kw: 18.5 }, { name: "U5-1520", power_kw: 26 }
      ]},
      { name: "Chiron", models: [
        { name: "FZ12 FX", power_kw: 20 }, { name: "FZ15 FX", power_kw: 24 }, { name: "DZ15 W", power_kw: 28 }
      ]},
      { name: "GF Machining (AgieCharmilles)", models: [
        { name: "Mikron MILL P 500", power_kw: 20 }, { name: "Mikron HSM 500", power_kw: 18 }
      ]},
      { name: "Hermle", models: [
        { name: "C 12", power_kw: 10 }, { name: "C 22", power_kw: 16 }, { name: "C 42", power_kw: 25 },
        { name: "C 52", power_kw: 35 }, { name: "C 250", power_kw: 18 }
      ]},
      { name: "Matsuura", models: [
        { name: "MX-520", power_kw: 15 }, { name: "MAM72-35V", power_kw: 22 }, { name: "H.Plus-405", power_kw: 30 }
      ]},
      { name: "Kitamura", models: [
        { name: "Mycenter-3Xi", power_kw: 15 }, { name: "HX400iG", power_kw: 22 }, { name: "Medcenter5", power_kw: 7.5 }
      ]},
      { name: "Other", models: [{ name: "Generic CNC (Small)", power_kw: 10 }, { name: "Generic CNC (Medium)", power_kw: 18 }, { name: "Generic CNC (Large)", power_kw: 30 }] },
    ],
  },
  lathe: {
    brands: [
      { name: "Mazak", models: [
        { name: "Quick Turn 200MY", power_kw: 15 }, { name: "Quick Turn 350MY", power_kw: 22 },
        { name: "QT Compact 300MY", power_kw: 18.5 }, { name: "Quick Turn 450", power_kw: 30 }
      ]},
      { name: "Haas", models: [
        { name: "ST-10Y", power_kw: 11.2 }, { name: "ST-20Y", power_kw: 14.9 }, { name: "ST-30Y", power_kw: 22.4 },
        { name: "ST-35", power_kw: 22.4 }, { name: "ST-40", power_kw: 29.8 }, { name: "DS-30Y", power_kw: 22.4 }
      ]},
      { name: "Doosan", models: [
        { name: "Lynx 220LY", power_kw: 15 }, { name: "Puma 2100SY", power_kw: 18.5 }, { name: "Puma 2600SY", power_kw: 22 },
        { name: "Puma 4100", power_kw: 30 }, { name: "Lynx 300", power_kw: 18.5 }
      ]},
      { name: "Okuma", models: [
        { name: "LB3000 EX II MY", power_kw: 18.5 }, { name: "GENOS L2000-e", power_kw: 15 },
        { name: "LU3000 EX 2SC", power_kw: 22 }, { name: "LB4000 EX II", power_kw: 30 }
      ]},
      { name: "DMG Mori", models: [
        { name: "NLX 1500/500", power_kw: 11 }, { name: "NLX 2000/500", power_kw: 18.5 },
        { name: "CLX 350", power_kw: 10 }, { name: "CTX alpha 500", power_kw: 22 }
      ]},
      { name: "Mori Seiki (Legacy)", models: [
        { name: "NL2500", power_kw: 22 }, { name: "CL2000", power_kw: 15 }, { name: "SL-25", power_kw: 11 }
      ]},
      { name: "Emco", models: [
        { name: "MAXXTURN 45", power_kw: 12 }, { name: "MAXXTURN 65", power_kw: 21 }, { name: "HYPERTURN 45", power_kw: 18 }
      ]},
      { name: "Takisawa", models: [
        { name: "EX-310", power_kw: 15 }, { name: "TS-4000YS", power_kw: 18.5 }, { name: "LA-250", power_kw: 11 }
      ]},
      { name: "Hwacheon", models: [
        { name: "Hi-TECH 200B", power_kw: 15 }, { name: "Hi-TECH 450", power_kw: 22 }, { name: "CUTEX-180A", power_kw: 11 }
      ]},
      { name: "Goodway", models: [
        { name: "GLS-2000", power_kw: 15 }, { name: "GLS-2600", power_kw: 18.5 }, { name: "SW-32", power_kw: 7.5 }
      ]},
      { name: "Colchester", models: [
        { name: "Tornado T8", power_kw: 15 }, { name: "Alpha 1400", power_kw: 5.5 }, { name: "Magnum 660", power_kw: 11 }
      ]},
      { name: "Hardinge", models: [
        { name: "T-42", power_kw: 11 }, { name: "T-51", power_kw: 15 }, { name: "Elite 42", power_kw: 7.5 }
      ]},
      { name: "Other", models: [{ name: "Manual Lathe (Small)", power_kw: 3 }, { name: "Manual Lathe (Medium)", power_kw: 7.5 }, { name: "CNC Lathe (Generic)", power_kw: 15 }] },
    ],
  },
  milling_machine: {
    brands: [
      { name: "DMG Mori", models: [
        { name: "DMC 650V", power_kw: 25 }, { name: "DMU 65 monoBLOCK", power_kw: 28 }, { name: "DMF 260", power_kw: 35 },
        { name: "DMC 1150V", power_kw: 35 }, { name: "CMX 50U", power_kw: 15 }
      ]},
      { name: "Mazak", models: [
        { name: "VCN-530C", power_kw: 22 }, { name: "VTC-300C", power_kw: 22 }, { name: "VTC-800/30SR", power_kw: 30 }
      ]},
      { name: "Bridgeport", models: [
        { name: "Series I Standard", power_kw: 2.2 }, { name: "Series II Special", power_kw: 3 },
        { name: "VMC 600/22", power_kw: 11 }, { name: "XR 1000", power_kw: 15 }
      ]},
      { name: "Haas", models: [
        { name: "TM-1", power_kw: 5.6 }, { name: "TM-2", power_kw: 7.5 }, { name: "Mini Mill", power_kw: 7.5 },
        { name: "Super Mini Mill", power_kw: 11 }
      ]},
      { name: "Deckel Maho (DMG)", models: [
        { name: "DMC 63V", power_kw: 18 }, { name: "DMC 100V", power_kw: 25 }, { name: "DMU 50", power_kw: 18 }
      ]},
      { name: "Cincinnati", models: [
        { name: "Milacron 750", power_kw: 18.5 }, { name: "Arrow 500", power_kw: 11 }
      ]},
      { name: "Hurco", models: [
        { name: "VM10i", power_kw: 11 }, { name: "VMX42i", power_kw: 18.5 }, { name: "VMX60i", power_kw: 22 }
      ]},
      { name: "Fadal", models: [
        { name: "VMC 4020", power_kw: 11 }, { name: "VMC 6030", power_kw: 15 }
      ]},
      { name: "XYZ", models: [
        { name: "XYZ 750 HD", power_kw: 11 }, { name: "XYZ 1000 HD", power_kw: 15 }
      ]},
      { name: "Other", models: [{ name: "Knee Mill (Manual)", power_kw: 2.2 }, { name: "Bed Mill (Manual)", power_kw: 5.5 }, { name: "VMC (Generic)", power_kw: 15 }] },
    ],
  },
  drill_press: {
    brands: [
      { name: "Clausing", models: [{ name: "2286", power_kw: 1.5 }, { name: "2277", power_kw: 1.1 }] },
      { name: "Jet", models: [{ name: "J-2550", power_kw: 2.2 }, { name: "J-2530", power_kw: 1.5 }, { name: "GHD-20", power_kw: 1.1 }] },
      { name: "Wilton", models: [{ name: "A5816", power_kw: 1.1 }, { name: "2550", power_kw: 2.2 }] },
      { name: "Powermatic", models: [{ name: "PM2800B", power_kw: 1.1 }, { name: "2800B", power_kw: 1.5 }] },
      { name: "Alzmetall", models: [{ name: "AB 40 SV", power_kw: 3 }, { name: "ABOMAT 35", power_kw: 2.2 }] },
      { name: "Strands", models: [{ name: "S32-L", power_kw: 1.5 }, { name: "S40-L", power_kw: 2.2 }] },
      { name: "Meddings", models: [{ name: "S55", power_kw: 2.2 }, { name: "LF2", power_kw: 1.5 }] },
      { name: "Other", models: [{ name: "Bench Drill Press", power_kw: 0.5 }, { name: "Floor Drill Press", power_kw: 1.5 }, { name: "Radial Drill", power_kw: 3 }] },
    ],
  },
  "3d_printer": {
    brands: [
      { name: "Stratasys", models: [
        { name: "F170", power_kw: 1.2 }, { name: "F270", power_kw: 1.4 }, { name: "F370", power_kw: 1.5 },
        { name: "Fortus 380mc", power_kw: 3 }, { name: "Fortus 450mc", power_kw: 3.6 }, { name: "F900", power_kw: 7 },
        { name: "J35 Pro", power_kw: 1.5 }, { name: "J55 Prime", power_kw: 1.7 }, { name: "J850 Prime", power_kw: 3 }
      ]},
      { name: "EOS", models: [
        { name: "M 100", power_kw: 2.4 }, { name: "M 290", power_kw: 8.5 }, { name: "M 300-4", power_kw: 14 },
        { name: "M 400-4", power_kw: 28 }, { name: "P 396", power_kw: 10 }, { name: "P 500", power_kw: 11.5 }
      ]},
      { name: "3D Systems", models: [
        { name: "ProJet MJP 2500", power_kw: 1.5 }, { name: "ProX SLS 6100", power_kw: 6 },
        { name: "DMP Flex 350", power_kw: 10 }, { name: "Figure 4 Standalone", power_kw: 0.5 }
      ]},
      { name: "HP", models: [
        { name: "Jet Fusion 580", power_kw: 6 }, { name: "Jet Fusion 4200", power_kw: 12 },
        { name: "Jet Fusion 5200", power_kw: 15 }, { name: "Metal Jet S100", power_kw: 18 }
      ]},
      { name: "SLM Solutions", models: [
        { name: "SLM 125", power_kw: 3.5 }, { name: "SLM 280", power_kw: 7 }, { name: "SLM 500", power_kw: 10 },
        { name: "NXG XII 600", power_kw: 35 }
      ]},
      { name: "Trumpf", models: [
        { name: "TruPrint 1000", power_kw: 4 }, { name: "TruPrint 3000", power_kw: 8 }, { name: "TruPrint 5000", power_kw: 12 }
      ]},
      { name: "Renishaw", models: [
        { name: "RenAM 500Q", power_kw: 10 }, { name: "RenAM 500S", power_kw: 7 }
      ]},
      { name: "Markforged", models: [
        { name: "X7", power_kw: 0.6 }, { name: "Metal X", power_kw: 1.5 }, { name: "FX20", power_kw: 2 }
      ]},
      { name: "Ultimaker", models: [
        { name: "S3", power_kw: 0.35 }, { name: "S5", power_kw: 0.5 }, { name: "S7", power_kw: 0.6 }, { name: "Factor 4", power_kw: 0.8 }
      ]},
      { name: "Formlabs", models: [
        { name: "Form 3", power_kw: 0.25 }, { name: "Form 3L", power_kw: 0.35 }, { name: "Fuse 1+", power_kw: 1.5 }
      ]},
      { name: "Prusa", models: [
        { name: "MK4", power_kw: 0.25 }, { name: "MK4S", power_kw: 0.28 }, { name: "XL", power_kw: 0.5 }, { name: "Mini+", power_kw: 0.16 }
      ]},
      { name: "Bambu Lab", models: [
        { name: "P1S", power_kw: 0.35 }, { name: "X1C", power_kw: 0.35 }, { name: "A1", power_kw: 0.2 }
      ]},
      { name: "Creality", models: [
        { name: "Ender 3 S1", power_kw: 0.27 }, { name: "Ender 5 S1", power_kw: 0.35 }, { name: "CR-10 Smart", power_kw: 0.4 },
        { name: "K1 Max", power_kw: 0.35 }, { name: "Sermoon V1 Pro", power_kw: 0.35 }
      ]},
      { name: "Anycubic", models: [
        { name: "Kobra 2", power_kw: 0.4 }, { name: "Photon M5s", power_kw: 0.1 }
      ]},
      { name: "Other", models: [{ name: "Desktop FDM", power_kw: 0.3 }, { name: "Industrial FDM", power_kw: 2 }, { name: "Metal DMLS", power_kw: 8 }] },
    ],
  },
  welding_machine: {
    brands: [
      { name: "Lincoln Electric", models: [
        { name: "Power MIG 210 MP", power_kw: 5.3 }, { name: "Power MIG 256", power_kw: 9.8 },
        { name: "Power MIG 360MP", power_kw: 13.5 }, { name: "Invertec V350 Pro", power_kw: 12.5 },
        { name: "Precision TIG 375", power_kw: 14 }, { name: "Flextec 650X", power_kw: 27 }
      ]},
      { name: "Miller", models: [
        { name: "Multimatic 220", power_kw: 8 }, { name: "Millermatic 252", power_kw: 10.5 },
        { name: "Millermatic 350P", power_kw: 13 }, { name: "Dynasty 280 DX", power_kw: 10 },
        { name: "Dynasty 400", power_kw: 14.3 }, { name: "Deltaweld 452", power_kw: 19 }
      ]},
      { name: "Fronius", models: [
        { name: "TransSteel 2200", power_kw: 8.5 }, { name: "TransSteel 3500", power_kw: 13 },
        { name: "TPS 320i", power_kw: 11 }, { name: "TPS 400i", power_kw: 14 }, { name: "TPS 600i", power_kw: 23 }
      ]},
      { name: "ESAB", models: [
        { name: "Rebel EMP 205ic", power_kw: 7.4 }, { name: "Warrior 500i", power_kw: 18 },
        { name: "Origo MIG 4004i", power_kw: 13 }, { name: "Caddy Tig 2200i", power_kw: 8 }
      ]},
      { name: "Kemppi", models: [
        { name: "FastMig X 350", power_kw: 12 }, { name: "FastMig X 450", power_kw: 16 },
        { name: "MasterTig 335ACDC", power_kw: 12 }, { name: "X8 MIG Welder", power_kw: 14 }
      ]},
      { name: "Hypertherm", models: [
        { name: "Powermax45 XP", power_kw: 6.6 }, { name: "Powermax65", power_kw: 9.7 },
        { name: "Powermax85", power_kw: 11.5 }, { name: "Powermax125", power_kw: 18 }
      ]},
      { name: "Thermal Dynamics", models: [
        { name: "Cutmaster 52", power_kw: 7.5 }, { name: "Cutmaster 82", power_kw: 11 }
      ]},
      { name: "Victor", models: [
        { name: "Fabricator 211i", power_kw: 7.5 }, { name: "Renegade ES 300i", power_kw: 11 }
      ]},
      { name: "Hobart", models: [
        { name: "Handler 210MVP", power_kw: 7 }, { name: "Ironman 240", power_kw: 9.8 }
      ]},
      { name: "Other", models: [{ name: "Stick Welder (Small)", power_kw: 4 }, { name: "MIG/MAG Welder", power_kw: 8 }, { name: "TIG Welder", power_kw: 10 }] },
    ],
  },
  laser_cutter: {
    brands: [
      { name: "Trumpf", models: [
        { name: "TruLaser 1030 fiber", power_kw: 18 }, { name: "TruLaser 3030 fiber", power_kw: 36 },
        { name: "TruLaser 5030 fiber", power_kw: 48 }, { name: "TruLaser 5040 fiber", power_kw: 60 },
        { name: "TruLaser Cell 3000", power_kw: 25 }, { name: "TruMark 5020", power_kw: 0.5 }
      ]},
      { name: "Bystronic", models: [
        { name: "ByStar Fiber 3015", power_kw: 32 }, { name: "ByStar Fiber 4020", power_kw: 40 },
        { name: "ByStar Fiber 6225", power_kw: 55 }, { name: "ByJet Classic", power_kw: 25 }
      ]},
      { name: "Amada", models: [
        { name: "ENSIS 3015 AJ", power_kw: 30 }, { name: "ENSIS 6225 AJ", power_kw: 45 },
        { name: "LC-3015 F1 NT", power_kw: 25 }, { name: "LCG 3015 AJ", power_kw: 35 }
      ]},
      { name: "Mazak Optonics", models: [
        { name: "OPTIPLEX 3015 DDL", power_kw: 45 }, { name: "OPTIPLEX NEXUS 3015", power_kw: 35 },
        { name: "STX 48", power_kw: 30 }
      ]},
      { name: "Prima Power", models: [
        { name: "Platino Fiber", power_kw: 32 }, { name: "Laser Genius+", power_kw: 40 },
        { name: "Laser Next", power_kw: 35 }
      ]},
      { name: "Salvagnini", models: [
        { name: "L3", power_kw: 30 }, { name: "L5", power_kw: 40 }
      ]},
      { name: "BLM Group", models: [
        { name: "LT7", power_kw: 28 }, { name: "LT8.20", power_kw: 35 }
      ]},
      { name: "Han's Laser", models: [
        { name: "G3015F", power_kw: 25 }, { name: "G4020F", power_kw: 35 }
      ]},
      { name: "Bodor", models: [
        { name: "i5", power_kw: 20 }, { name: "i7", power_kw: 28 }, { name: "P3015", power_kw: 30 }
      ]},
      { name: "IPG Photonics", models: [
        { name: "LaserCube", power_kw: 8 }, { name: "Genesis", power_kw: 15 }
      ]},
      { name: "Epilog", models: [
        { name: "Fusion Pro 48", power_kw: 1.2 }, { name: "Fusion M2 32", power_kw: 0.75 }
      ]},
      { name: "Trotec", models: [
        { name: "Speedy 400", power_kw: 1.5 }, { name: "SP3000", power_kw: 3 }
      ]},
      { name: "Other", models: [{ name: "CO2 Laser (Small)", power_kw: 5 }, { name: "Fiber Laser (Medium)", power_kw: 25 }, { name: "Fiber Laser (Large)", power_kw: 45 }] },
    ],
  },
  injection_molding: {
    brands: [
      { name: "Arburg", models: [
        { name: "Allrounder 270 S", power_kw: 11 }, { name: "Allrounder 470 E", power_kw: 25 },
        { name: "Allrounder 570 A", power_kw: 35 }, { name: "Allrounder 820 H", power_kw: 55 }
      ]},
      { name: "Engel", models: [
        { name: "Victory 120", power_kw: 18 }, { name: "Victory 330", power_kw: 40 },
        { name: "e-mac 100", power_kw: 12 }, { name: "duo 500", power_kw: 60 }
      ]},
      { name: "KraussMaffei", models: [
        { name: "CX 50", power_kw: 12 }, { name: "CX 160", power_kw: 28 }, { name: "GX 550", power_kw: 55 }
      ]},
      { name: "Sumitomo Demag", models: [
        { name: "IntElect 100", power_kw: 15 }, { name: "IntElect 220", power_kw: 30 }, { name: "El-Exis SP 200", power_kw: 35 }
      ]},
      { name: "Husky", models: [
        { name: "HyPET 225", power_kw: 55 }, { name: "HyPET 400", power_kw: 80 }
      ]},
      { name: "Nissei", models: [
        { name: "NEX50", power_kw: 11 }, { name: "NEX140", power_kw: 25 }, { name: "NEX280", power_kw: 40 }
      ]},
      { name: "Toshiba", models: [
        { name: "EC100SX", power_kw: 15 }, { name: "EC180SX", power_kw: 28 }
      ]},
      { name: "JSW", models: [
        { name: "J100AD", power_kw: 18 }, { name: "J220AD", power_kw: 35 }
      ]},
      { name: "Haitian", models: [
        { name: "MA900", power_kw: 12 }, { name: "MA1600", power_kw: 22 }, { name: "MA2500", power_kw: 35 }
      ]},
      { name: "Other", models: [{ name: "Small (< 100 ton)", power_kw: 15 }, { name: "Medium (100-300 ton)", power_kw: 35 }, { name: "Large (> 300 ton)", power_kw: 60 }] },
    ],
  },
  grinding_machine: {
    brands: [
      { name: "Studer", models: [
        { name: "S21", power_kw: 7.5 }, { name: "S31", power_kw: 11 }, { name: "S41", power_kw: 15 }
      ]},
      { name: "Kellenberger", models: [
        { name: "Kel-Vera", power_kw: 11 }, { name: "Kel-Vista", power_kw: 15 }
      ]},
      { name: "Junker", models: [
        { name: "Jumat", power_kw: 15 }, { name: "Quickpoint", power_kw: 22 }
      ]},
      { name: "Okuma", models: [
        { name: "GI-20N II", power_kw: 11 }, { name: "GP-47N", power_kw: 15 }
      ]},
      { name: "Toyoda", models: [
        { name: "GL4Pi-50", power_kw: 11 }, { name: "GE4Pi-100", power_kw: 18.5 }
      ]},
      { name: "Blohm", models: [
        { name: "Profimat MT 408", power_kw: 15 }, { name: "Planomat HP 408", power_kw: 18 }
      ]},
      { name: "Jones & Shipman", models: [
        { name: "Easy 1000", power_kw: 5.5 }, { name: "Ultramat 1000", power_kw: 11 }
      ]},
      { name: "Other", models: [{ name: "Surface Grinder", power_kw: 5.5 }, { name: "Cylindrical Grinder", power_kw: 11 }, { name: "Centerless Grinder", power_kw: 15 }] },
    ],
  },
  press_brake: {
    brands: [
      { name: "Trumpf", models: [
        { name: "TruBend 3100", power_kw: 15 }, { name: "TruBend 5130", power_kw: 22 },
        { name: "TruBend 7036", power_kw: 8 }, { name: "TruBend 8320", power_kw: 35 }
      ]},
      { name: "Amada", models: [
        { name: "HG 1003", power_kw: 18 }, { name: "HG 1303", power_kw: 22 },
        { name: "HG 2204", power_kw: 30 }, { name: "EG 6013", power_kw: 15 }
      ]},
      { name: "Bystronic", models: [
        { name: "Xpert 40", power_kw: 8 }, { name: "Xpert 80", power_kw: 15 }, { name: "Xpert 150", power_kw: 25 }
      ]},
      { name: "LVD", models: [
        { name: "PPEB 80/25", power_kw: 15 }, { name: "PPEB 170/40", power_kw: 30 }
      ]},
      { name: "Salvagnini", models: [
        { name: "B3 AU", power_kw: 25 }, { name: "B3 Panel Bender", power_kw: 18 }
      ]},
      { name: "Cincinnati", models: [
        { name: "Proform+ 90", power_kw: 15 }, { name: "Maxform 175", power_kw: 28 }
      ]},
      { name: "Durma", models: [
        { name: "AD-S 30100", power_kw: 15 }, { name: "AD-S 40175", power_kw: 22 }
      ]},
      { name: "Other", models: [{ name: "Small (< 100 ton)", power_kw: 11 }, { name: "Medium (100-200 ton)", power_kw: 22 }, { name: "Large (> 200 ton)", power_kw: 35 }] },
    ],
  },
  compressor: {
    brands: [
      { name: "Atlas Copco", models: [
        { name: "GA 7", power_kw: 7.5 }, { name: "GA 15", power_kw: 15 }, { name: "GA 30", power_kw: 30 },
        { name: "GA 55", power_kw: 55 }, { name: "GA 90", power_kw: 90 }, { name: "ZT 22", power_kw: 22 }
      ]},
      { name: "Ingersoll Rand", models: [
        { name: "R7.5i", power_kw: 7.5 }, { name: "R15i", power_kw: 15 }, { name: "R37i", power_kw: 37 },
        { name: "R75i", power_kw: 75 }, { name: "Nirvana 37", power_kw: 37 }
      ]},
      { name: "Kaeser", models: [
        { name: "SK 15", power_kw: 11 }, { name: "ASD 40", power_kw: 22 }, { name: "CSD 75", power_kw: 55 },
        { name: "ESD 441", power_kw: 250 }
      ]},
      { name: "CompAir", models: [
        { name: "L07", power_kw: 7.5 }, { name: "L22", power_kw: 22 }, { name: "L45", power_kw: 45 }
      ]},
      { name: "Boge", models: [
        { name: "C 7", power_kw: 5.5 }, { name: "C 15", power_kw: 11 }, { name: "S 31-3", power_kw: 22 }
      ]},
      { name: "Quincy", models: [
        { name: "QGS 7.5", power_kw: 5.5 }, { name: "QGS 15", power_kw: 11 }, { name: "QGS 30", power_kw: 22 }
      ]},
      { name: "Other", models: [{ name: "Small Piston", power_kw: 3 }, { name: "Rotary Screw (Small)", power_kw: 11 }, { name: "Rotary Screw (Large)", power_kw: 55 }] },
    ],
  },
  conveyor: {
    brands: [
      { name: "Dorner", models: [
        { name: "2200 Series", power_kw: 0.37 }, { name: "3200 Series", power_kw: 0.75 }, { name: "FlexMove", power_kw: 1.5 }
      ]},
      { name: "Hytrol", models: [
        { name: "TA", power_kw: 0.37 }, { name: "E24", power_kw: 0.75 }, { name: "ProSort 400", power_kw: 3 }
      ]},
      { name: "Interroll", models: [
        { name: "Portec", power_kw: 0.55 }, { name: "MCP", power_kw: 1.1 }
      ]},
      { name: "Bosch Rexroth", models: [
        { name: "VarioFlow S", power_kw: 0.5 }, { name: "TS 5", power_kw: 1 }
      ]},
      { name: "FlexLink", models: [
        { name: "X45", power_kw: 0.4 }, { name: "X85", power_kw: 0.75 }
      ]},
      { name: "Other", models: [{ name: "Belt Conveyor (Light)", power_kw: 0.5 }, { name: "Belt Conveyor (Heavy)", power_kw: 3 }, { name: "Roller Conveyor", power_kw: 1.5 }] },
    ],
  },
  robot_arm: {
    brands: [
      { name: "FANUC", models: [
        { name: "LR Mate 200iD", power_kw: 0.8 }, { name: "M-10iA", power_kw: 1.5 }, { name: "M-20iA", power_kw: 3 },
        { name: "R-1000iA", power_kw: 6 }, { name: "R-2000iC", power_kw: 8 }, { name: "M-2000iA", power_kw: 25 }
      ]},
      { name: "KUKA", models: [
        { name: "KR 3 AGILUS", power_kw: 0.6 }, { name: "KR 6 R900", power_kw: 2.5 }, { name: "KR 16 R2010", power_kw: 3.5 },
        { name: "KR 120 R2500", power_kw: 6 }, { name: "KR 210 R3100", power_kw: 9 }, { name: "KR 1000 titan", power_kw: 30 }
      ]},
      { name: "ABB", models: [
        { name: "IRB 120", power_kw: 0.6 }, { name: "IRB 1200", power_kw: 2 }, { name: "IRB 2600", power_kw: 4 },
        { name: "IRB 4600", power_kw: 5.5 }, { name: "IRB 6700", power_kw: 7 }, { name: "IRB 8700", power_kw: 15 }
      ]},
      { name: "Yaskawa Motoman", models: [
        { name: "GP7", power_kw: 1.5 }, { name: "GP25", power_kw: 3 }, { name: "GP50", power_kw: 4.5 },
        { name: "GP180", power_kw: 8 }, { name: "GP400", power_kw: 15 }
      ]},
      { name: "Universal Robots", models: [
        { name: "UR3e", power_kw: 0.2 }, { name: "UR5e", power_kw: 0.35 }, { name: "UR10e", power_kw: 0.5 },
        { name: "UR16e", power_kw: 0.6 }, { name: "UR20", power_kw: 0.75 }, { name: "UR30", power_kw: 0.9 }
      ]},
      { name: "Doosan Robotics", models: [
        { name: "M0609", power_kw: 0.25 }, { name: "M1013", power_kw: 0.4 }, { name: "H2515", power_kw: 0.75 }
      ]},
      { name: "Kawasaki", models: [
        { name: "RS007L", power_kw: 1.2 }, { name: "RS020N", power_kw: 2.5 }, { name: "RS080N", power_kw: 5 }
      ]},
      { name: "Staubli", models: [
        { name: "TX2-40", power_kw: 0.9 }, { name: "TX2-60", power_kw: 1.5 }, { name: "TX2-90", power_kw: 2.5 }
      ]},
      { name: "Epson", models: [
        { name: "VT6L", power_kw: 0.3 }, { name: "C8", power_kw: 0.8 }
      ]},
      { name: "Techman (TM Robot)", models: [
        { name: "TM5", power_kw: 0.3 }, { name: "TM12", power_kw: 0.5 }, { name: "TM14", power_kw: 0.55 }
      ]},
      { name: "OMRON (Adept)", models: [
        { name: "i4L", power_kw: 0.3 }, { name: "TM Series", power_kw: 0.5 }
      ]},
      { name: "Other", models: [{ name: "Cobot (Small)", power_kw: 0.3 }, { name: "Industrial (Medium)", power_kw: 4 }, { name: "Industrial (Large)", power_kw: 10 }] },
    ],
  },
  unknown: {
    brands: [
      { name: "Other", models: [
        { name: "Light Industrial Equipment", power_kw: 3 },
        { name: "Medium Industrial Equipment", power_kw: 10 },
        { name: "Heavy Industrial Equipment", power_kw: 25 }
      ]}
    ],
  },
};

// Machine options
const MACHINE_OPTIONS = [
  { value: "cnc_1", label: "Mazak CNC" },
  { value: "cnc_2", label: "Doosan CNC" },
  { value: "cnc_3", label: "DMG Mori" },
  { value: "lathe_1", label: "Haas Lathe" },
  { value: "mill_1", label: "Hurco Mill" },
];

// Material options
const MATERIAL_OPTIONS = [
  { value: "mat_4140", label: "Steel 4140" },
  { value: "mat_6061", label: "Aluminum 6061" },
  { value: "mat_304", label: "Stainless 304" },
  { value: "mat_titanium", label: "Titanium Ti-6Al-4V" },
  { value: "mat_brass", label: "Brass C360" },
];

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("calculator");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [machine, setMachine] = useState("cnc_1");
  const [material, setMaterial] = useState("mat_4140");
  const [initialWeight, setInitialWeight] = useState("10");
  const [finalWeight, setFinalWeight] = useState("9.2");
  const [timeMin, setTimeMin] = useState("30");

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const tabs = [
    { id: "calculator" as Tab, label: "Calculator", icon: CalculatorIcon },
    { id: "upload" as Tab, label: "AI Photo Analysis", icon: CameraIcon },
    { id: "api" as Tab, label: "API", icon: CodeIcon },
  ];

  // Analyze image with AI
  const analyzeImage = useCallback(async (file: UploadedFile) => {
    setUploadedFiles((prev) =>
      prev.map((f) => (f.id === file.id ? { ...f, status: "analyzing" as const } : f))
    );

    try {
      const formData = new FormData();
      formData.append("image", file.file);

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: "ready" as const,
                analysis: data.analysis,
                specifications: data.specifications,
                operatingHours: "1",
                standbyHours: "0",
              }
            : f
        )
      );
      setSelectedFileId(file.id);
    } catch (err) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: "error" as const,
                errorMessage: err instanceof Error ? err.message : "Analysis failed",
              }
            : f
        )
      );
    }
  }, []);

  // Calculate carbon for analyzed machine
  const calculateCarbon = useCallback(async (file: UploadedFile) => {
    if (!file.analysis || !file.operatingHours) return;

    setUploadedFiles((prev) =>
      prev.map((f) => (f.id === file.id ? { ...f, status: "calculating" as const } : f))
    );

    try {
      const response = await fetch("/api/analyze-image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machine_key: file.analysis.machine_key,
          operating_hours: parseFloat(file.operatingHours) || 0,
          standby_hours: parseFloat(file.standbyHours || "0") || 0,
          custom_power_kw: file.customPowerKw || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Calculation failed");
      }

      const data = await response.json();

      // Save to Results/History
      try {
        await fetch("/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            machine_id: file.analysis.machine_key,
            material_id: "photo_analysis",
            initial_weight_kg: file.customPowerKw || file.specifications?.operating_power_kw || 0,
            final_weight_kg: parseFloat(file.operatingHours) || 0,
            time_min: parseFloat(file.standbyHours || "0") || 0,
            // Additional metadata
            source: "ai_photo_analysis",
            machine_name: `${file.selectedBrand || ""} ${file.selectedModel || file.analysis.machine_type}`.trim(),
            total_carbon_kg: data.carbon.total_carbon_kg,
            total_energy_kwh: data.energy.total_energy_kwh,
          }),
        });
      } catch (saveErr) {
        console.error("Failed to save to history:", saveErr);
      }

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: "done" as const,
                calculationResult: {
                  total_carbon_kg: data.carbon.total_carbon_kg,
                  total_energy_kwh: data.energy.total_energy_kwh,
                  operating_energy_kwh: data.energy.operating_energy_kwh,
                  standby_energy_kwh: data.energy.standby_energy_kwh,
                  equivalents: {
                    trees_needed: data.equivalents.trees_needed_yearly,
                    car_km_equivalent: data.equivalents.car_km_equivalent,
                    smartphone_charges: data.equivalents.smartphone_charges,
                  },
                },
              }
            : f
        )
      );
    } catch (err) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: "error" as const,
                errorMessage: err instanceof Error ? err.message : "Calculation failed",
              }
            : f
        )
      );
    }
  }, []);

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles: UploadedFile[] = Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          preview: URL.createObjectURL(file),
          status: "uploading" as const,
        }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // Auto-analyze each new image
      newFiles.forEach((file) => {
        analyzeImage(file);
      });
    },
    [analyzeImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = useCallback((id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  async function handleCalculate() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machine_id: machine,
          material_id: material,
          initial_weight_kg: parseFloat(initialWeight),
          final_weight_kg: parseFloat(finalWeight),
          time_min: parseFloat(timeMin),
        }),
      });

      if (!response.ok) throw new Error("Calculation failed");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-base text-muted-foreground">
          Calculate carbon emissions for your manufacturing operations
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calculator Tab */}
      {activeTab === "calculator" && (
        <div className="space-y-6">
          {/* Calculator Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 space-y-1">
              <h2 className="text-lg font-semibold text-card-foreground">Quick Calculator</h2>
              <p className="text-sm text-muted-foreground">
                Calculate carbon footprint for a single machining operation
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Machine Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Machine</label>
                <select
                  value={machine}
                  onChange={(e) => setMachine(e.target.value)}
                  className="flex h-10 w-full items-center rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {MACHINE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Material</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="flex h-10 w-full items-center rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {MATERIAL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Initial Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Initial Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={initialWeight}
                  onChange={(e) => setInitialWeight(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Final Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Final Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {/* Processing Time */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Processing Time (min)</label>
                <input
                  type="number"
                  step="1"
                  value={timeMin}
                  onChange={(e) => setTimeMin(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <LeafIcon />
                  <span>Calculate Carbon Footprint</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Results Card */}
          {result && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <LeafIcon />
                </div>
                <h3 className="font-semibold text-foreground">Calculation Results</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Total Carbon */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LeafIcon />
                    <span className="text-sm">Total Carbon Emissions</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {result.total_carbon_kg.toFixed(3)}{" "}
                    <span className="text-base font-normal">kg CO₂</span>
                  </p>
                </div>

                {/* Total Energy */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BoltIcon />
                    <span className="text-sm">Total Energy</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {result.total_energy_kwh.toFixed(2)}{" "}
                    <span className="text-base font-normal">kWh</span>
                  </p>
                </div>

                {/* Processing Energy */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Processing Energy</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {result.processing_energy_kwh.toFixed(2)} kWh
                  </p>
                </div>

                {/* Idle Energy */}
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Idle Energy</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {result.idle_energy_kwh.toFixed(2)} kWh
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Photo Analysis Tab */}
      {activeTab === "upload" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-card-foreground">AI Photo Analysis</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload a photo of your machine and our AI will automatically identify it and
                calculate carbon emissions
              </p>
            </div>

            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-all duration-200",
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-muted-foreground/25 bg-gradient-to-br from-muted/30 to-muted/10 hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                <CameraIcon />
              </div>
              <p className="mt-4 text-base font-medium text-foreground">
                {isDragging ? "Drop your machine photo here" : "Upload Machine Photo"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Our AI will identify CNC machines, lathes, 3D printers, welding machines & more
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Supports: JPG, PNG, WebP (max 10MB)
              </p>
              <button className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary/10 px-5 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                <UploadIcon />
                Select Photo
              </button>
            </div>
          </div>

          {/* Uploaded Files with AI Analysis */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "rounded-xl border bg-card shadow-sm transition-all",
                    selectedFileId === file.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  )}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row">
                      {/* Image Preview */}
                      <div className="relative flex-shrink-0">
                        {file.preview && (
                          <div className="relative h-48 w-full overflow-hidden rounded-lg bg-muted lg:h-56 lg:w-72">
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />
                            {/* Status Overlay */}
                            {(file.status === "uploading" || file.status === "analyzing") && (
                              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-2">
                                  <svg
                                    className="h-8 w-8 animate-spin text-primary"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                  <span className="text-sm font-medium text-foreground">
                                    {file.status === "uploading"
                                      ? "Uploading..."
                                      : "AI Analyzing..."}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-md transition-transform hover:scale-110"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Analysis Results & Controls */}
                      <div className="flex-1 space-y-4">
                        {/* File Info */}
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          {/* Status Badge */}
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                              file.status === "uploading" &&
                                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                              file.status === "analyzing" &&
                                "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                              file.status === "ready" &&
                                "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                              file.status === "calculating" &&
                                "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                              file.status === "done" &&
                                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                              file.status === "error" &&
                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            )}
                          >
                            {file.status === "uploading" && "⏳ Uploading"}
                            {file.status === "analyzing" && "🤖 AI Analyzing"}
                            {file.status === "ready" && "✓ Identified"}
                            {file.status === "calculating" && "⚡ Calculating"}
                            {file.status === "done" && "✓ Complete"}
                            {file.status === "error" && "✗ Error"}
                          </span>
                        </div>

                        {/* Error Message */}
                        {file.status === "error" && file.errorMessage && (
                          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                            <p className="text-sm text-destructive">{file.errorMessage}</p>
                          </div>
                        )}

                        {/* AI Analysis Results */}
                        {file.analysis && file.status !== "error" && (
                          <div className="space-y-4">
                            {/* Machine Identified */}
                            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                                    <svg
                                      className="h-5 w-5 text-primary"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Machine Identified
                                    </p>
                                    <p className="text-lg font-semibold text-foreground">
                                      {file.analysis.machine_type}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-muted-foreground">Confidence</p>
                                  <p
                                    className={cn(
                                      "text-lg font-bold",
                                      (file.analysis.confidence || 0) >= 80
                                        ? "text-green-600"
                                        : (file.analysis.confidence || 0) >= 60
                                          ? "text-amber-600"
                                          : "text-red-600"
                                    )}
                                  >
                                    {file.analysis.confidence}%
                                  </p>
                                </div>
                              </div>
                              {file.analysis.description && (
                                <p className="mt-3 text-sm text-muted-foreground">
                                  {file.analysis.description}
                                </p>
                              )}
                            </div>

                            {/* Power Specifications with Brand/Model Selection */}
                            {file.specifications && (
                              <div className="space-y-3">
                                {/* Brand Selection */}
                                {BRAND_DATABASE[file.analysis.machine_key] && (
                                  <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4">
                                    <p className="mb-3 text-sm font-medium text-foreground">
                                      🔧 Select Brand & Model for Accurate Power Data
                                    </p>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                      <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Brand</label>
                                        <select
                                          value={file.selectedBrand || ""}
                                          onChange={(e) => {
                                            const brand = e.target.value;
                                            setUploadedFiles((prev) =>
                                              prev.map((f) =>
                                                f.id === file.id
                                                  ? { ...f, selectedBrand: brand, selectedModel: "", customPowerKw: undefined }
                                                  : f
                                              )
                                            );
                                          }}
                                          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                                        >
                                          <option value="">-- Select Brand --</option>
                                          {BRAND_DATABASE[file.analysis.machine_key]?.brands.map((b) => (
                                            <option key={b.name} value={b.name}>{b.name}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-xs text-muted-foreground">Model</label>
                                        <select
                                          value={file.selectedModel || ""}
                                          onChange={(e) => {
                                            const modelName = e.target.value;
                                            const brand = BRAND_DATABASE[file.analysis!.machine_key]?.brands.find(b => b.name === file.selectedBrand);
                                            const model = brand?.models.find(m => m.name === modelName);
                                            setUploadedFiles((prev) =>
                                              prev.map((f) =>
                                                f.id === file.id
                                                  ? { ...f, selectedModel: modelName, customPowerKw: model?.power_kw }
                                                  : f
                                              )
                                            );
                                          }}
                                          disabled={!file.selectedBrand}
                                          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm disabled:opacity-50"
                                        >
                                          <option value="">-- Select Model --</option>
                                          {file.selectedBrand && BRAND_DATABASE[file.analysis.machine_key]?.brands
                                            .find(b => b.name === file.selectedBrand)?.models
                                            .map((m) => (
                                              <option key={m.name} value={m.name}>{m.name} ({m.power_kw} kW)</option>
                                            ))}
                                        </select>
                                      </div>
                                    </div>
                                    {/* Custom Power Input */}
                                    <div className="mt-3">
                                      <label className="text-xs text-muted-foreground">
                                        Or enter power manually (from datasheet)
                                      </label>
                                      <div className="mt-1 flex items-center gap-2">
                                        <input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          value={file.customPowerKw || ""}
                                          onChange={(e) =>
                                            setUploadedFiles((prev) =>
                                              prev.map((f) =>
                                                f.id === file.id
                                                  ? { ...f, customPowerKw: parseFloat(e.target.value) || undefined }
                                                  : f
                                              )
                                            )
                                          }
                                          placeholder="e.g., 22.5"
                                          className="flex h-10 w-32 rounded-lg border border-input bg-background px-3 text-sm"
                                        />
                                        <span className="text-sm text-muted-foreground">kW</span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Power Display */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-xs text-muted-foreground">Operating Power</p>
                                    <p className="text-lg font-semibold text-foreground">
                                      {file.customPowerKw || file.specifications.operating_power_kw} kW
                                      {file.customPowerKw && (
                                        <span className="ml-2 text-xs text-primary">(custom)</span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-xs text-muted-foreground">Standby Power</p>
                                    <p className="text-lg font-semibold text-foreground">
                                      {file.specifications.standby_power_kw} kW
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Operating Hours Input - Show only when identified but not calculated yet */}
                            {(file.status === "ready" || file.status === "calculating") && (
                              <div className="rounded-lg border border-primary/20 bg-background p-4">
                                <p className="mb-3 text-sm font-medium text-foreground">
                                  Enter Operating Hours
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">
                                      Operating Hours
                                    </label>
                                    <input
                                      type="number"
                                      step="0.5"
                                      min="0"
                                      value={file.operatingHours || ""}
                                      onChange={(e) =>
                                        setUploadedFiles((prev) =>
                                          prev.map((f) =>
                                            f.id === file.id
                                              ? { ...f, operatingHours: e.target.value }
                                              : f
                                          )
                                        )
                                      }
                                      placeholder="e.g., 8"
                                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">
                                      Standby Hours (optional)
                                    </label>
                                    <input
                                      type="number"
                                      step="0.5"
                                      min="0"
                                      value={file.standbyHours || ""}
                                      onChange={(e) =>
                                        setUploadedFiles((prev) =>
                                          prev.map((f) =>
                                            f.id === file.id
                                              ? { ...f, standbyHours: e.target.value }
                                              : f
                                          )
                                        )
                                      }
                                      placeholder="e.g., 2"
                                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                  </div>
                                </div>
                                <button
                                  onClick={() => calculateCarbon(file)}
                                  disabled={!file.operatingHours || file.status === "calculating"}
                                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                                >
                                  {file.status === "calculating" ? (
                                    <>
                                      <svg
                                        className="h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        />
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                      </svg>
                                      <span>Calculating...</span>
                                    </>
                                  ) : (
                                    <>
                                      <LeafIcon />
                                      <span>Calculate Carbon Footprint</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Calculation Results */}
                            {file.status === "done" && file.calculationResult && (
                              <div className="space-y-4">
                                {/* Main Results */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 ring-1 ring-green-500/20">
                                    <div className="flex items-center gap-2">
                                      <LeafIcon />
                                      <span className="text-xs text-muted-foreground">
                                        Carbon Emissions
                                      </span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                                      {file.calculationResult.total_carbon_kg.toFixed(2)}{" "}
                                      <span className="text-sm font-normal">kg CO₂</span>
                                    </p>
                                  </div>
                                  <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 ring-1 ring-blue-500/20">
                                    <div className="flex items-center gap-2">
                                      <BoltIcon />
                                      <span className="text-xs text-muted-foreground">
                                        Energy Used
                                      </span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                                      {file.calculationResult.total_energy_kwh.toFixed(2)}{" "}
                                      <span className="text-sm font-normal">kWh</span>
                                    </p>
                                  </div>
                                </div>

                                {/* Energy Breakdown */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-xs text-muted-foreground">
                                      Operating Energy
                                    </p>
                                    <p className="text-lg font-semibold">
                                      {file.calculationResult.operating_energy_kwh.toFixed(2)} kWh
                                    </p>
                                  </div>
                                  <div className="rounded-lg bg-muted/50 p-3">
                                    <p className="text-xs text-muted-foreground">Standby Energy</p>
                                    <p className="text-lg font-semibold">
                                      {file.calculationResult.standby_energy_kwh.toFixed(2)} kWh
                                    </p>
                                  </div>
                                </div>

                                {/* Equivalents */}
                                {file.calculationResult.equivalents && (
                                  <div className="rounded-lg border border-dashed border-muted-foreground/30 p-4">
                                    <p className="mb-3 text-sm font-medium text-foreground">
                                      Environmental Impact Equivalents
                                    </p>
                                    <div className="grid gap-3 sm:grid-cols-3">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xl">🌳</span>
                                        <div>
                                          <p className="text-sm font-semibold">
                                            {file.calculationResult.equivalents.trees_needed.toFixed(
                                              2
                                            )}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            trees to absorb
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xl">🚗</span>
                                        <div>
                                          <p className="text-sm font-semibold">
                                            {file.calculationResult.equivalents.car_km_equivalent.toFixed(
                                              1
                                            )}{" "}
                                            km
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            car travel
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xl">📱</span>
                                        <div>
                                          <p className="text-sm font-semibold">
                                            {file.calculationResult.equivalents.smartphone_charges.toFixed(
                                              0
                                            )}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            phone charges
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear All Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setUploadedFiles([])}
                  className="text-sm text-muted-foreground hover:text-destructive"
                >
                  Clear All Files
                </button>
              </div>
            </div>
          )}

          {/* Empty State Info */}
          {uploadedFiles.length === 0 && (
            <div className="rounded-xl border border-dashed border-muted-foreground/25 bg-muted/10 p-6">
              <h3 className="mb-3 font-semibold text-foreground">Supported Machines</h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: "🔧", name: "CNC Machines" },
                  { icon: "⚙️", name: "Lathes" },
                  { icon: "🛠️", name: "Milling Machines" },
                  { icon: "🖨️", name: "3D Printers" },
                  { icon: "⚡", name: "Welding Machines" },
                  { icon: "🔬", name: "Laser Cutters" },
                  { icon: "🏭", name: "Injection Molding" },
                  { icon: "💨", name: "Compressors" },
                  { icon: "🤖", name: "Robot Arms" },
                ].map((machine) => (
                  <div
                    key={machine.name}
                    className="flex items-center gap-2 rounded-lg bg-background/50 p-2"
                  >
                    <span className="text-lg">{machine.icon}</span>
                    <span className="text-sm text-muted-foreground">{machine.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* API Tab */}
      {activeTab === "api" && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 space-y-1">
            <h2 className="text-lg font-semibold text-card-foreground">API Access</h2>
            <p className="text-sm text-muted-foreground">
              Integrate CarbonCAM into your systems via REST API
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">API Endpoint</p>
              <code className="block rounded bg-background p-3 font-mono text-sm text-muted-foreground">
                POST /api/calculate
              </code>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Example Request</p>
              <pre className="overflow-x-auto rounded bg-background p-3 font-mono text-xs text-muted-foreground">
                {`{
  "machine_id": "cnc_1",
  "material_id": "mat_4140",
  "initial_weight_kg": 10,
  "final_weight_kg": 9.2,
  "time_min": 30
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
