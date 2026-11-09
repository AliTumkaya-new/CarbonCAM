import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import StoreBadges from "../../store-badges";
import styles from "./app.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish
      ? "CarbonCAM Mobil Uygulama — COP31 Uyumlu Akıllı Karbon & Enerji Asistanı"
      : "CarbonCAM Mobile App — COP31 Aligned Smart Carbon & Energy Assistant",
    description: turkish
      ? "Güneş enerjisi karbon azaltımı, elektrik faturası okuma ve cihaz bazlı emisyon analiziyle COP31 iklim hedeflerine uyumlu mobil sürdürülebilirlik uygulaması."
      : "Mobile sustainability app aligned with COP31 climate goals, featuring solar carbon offset calculations, smart utility bill scanning, and appliance-level emission analysis.",
    alternates: { canonical: "https://carboncam.com.tr/app" },
  };
}

export default async function MobileAppPage() {
  const turkish = (await getLocale()) === "tr";

  const copy = turkish
    ? {
        copBadge: "COP31 & Net-Zero Vizyonu",
        version: "Sürüm 1.2 · Hesap Zorunluluğu Yok",
        title: "Sürdürülebilir Gelecek Cebinizde:",
        titleHighlight: "Akıllı Enerji, Fatura ve Karbon Asistanı",
        intro:
          "CarbonCAM mobil uygulaması; evinizde, ofisinizde ve işletmenizde enerji tüketimini şeffaflaştırır. Yapay zeka destekli elektrik faturası okumadan güneş enerjisi karbon ikamesine kadar tüm adımları COP31 iklim hedefleriyle uyumlu verilere dönüştürür.",
        privacyLink: "Gizlilik Politikası",
        deletionLink: "Hesap Silme",
        methodologyLink: "Hesaplama Metodolojisi",
        supportLink: "Destek Al",

        // Showcase card
        showcaseStatus: "Gerçek Zamanlı Analiz",
        stat1Value: "0.44",
        stat1Unit: "kg CO₂e/kWh",
        stat1Label: "Şebeke Emisyon Katsayısı",
        stat2Value: "%42",
        stat2Unit: "tasarruf",
        stat2Label: "Ortalama Fatura Potansiyeli",
        pill1: "Elektrik Faturası Okuma (OCR)",
        pill1Tag: "AI Destekli",
        pill2: "Güneş Paneli Karbon İkamesi",
        pill2Tag: "Solar Offset",
        pill3: "Cihaz Watt & Tüketim Simülatörü",
        pill3Tag: "Yerel Hesap",

        // COP31 section
        copKicker: "Küresel İklim Eylemi",
        copHeading: "COP31 ve 2030 / 2053 Net Sıfır Hedeflerine Tam Uyum",
        copLead:
          "2026 Birleşmiş Milletler İklim Değişikliği Konferansı (COP31) vizyonunu bireysel ve kurumsal ölçekte hayata geçirin. Şeffaf ve bilimsel metodolojilerle her kWh elektriğin iklim etkisini kontrol altına alın.",
        copCards: [
          {
            title: "IPCC & Ulusal Standartlar",
            desc: "Uygulama; IPCC kılavuzları, EPDK şebeke emisyon faktörleri ve doğrulanmış emisyon çarpanları üzerinden güvenilir hesaplama yapar.",
          },
          {
            title: "2030 ve 2053 Yol Haritası",
            desc: "Ulusal katkı beyanları (NDC) ve sıfır emisyon hedefleriyle paralel, aylık ve yıllık karbon bütçenizi kolayca yönetin.",
          },
          {
            title: "Ölçülebilir Çevresel Eylem",
            desc: "Sadece teorik bilgi değil; somut adımlarla önlenen karbon miktarını ve korunan ağaç eşdeğerini canlı raporlayın.",
          },
        ],

        // Feature 1: Fatura Okuma
        feat1Kicker: "Akıllı Kamera & OCR Teknolojisi",
        feat1Title: "Elektrik Faturanı Tara, Gizli Tüketimi ve Karbonunu Keşfet",
        feat1Text:
          "Kağıt veya dijital elektrik faturanızı telefonunuzun kamerasıyla saniyeler içinde okutun. Akıllı OCR motorumuz tüketim detaylarınızı anında analiz etsin.",
        feat1Bullets: [
          {
            title: "Otomatik Tüketim Ayrıştırması",
            desc: "Aktif tüketim (kWh), kademeli tarife oranları, dağıtım ve vergileri otomatik olarak ayıklar.",
          },
          {
            title: "Anında Karbon Salımı Tespiti",
            desc: "Faturadaki kWh değeri şebeke emisyon faktörüyle çarpılarak hanenizin o aya ait net karbon salımı hesaplanır.",
          },
          {
            title: "Anomali ve Kaçak Tüketim Alarmı",
            desc: "Önceki aylara ve mevsim normallerine göre beklenmeyen tüketim sıçramalarını tespit eder, tasarruf tavsiyeleri üretir.",
          },
        ],
        feat1WidgetHeader: "Fatura Analiz Özeti",
        feat1WidgetTag: "Başarılı Tarama",
        feat1Row1Label: "Dönem Tüketimi",
        feat1Row1Value: "342.50 kWh",
        feat1Row2Label: "Tahmini Karbon Salımı",
        feat1Row2Value: "150.70 kg CO₂e",
        feat1Row3Label: "Ağaç Dengeleme İhtiyacı",
        feat1Row3Value: "7 Yetişkin Ağaç / Yıl",
        feat1Row4Label: "Önerilen Tasarruf Potansiyeli",
        feat1Row4Value: "%18 (61.6 kWh)",

        // Feature 2: Güneş Enerjisi
        feat2Kicker: "Yenilenebilir Enerji Entegrasyonu",
        feat2Title: "Güneş Enerjisi ile Karbon Emisyon Azaltımını Hesapla",
        feat2Text:
          "Çatınızdaki, balkonunuzdaki veya tesisinizdeki güneş enerjisi (GES) panellerinin şebekeden çekilen karbon yoğun elektriği nasıl ikame ettiğini canlı görün.",
        feat2Bullets: [
          {
            title: "Şebeke Karbonu İkamesi",
            desc: "Üretilen her 1 kWh güneş elektriği, şebekedeki kömür ve doğal gaz kaynaklı emisyonu doğrudan önler.",
          },
          {
            title: "Canlı Ağaç ve Benzin Eşdeğeri",
            desc: "GES panelinizin önlediği CO₂e miktarını 'kurtarılan ağaç' ve 'tasarruf edilen otomobil kilometresi' cinsinden takip edin.",
          },
          {
            title: "Emisyon Amortisman Takibi",
            desc: "Panellerin üretim aşamasındaki ayak izini kaç ayda amorti edip net çevre kazancına geçtiğini gösterir.",
          },
        ],
        feat2WidgetHeader: "Solar Karbon Kazanımı",
        feat2WidgetTag: "Yenilenebilir",
        solarBigNumber: "1.85 Ton",
        solarBigLabel: "Yıllık Önlenen CO₂e Salımı",
        solarMini1Value: "88 Ağaç",
        solarMini1Label: "Yıllık Eşdeğer Kazanım",
        solarMini2Value: "4,200 kWh",
        solarMini2Label: "Temiz Üretim / Yıl",

        // Feature 3: Cihaz ve Görevler
        feat3Kicker: "Cihaz ve Alışkanlık Yönetimi",
        feat3Title: "Cihaz Gücünden Yıllık Karbon Simülasyonuna",
        feat3Text:
          "Buzdolabı, klima, kombi, iş bilgisayarı veya aydınlatma armatürlerinin etiketindeki Watt değerini girin; günlük, aylık ve yıllık karbon profilinizi oluşturun.",
        feat3Bullets: [
          {
            title: "Cihaz Etiketi Tarayıcı",
            desc: "Cihaz arkasındaki güç etiketini fotoğraflayarak Watt ve Volt değerlerini anında hesaba aktarın.",
          },
          {
            title: "Sürdürülebilirlik Görevleri",
            desc: "Günlük çevre dostu mikro görevlerle tüketim alışkanlıklarınızı eğlenceli ve ölçülebilir bir rutine çevirin.",
          },
          {
            title: "Sayaç Karşılaştırma",
            desc: "Haftalık ve aylık sayaç fotoğraflarınızı aynı koşullarda kıyaslayarak tüketim trendinizi görün.",
          },
        ],
        feat3WidgetHeader: "Cihaz Simülasyonu",
        feat3WidgetTag: "Klima 12.000 BTU",
        feat3Row1Label: "Cihaz Gücü",
        feat3Row1Value: "1,150 Watt",
        feat3Row2Label: "Günlük Kullanım",
        feat3Row2Value: "6 Saat",
        feat3Row3Label: "Aylık Tüketim",
        feat3Row3Value: "207 kWh",
        feat3Row4Label: "Aylık Emisyon",
        feat3Row4Value: "91.08 kg CO₂e",

        // Trust cards
        trustTitle1: "Tamamen Cihazınızda Kalır",
        trustBody1:
          "Fatura fotoğraflarınız, sayaç kayıtlarınız ve kişisel verileriniz telefonunuzda yerel olarak saklanır; harici sunuculara aktarılmaz.",
        trustTitle2: "Kayıt Zorunluluğu Yok",
        trustBody2:
          "Uygulamayı indirdiğiniz an üye olmadan, kredi kartı bilgisi girmeden doğrudan kullanmaya başlayabilirsiniz.",
        trustTitle3: "Bilimsel ve Şeffaf Formüller",
        trustBody3:
          "Tüm çarpanlar, emisyon katsayıları ve birim dönüşümleri açık formüllerle sunulur. Hesapların kaynağını her zaman görebilirsiniz.",

        // Bottom CTA
        bottomTitle: "Karbon Ayak İzinizi Bugün Kontrol Altına Alın",
        bottomLead:
          "CarbonCAM mobil uygulamasını hemen ücretsiz keşfedin. COP31 hedefleriyle uyumlu adımlarla hem faturanızdan hem de karbon salımınızdan tasarruf edin.",
        disclaimer:
          "Bilgilendirme: CarbonCAM tarafından üretilen veriler, kullanıcı girdilerine, ortalama şebeke çarpanlarına ve standart emisyon katsayılarına dayalı eğitim ve karar destek tahminleridir; resmi denetim veya enerji faturası yerine geçmez.",
      }
    : {
        copBadge: "COP31 & Net-Zero Vision",
        version: "Version 1.2 · No Account Required",
        title: "A Sustainable Future in Your Pocket:",
        titleHighlight: "Smart Energy, Utility Bill & Carbon Assistant",
        intro:
          "The CarbonCAM mobile app brings crystal-clear visibility to your home, office, and business energy consumption. From AI-driven electricity bill scanning to solar carbon offset tracking, it turns every kilowatt-hour into measurable climate action aligned with COP31 goals.",
        privacyLink: "Privacy Policy",
        deletionLink: "Account Deletion",
        methodologyLink: "Methodology",
        supportLink: "Support",

        // Showcase card
        showcaseStatus: "Real-Time Analysis",
        stat1Value: "0.44",
        stat1Unit: "kg CO₂e/kWh",
        stat1Label: "Grid Emission Factor",
        stat2Value: "42%",
        stat2Unit: "savings",
        stat2Label: "Average Bill Potential",
        pill1: "Utility Bill Scanner (OCR)",
        pill1Tag: "AI Powered",
        pill2: "Solar Carbon Offset Tracker",
        pill2Tag: "Solar Offset",
        pill3: "Appliance Wattage Simulator",
        pill3Tag: "Local Math",

        // COP31 section
        copKicker: "Global Climate Action",
        copHeading: "Full Alignment with COP31 and 2030 / 2053 Net-Zero Targets",
        copLead:
          "Bring the vision of the 2026 UN Climate Change Conference (COP31) into your everyday choices. Gain complete control over your emissions through transparent, science-backed methodology.",
        copCards: [
          {
            title: "IPCC & National Standards",
            desc: "The app calculates carbon footprints using certified grid emission factors and IPCC-compliant carbon methodologies.",
          },
          {
            title: "2030 & 2053 Roadmap",
            desc: "Align your personal or commercial footprint with national climate pledges (NDCs) and long-term net-zero goals.",
          },
          {
            title: "Measurable Real Impact",
            desc: "Transform environmental awareness into tangible numbers: track prevented carbon and tree-absorbency equivalents.",
          },
        ],

        // Feature 1: Fatura Okuma
        feat1Kicker: "Smart Camera & OCR Technology",
        feat1Title: "Scan Your Utility Bill, Uncover Hidden Consumption & Carbon",
        feat1Text:
          "Point your camera at any paper or digital electricity bill. Our intelligent OCR engine instantly reads active kilowatt-hours, tariff brackets, and calculates your household carbon footprint.",
        feat1Bullets: [
          {
            title: "Automatic Breakdown",
            desc: "Instantly extracts total kWh consumption, multi-tariff time slots, distribution fees, and billing periods.",
          },
          {
            title: "Immediate Carbon Assessment",
            desc: "Multiplies consumption by regional grid emission factors to reveal the true environmental cost of your monthly power.",
          },
          {
            title: "Anomaly & Leakage Detection",
            desc: "Detects unexpected spikes against seasonal patterns and provides tailored tips to trim excess consumption.",
          },
        ],
        feat1WidgetHeader: "Bill Scan Result",
        feat1WidgetTag: "Verified OCR",
        feat1Row1Label: "Billing Period Usage",
        feat1Row1Value: "342.50 kWh",
        feat1Row2Label: "Estimated Carbon Footprint",
        feat1Row2Value: "150.70 kg CO₂e",
        feat1Row3Label: "Tree Offset Required",
        feat1Row3Value: "7 Mature Trees / Year",
        feat1Row4Label: "Identified Savings Potential",
        feat1Row4Value: "18% (61.6 kWh)",

        // Feature 2: Güneş Enerjisi
        feat2Kicker: "Renewable Energy Integration",
        feat2Title: "Calculate Solar Energy Carbon Offsets with Precision",
        feat2Text:
          "Track how rooftop or balcony photovoltaic (PV) solar systems displace carbon-intensive grid electricity with clean, localized power.",
        feat2Bullets: [
          {
            title: "Grid Carbon Displacement",
            desc: "Every clean kilowatt-hour produced directly substitutes fossil-fuel powered grid electricity.",
          },
          {
            title: "Live Trees & Mileage Equivalents",
            desc: "Visualize your solar offsets through intuitive equivalencies like preserved forest acres and avoided car mileage.",
          },
          {
            title: "Manufacturing Payback Calculator",
            desc: "Monitor when your solar installation pays off its embedded manufacturing footprint and becomes net climate positive.",
          },
        ],
        feat2WidgetHeader: "Solar Carbon Offset",
        feat2WidgetTag: "Renewable",
        solarBigNumber: "1.85 Tons",
        solarBigLabel: "Annual CO₂e Prevented",
        solarMini1Value: "88 Trees",
        solarMini1Label: "Annual Absorption",
        solarMini2Value: "4,200 kWh",
        solarMini2Label: "Clean Power / Year",

        // Feature 3: Cihaz ve Görevler
        feat3Kicker: "Appliance & Habit Management",
        feat3Title: "From Appliance Wattage to Long-Term Carbon Projections",
        feat3Text:
          "Input the rated wattage of heat pumps, air conditioners, refrigerators, or computers to uncover real-time energy costs and annual carbon footprints.",
        feat3Bullets: [
          {
            title: "Specification Label Scanner",
            desc: "Capture appliance nameplates with your camera to quickly extract rated power and voltage without manual guessing.",
          },
          {
            title: "Daily Eco-Challenges",
            desc: "Build sustainable habits with practical daily challenges that turn conservation into an engaging routine.",
          },
          {
            title: "Meter Reading Comparator",
            desc: "Photograph utility meters over time to verify whether your conservation efforts are reflecting on real dials.",
          },
        ],
        feat3WidgetHeader: "Appliance Simulation",
        feat3WidgetTag: "Air Conditioner 12k BTU",
        feat3Row1Label: "Rated Power",
        feat3Row1Value: "1,150 Watts",
        feat3Row2Label: "Daily Run Time",
        feat3Row2Value: "6 Hours",
        feat3Row3Label: "Monthly Energy",
        feat3Row3Value: "207 kWh",
        feat3Row4Label: "Monthly Emissions",
        feat3Row4Value: "91.08 kg CO₂e",

        // Trust cards
        trustTitle1: "Stored Locally On Your Device",
        trustBody1:
          "Your bill photos, meter snapshots, and calculation history remain strictly on your smartphone and are never uploaded to remote cloud databases.",
        trustTitle2: "Zero Account Requirement",
        trustBody2:
          "Start exploring immediately upon download without registering, creating passwords, or entering billing details.",
        trustTitle3: "Transparent, Open Formulas",
        trustBody3:
          "Every calculation is backed by visible, peer-reviewed conversion constants so you always know how conclusions were reached.",

        // Bottom CTA
        bottomTitle: "Take Control of Your Carbon Footprint Today",
        bottomLead:
          "Discover the CarbonCAM mobile experience. Take measurable steps aligned with COP31 to cut both your energy bills and emissions.",
        disclaimer:
          "Disclaimer: Results generated by CarbonCAM are educational decision-support estimates based on user inputs, standard grid factors, and standard conversion models; they do not replace certified environmental audits or official utility invoices.",
      };

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.badgeRow}>
              <span className={styles.copBadge}>
                <span className={styles.copDot} />
                {copy.copBadge}
              </span>
              <span className={styles.versionBadge}>{copy.version}</span>
            </div>

            <h1 className={styles.title}>
              {copy.title}
              <span className={styles.titleHighlight}>{copy.titleHighlight}</span>
            </h1>

            <p className={styles.intro}>{copy.intro}</p>

            <div className={styles.heroActions}>
              <StoreBadges turkish={turkish} />
              <div className={styles.linkPills}>
                <Link className={styles.primaryPill} href="/calculation-methodology">
                  {copy.methodologyLink}
                </Link>
                <Link className={styles.secondaryPill} href="/privacy">
                  {copy.privacyLink}
                </Link>
                <Link className={styles.secondaryPill} href="/account-deletion">
                  {copy.deletionLink}
                </Link>
                <Link className={styles.secondaryPill} href="/contact">
                  {copy.supportLink}
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Feature Preview Card */}
          <div className={styles.heroShowcase}>
            <div className={styles.showcaseHeader}>
              <span className={styles.showcaseStatus}>{copy.showcaseStatus}</span>
              <span className={styles.widgetTag}>CarbonCAM Mobile</span>
            </div>

            <div className={styles.showcaseStatGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  {copy.stat1Value}
                  <span className={styles.statValueSmall}>{copy.stat1Unit}</span>
                </div>
                <div className={styles.statLabel}>{copy.stat1Label}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  {copy.stat2Value}
                  <span className={styles.statValueSmall}>{copy.stat2Unit}</span>
                </div>
                <div className={styles.statLabel}>{copy.stat2Label}</div>
              </div>
            </div>

            <div className={styles.previewPillList}>
              <div className={styles.previewPill}>
                <span>{copy.pill1}</span>
                <span className={styles.previewPillTag}>{copy.pill1Tag}</span>
              </div>
              <div className={styles.previewPill}>
                <span>{copy.pill2}</span>
                <span className={styles.previewPillTag}>{copy.pill2Tag}</span>
              </div>
              <div className={styles.previewPill}>
                <span>{copy.pill3}</span>
                <span className={styles.previewPillTag}>{copy.pill3Tag}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COP31 Deep-Dive Section */}
      <section className={styles.copSection}>
        <div className={styles.copBanner}>
          <p className={styles.copKicker}>{copy.copKicker}</p>
          <h2 className={styles.copHeading}>{copy.copHeading}</h2>
          <p className={styles.copLead}>{copy.copLead}</p>

          <div className={styles.copGrid}>
            {copy.copCards.map((card) => (
              <div className={styles.copCard} key={card.title}>
                <div className={styles.copCardIcon}>
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" width="24">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Spotlights */}
      <div className={styles.featuresWrapper}>
        {/* Spotlight 1: Smart Bill Scanner */}
        <section className={styles.featureBlock}>
          <div className={styles.featureInfo}>
            <span className={styles.featureKicker}>
              <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
                <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 12h8M8 16h5M8 8h3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copy.feat1Kicker}
            </span>
            <h2 className={styles.featureTitle}>{copy.feat1Title}</h2>
            <p className={styles.featureText}>{copy.feat1Text}</p>

            <div className={styles.featureBulletList}>
              {copy.feat1Bullets.map((bullet) => (
                <div className={styles.featureBullet} key={bullet.title}>
                  <div className={styles.featureCheck}>✓</div>
                  <div>
                    <h3 className={styles.bulletTitle}>{bullet.title}</h3>
                    <p className={styles.bulletDesc}>{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.featureVisual}>
            <div className={styles.widgetHeader}>
              <span>{copy.feat1WidgetHeader}</span>
              <span className={styles.widgetTag}>{copy.feat1WidgetTag}</span>
            </div>

            <div className={styles.billCard}>
              <div className={styles.billRow}>
                <span>{copy.feat1Row1Label}</span>
                <span>{copy.feat1Row1Value}</span>
              </div>
              <div className={styles.billRow}>
                <span>{copy.feat1Row2Label}</span>
                <span>{copy.feat1Row2Value}</span>
              </div>
              <div className={styles.billRow}>
                <span>{copy.feat1Row3Label}</span>
                <span>{copy.feat1Row3Value}</span>
              </div>
              <div className={styles.billRow}>
                <span>{copy.feat1Row4Label}</span>
                <span>{copy.feat1Row4Value}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Spotlight 2: Solar Energy Offset */}
        <section className={`${styles.featureBlock} ${styles.featureBlockReverse}`}>
          <div className={styles.featureInfo}>
            <span className={styles.featureKicker}>
              <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
              </svg>
              {copy.feat2Kicker}
            </span>
            <h2 className={styles.featureTitle}>{copy.feat2Title}</h2>
            <p className={styles.featureText}>{copy.feat2Text}</p>

            <div className={styles.featureBulletList}>
              {copy.feat2Bullets.map((bullet) => (
                <div className={styles.featureBullet} key={bullet.title}>
                  <div className={styles.featureCheck}>✓</div>
                  <div>
                    <h3 className={styles.bulletTitle}>{bullet.title}</h3>
                    <p className={styles.bulletDesc}>{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.featureVisual}>
            <div className={styles.widgetHeader}>
              <span>{copy.feat2WidgetHeader}</span>
              <span className={styles.widgetTag}>{copy.feat2WidgetTag}</span>
            </div>

            <div className={styles.solarMetricBox}>
              <div className={styles.solarValueBig}>{copy.solarBigNumber}</div>
              <div style={{ color: "#92400e", fontSize: "13px", fontWeight: 700, marginTop: "4px" }}>
                {copy.solarBigLabel}
              </div>

              <div className={styles.solarGrid}>
                <div className={styles.solarMiniCard}>
                  <div className={styles.solarMiniNumber}>{copy.solarMini1Value}</div>
                  <div className={styles.solarMiniLabel}>{copy.solarMini1Label}</div>
                </div>
                <div className={styles.solarMiniCard}>
                  <div className={styles.solarMiniNumber}>{copy.solarMini2Value}</div>
                  <div className={styles.solarMiniLabel}>{copy.solarMini2Label}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spotlight 3: Appliance Simulation */}
        <section className={styles.featureBlock}>
          <div className={styles.featureInfo}>
            <span className={styles.featureKicker}>
              <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
                <rect height="16" rx="2" width="20" x="2" y="4" />
                <path d="m9 10 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copy.feat3Kicker}
            </span>
            <h2 className={styles.featureTitle}>{copy.feat3Title}</h2>
            <p className={styles.featureText}>{copy.feat3Text}</p>

            <div className={styles.featureBulletList}>
              {copy.feat3Bullets.map((bullet) => (
                <div className={styles.featureBullet} key={bullet.title}>
                  <div className={styles.featureCheck}>✓</div>
                  <div>
                    <h3 className={styles.bulletTitle}>{bullet.title}</h3>
                    <p className={styles.bulletDesc}>{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.featureVisual}>
            <div className={styles.widgetHeader}>
              <span>{copy.feat3WidgetHeader}</span>
              <span className={styles.widgetTag}>{copy.feat3WidgetTag}</span>
            </div>

            <div className={styles.billCard}>
              <div className={styles.billRow}>
                <span>{copy.feat3Row1Label}</span>
                <span>{copy.feat3Row1Value}</span>
              </div>
              <div className={styles.billRow}>
                <span>{copy.feat3Row2Label}</span>
                <span>{copy.feat3Row2Value}</span>
              </div>
              <div className={styles.billRow}>
                <span>{copy.feat3Row3Label}</span>
                <span>{copy.feat3Row3Value}</span>
              </div>
              <div className={styles.billRow}>
                <span>{copy.feat3Row4Label}</span>
                <span>{copy.feat3Row4Value}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Trust & Local Security */}
      <section className={styles.trustGrid}>
        <div className={styles.trustCard}>
          <h3>{copy.trustTitle1}</h3>
          <p>{copy.trustBody1}</p>
        </div>
        <div className={styles.trustCard}>
          <h3>{copy.trustTitle2}</h3>
          <p>{copy.trustBody2}</p>
        </div>
        <div className={styles.trustCard}>
          <h3>{copy.trustTitle3}</h3>
          <p>{copy.trustBody3}</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaInner}>
          <h2>{copy.bottomTitle}</h2>
          <p>{copy.bottomLead}</p>
          <div className={styles.bottomBadges}>
            <StoreBadges turkish={turkish} />
          </div>
          <p className={styles.disclaimer}>{copy.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}
