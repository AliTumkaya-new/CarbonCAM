import { articles, type Article, type ArticleCategory } from "./articles";
import { articleEnhancements } from "./article-enhancements";
import { articleFaqs } from "./article-faqs";

type ArticleTranslation = Pick<
  Article,
  "title" | "metaTitle" | "metaDescription" | "excerpt" | "content"
>;

export const categoryLabelsEn: Record<ArticleCategory, string> = {
  "temel-bilgiler": "Carbon basics",
  hesaplama: "Calculations",
  azaltma: "Reduction guides",
  turkiye: "Türkiye data",
  sektorel: "Sector insights",
};

const translations: Record<string, ArticleTranslation> = {
  "karbon-ayak-izi-nedir": {
    title: "What Is a Carbon Footprint? A Practical Guide",
    metaTitle: "What Is a Carbon Footprint? A Practical Guide",
    metaDescription:
      "Understand carbon footprints, CO2e, major emission sources, and the difference between personal and organizational accounting.",
    excerpt:
      "A carbon footprint expresses the climate impact of activities in a common CO2-equivalent unit. This guide explains what it includes and why boundaries matter.",
    content: [
      {
        id: "tanim",
        title: "Carbon footprint definition",
        content:
          "<p>A <strong>carbon footprint</strong> is the total greenhouse-gas impact associated with a person, product, activity, or organization. It is normally reported as carbon-dioxide equivalent (CO₂e), which converts different greenhouse gases into one comparable unit.</p><p>The result depends on the chosen boundary, time period, input data, and emission factors. A transparent estimate should always state these assumptions.</p>",
      },
      {
        id: "neden-onemli",
        title: "Why carbon footprints matter",
        content:
          "<p>Measurement helps identify the activities with the greatest impact. That makes it easier to prioritize energy efficiency, lower-carbon transport, reduced waste, and more informed purchasing.</p><p>An estimate is a decision aid, not proof of a certified reduction. Verified reporting requires documented data, an appropriate standard, and independent review where applicable.</p>",
      },
      {
        id: "nasil-olusur",
        title: "Where emissions come from",
        content:
          "<ul><li><strong>Home energy:</strong> electricity and heating.</li><li><strong>Transport:</strong> private vehicles, public transport, and flights.</li><li><strong>Food:</strong> production, processing, refrigeration, and waste.</li><li><strong>Consumption:</strong> manufacturing, delivery, use, and disposal of goods.</li></ul>",
      },
      {
        id: "olcum-birimleri",
        title: "Units and standards",
        content:
          "<p>CO₂e is the common reporting unit. Widely used frameworks include the GHG Protocol and the ISO 14060 family. The correct framework depends on whether the subject is a company, product, project, or personal estimate.</p><p>CarbonCAM currently provides a transparent appliance-energy estimate. It is not a corporate inventory, meter reading, or independent certification.</p>",
      },
      {
        id: "kisisel-vs-kurumsal",
        title: "Personal and organizational footprints",
        content:
          "<p>A personal footprint considers household energy, travel, food, purchases, and waste. An organizational inventory uses defined operational boundaries and usually reports Scope 1, Scope 2, and relevant Scope 3 emissions.</p>",
      },
    ],
  },
  "karbon-ayak-izi-nasil-hesaplanir": {
    title: "How to Calculate a Carbon Footprint",
    metaTitle: "How to Calculate a Carbon Footprint Step by Step",
    metaDescription:
      "Learn the activity-data times emission-factor formula, define boundaries, select reliable factors, and avoid common calculation mistakes.",
    excerpt:
      "Carbon calculations multiply measurable activity data by a matching emission factor. Reliable results require consistent units, boundaries, and sources.",
    content: [
      {
        id: "temel-formul",
        title: "The core formula",
        content:
          "<p>The basic relationship is <strong>emissions = activity data × emission factor</strong>. Activity data may be kWh of electricity, litres of fuel, kilometres travelled, or kilograms of material.</p><p>Units must match. For example, an electricity factor expressed in kg CO₂e/kWh must be multiplied by consumption in kWh.</p>",
      },
      {
        id: "emisyon-faktorleri",
        title: "Choosing emission factors",
        content:
          "<p>Use a factor that matches the location, year, technology, and activity boundary. Electricity factors change as the generation mix changes, so the source year should be shown with the result.</p>",
      },
      {
        id: "hesaplama-adimlari",
        title: "Step-by-step method",
        content:
          "<ol><li>Define the subject, period, and boundary.</li><li>Collect bills, meter readings, fuel records, or other activity data.</li><li>Convert inputs into consistent units.</li><li>Apply documented emission factors.</li><li>Review assumptions and avoid double counting.</li></ol><p>In CarbonCAM, you can enter an appliance wattage and daily use duration to estimate energy and CO₂e. Records remain on your device.</p>",
      },
      {
        id: "karbon-hesaplama-araclari",
        title: "Calculation tools",
        content:
          "<p>Spreadsheets work for small inventories, while specialized tools can improve consistency and audit trails. CarbonCAM focuses on appliance estimates, transparent formulas, local records, daily tasks, and comparable meter-reading savings.</p>",
      },
    ],
  },
  "araba-karbon-emisyonu-hesaplama": {
    title: "How to Estimate Car Carbon Emissions",
    metaTitle: "Car Carbon Emissions Calculation Guide",
    metaDescription:
      "Estimate vehicle emissions from fuel use or distance, understand key variables, and compare practical reduction options.",
    excerpt:
      "Vehicle emissions can be estimated from fuel consumed or distance travelled. Fuel type, efficiency, occupancy, and driving conditions affect the result.",
    content: [
      {
        id: "arac-emisyon-genel",
        title: "Understanding vehicle emissions",
        content:
          "<p>Direct tailpipe emissions come from burning petrol, diesel, LPG, or other fuels. A broader lifecycle view may also include fuel production, vehicle manufacturing, maintenance, and electricity generation for electric vehicles.</p>",
      },
      {
        id: "yakit-turleri",
        title: "Fuel-specific factors",
        content:
          "<p>Fuel factors are normally expressed per litre, kilogram, or unit of energy. Use an authoritative factor for the fuel and region, and do not mix tailpipe-only factors with lifecycle factors in the same comparison.</p>",
      },
      {
        id: "hesaplama-ornegi",
        title: "Calculation example",
        content:
          "<p>For a fuel-based estimate, multiply litres consumed by the matching kg CO₂e-per-litre factor. For a distance-based estimate, multiply kilometres by a factor that reflects the vehicle class and occupancy.</p>",
      },
      {
        id: "azaltma-onerileri",
        title: "Ways to reduce car emissions",
        content:
          "<ul><li>Combine trips and avoid unnecessary mileage.</li><li>Maintain tyre pressure and the vehicle regularly.</li><li>Use public transport, walking, cycling, or shared journeys where practical.</li><li>Compare total energy use, not only tailpipe emissions, when changing vehicles.</li></ul><p>CarbonCAM's current mobile release does not calculate vehicle emissions; this article is informational.</p>",
      },
    ],
  },
  "ucak-yolculugu-karbon-emisyonu": {
    title: "Air Travel and Carbon Emissions",
    metaTitle: "Air Travel Carbon Emissions Guide",
    metaDescription:
      "Learn what drives flight emissions, why estimates vary, and how rail, coach, and fewer flights can reduce travel impact.",
    excerpt:
      "Flight emissions vary with distance, aircraft, load factor, cabin class, and the treatment of non-CO2 effects.",
    content: [
      {
        id: "havacilik-emisyonlari",
        title: "Aviation and climate impact",
        content:
          "<p>Aircraft burn fuel at altitude and produce carbon dioxide as well as other climate effects. Per-passenger estimates divide the flight impact across travellers and may apply additional factors for high-altitude effects.</p>",
      },
      {
        id: "populer-rotalar",
        title: "Comparing routes",
        content:
          "<p>Short flights can have a high impact per kilometre because takeoff and landing use substantial fuel. Cabin class also matters because larger seat space allocates more of the aircraft footprint to each passenger.</p>",
      },
      {
        id: "alternatifler",
        title: "Lower-emission alternatives",
        content:
          "<p>Rail and coach travel are often lower-emission options where routes exist. Combining journeys, choosing direct flights, travelling economy, and flying less can also reduce impact.</p><p>CarbonCAM's current mobile release does not calculate flight emissions; these comparisons are informational.</p>",
      },
    ],
  },
  "elektrik-tuketimi-karbon-emisyonu": {
    title: "Electricity Use and Carbon Emissions",
    metaTitle: "Electricity Consumption and Carbon Emissions in Türkiye",
    metaDescription:
      "Understand how electricity use becomes CO2e, estimate appliance energy, and reduce avoidable household consumption.",
    excerpt:
      "Electricity emissions are estimated by multiplying consumption in kWh by a grid factor for the relevant country and year.",
    content: [
      {
        id: "turkiye-elektrik",
        title: "Electricity emissions in Türkiye",
        content:
          "<p>The electricity-grid factor reflects the generation mix and changes over time. CarbonCAM identifies the source year and uses Türkiye's published 2023 distribution-grid consumption factor of <strong>0.469 kg CO₂e/kWh</strong> for its appliance estimates.</p>",
      },
      {
        id: "ev-aletleri",
        title: "Estimating appliance energy",
        content:
          "<p>Daily energy is estimated as <strong>wattage ÷ 1,000 × hours used</strong>. Multiplying daily kWh by the electricity factor gives estimated daily CO₂e. Label power is not the same as a meter reading, because real devices cycle and operate at different loads.</p>",
      },
      {
        id: "tasarruf-yollari",
        title: "Reducing electricity emissions",
        content:
          "<ul><li>Measure high-use appliances with a suitable meter.</li><li>Reduce unnecessary standby and operating time.</li><li>Choose efficient equipment when replacement is necessary.</li><li>Compare equivalent billing periods or meter readings before claiming savings.</li></ul>",
      },
    ],
  },
  "dogalgaz-karbon-emisyonu": {
    title: "Natural Gas Use and Carbon Emissions",
    metaTitle: "Natural Gas Carbon Emissions Guide",
    metaDescription:
      "Understand direct emissions from natural gas, estimate consumption-based impact, and review household efficiency measures.",
    excerpt:
      "Burning natural gas creates direct carbon emissions. A useful estimate starts with metered consumption and a documented regional factor.",
    content: [
      {
        id: "dogalgaz-emisyon",
        title: "Natural gas and greenhouse gases",
        content:
          "<p>Combustion releases carbon dioxide, while methane leakage may add upstream climate impact. A calculation must state whether it covers combustion only or a wider fuel lifecycle.</p>",
      },
      {
        id: "konut-tuketimi",
        title: "Household consumption",
        content:
          "<p>Household use varies with climate, insulation, building size, occupancy, and heating settings. Use the cubic-metre value from a bill or meter and a factor that matches the reporting method.</p><p>CarbonCAM's current mobile release does not scan gas bills or calculate natural-gas emissions.</p>",
      },
      {
        id: "verimlilik",
        title: "Improving heating efficiency",
        content:
          "<ul><li>Improve roof, wall, window, and pipe insulation.</li><li>Maintain boilers and heating controls.</li><li>Use appropriate temperature schedules.</li><li>Track weather-normalized consumption before and after changes.</li></ul>",
      },
    ],
  },
  "scope-1-scope-2-scope-3-nedir": {
    title: "What Are Scope 1, Scope 2, and Scope 3 Emissions?",
    metaTitle: "Scope 1, Scope 2 and Scope 3 Explained",
    metaDescription:
      "A clear introduction to the GHG Protocol scopes, organizational boundaries, and practical examples.",
    excerpt:
      "The GHG Protocol separates organizational emissions into direct emissions, purchased-energy emissions, and other value-chain emissions.",
    content: [
      {
        id: "ghg-protocol",
        title: "What is the GHG Protocol?",
        content:
          "<p>The GHG Protocol provides widely used frameworks for measuring and reporting greenhouse-gas inventories. Organizations define a boundary, collect activity data, and report emissions consistently over time.</p>",
      },
      {
        id: "scope-1",
        title: "Scope 1: direct emissions",
        content:
          "<p>Scope 1 covers sources an organization owns or controls, such as fuel burned in company vehicles, boilers, furnaces, and process equipment, plus relevant refrigerant leaks.</p>",
      },
      {
        id: "scope-2",
        title: "Scope 2: purchased energy",
        content:
          "<p>Scope 2 covers indirect emissions from purchased electricity, steam, heating, and cooling. The emissions occur at the producer, but are associated with the reporting organization's energy use.</p>",
      },
      {
        id: "scope-3",
        title: "Scope 3: value-chain emissions",
        content:
          "<p>Scope 3 covers other upstream and downstream activities, including purchased goods, business travel, employee commuting, transport, product use, and waste. It is often the broadest and most data-intensive scope.</p>",
      },
      {
        id: "bireysel-uygulama",
        title: "Applying the concept carefully",
        content:
          "<p>The scopes were designed for organizations. They can help explain sources to individuals, but a personal footprint is not a formal Scope inventory. CarbonCAM currently focuses on electricity-related appliance estimates and does not produce a complete Scope 1-3 report.</p>",
      },
    ],
  },
  "turkiyede-karbon-emisyonu": {
    title: "Carbon Emissions in Türkiye: An Overview",
    metaTitle: "Carbon Emissions in Türkiye: Data and Context",
    metaDescription:
      "An overview of Türkiye's principal emission sources, sector distribution, and climate-policy direction.",
    excerpt:
      "Türkiye's emissions reflect energy production, industry, transport, buildings, agriculture, land use, and waste.",
    content: [
      {
        id: "genel-bakis",
        title: "National emissions overview",
        content:
          "<p>National greenhouse-gas inventories combine carbon dioxide, methane, nitrous oxide, and fluorinated gases. Results should be read with the inventory year, scope, and source because historical revisions can change totals.</p>",
      },
      {
        id: "sektorel-dagilim",
        title: "Sector distribution",
        content:
          "<p>Energy production and use are major sources, alongside industrial processes, transport, buildings, agriculture, and waste. The most effective measures differ by sector and require both efficiency and structural change.</p>",
      },
      {
        id: "hedefler",
        title: "Türkiye's climate targets",
        content:
          "<p>Türkiye is a party to the Paris Agreement and has announced a long-term net-zero direction. Current targets, inventories, and policies should always be checked against official national and UNFCCC publications.</p><p>Individuals can contribute through measured energy savings and lower-carbon choices. CarbonCAM helps track appliance estimates and comparable meter readings.</p>",
      },
    ],
  },
  "karbon-ayak-izini-azaltma-yollari": {
    title: "15 Practical Ways to Reduce a Carbon Footprint",
    metaTitle: "15 Practical Carbon Footprint Reduction Ideas",
    metaDescription:
      "Prioritize measurable actions across home energy, transport, food, and consumption without confusing estimates with verified reductions.",
    excerpt:
      "The best reduction plan starts with the largest sources, records a baseline, and compares like-for-like consumption after a change.",
    content: [
      {
        id: "enerji",
        title: "Home energy actions",
        content:
          "<ol><li>Improve insulation and draught sealing.</li><li>Use sensible heating and cooling schedules.</li><li>Replace lighting with efficient alternatives.</li><li>Measure and reduce standby loads.</li></ol>",
      },
      {
        id: "ulasim",
        title: "Transport alternatives",
        content:
          "<ol start=\"5\"><li>Walk or cycle for suitable short trips.</li><li>Use public transport where practical.</li><li>Share journeys and combine errands.</li><li>Reduce avoidable flights and choose direct routes.</li></ol>",
      },
      {
        id: "beslenme",
        title: "Food choices",
        content:
          "<ol start=\"9\"><li>Reduce food waste through planning and storage.</li><li>Increase the share of plant-based meals.</li><li>Choose seasonal products where practical.</li><li>Use leftovers safely and deliberately.</li></ol>",
      },
      {
        id: "tuketim",
        title: "Responsible consumption",
        content:
          "<ol start=\"13\"><li>Repair and maintain products.</li><li>Buy durable or second-hand items where suitable.</li><li>Record a comparable baseline before claiming a saving.</li></ol><p>CarbonCAM supports daily tasks, local appliance records, and meter-based comparisons. It does not independently certify avoided emissions.</p>",
      },
    ],
  },
  "karbon-notr-nedir": {
    title: "What Do Carbon Neutral and Net Zero Mean?",
    metaTitle: "Carbon Neutral vs Net Zero Explained",
    metaDescription:
      "Understand the difference between carbon neutrality and net zero, and why direct emission reductions should come before offsets.",
    excerpt:
      "Carbon neutrality and net zero are related but not identical claims. Credible strategies define scope, reduce emissions, and document any residual balancing.",
    content: [
      {
        id: "tanim",
        title: "Definitions",
        content:
          "<p><strong>Carbon neutral</strong> commonly means balancing a defined amount of carbon emissions through reductions and eligible offsets. <strong>Net zero</strong> generally covers all relevant greenhouse gases, prioritizes deep reductions, and balances only residual emissions with durable removals.</p>",
      },
      {
        id: "bireysel-strateji",
        title: "A practical personal strategy",
        content:
          "<ol><li><strong>Measure:</strong> define a baseline with reliable bills or meter data.</li><li><strong>Reduce:</strong> prioritize efficiency, transport, food, and consumption changes.</li><li><strong>Review:</strong> compare equivalent periods and disclose assumptions.</li><li><strong>Balance cautiously:</strong> investigate quality, additionality, permanence, and verification before using credits.</li></ol><p>CarbonCAM estimates appliance energy from label data; it does not automatically calculate a complete footprint or certify neutrality.</p>",
      },
    ],
  },
  "evde-enerji-verimliligi": {
    title: "Home Energy Efficiency and Carbon Reduction",
    metaTitle: "Home Energy Efficiency Guide",
    metaDescription:
      "Reduce household energy demand through insulation, controls, appliance measurement, and comparable meter readings.",
    excerpt:
      "A more efficient home can improve comfort and reduce energy use. Start with the building envelope, heating controls, and measured consumption.",
    content: [
      {
        id: "yalitim",
        title: "Building insulation",
        content:
          "<p>Roof, wall, floor, window, and draught improvements can reduce heat loss. The best measures depend on the building, climate, ventilation needs, moisture risk, and local construction guidance.</p>",
      },
      {
        id: "akilli-ev",
        title: "Controls and monitoring",
        content:
          "<ul><li>Use heating and cooling schedules that match occupancy.</li><li>Measure high-consumption appliances rather than relying only on label power.</li><li>Reduce standby loads with safe controls.</li><li>Compare equivalent meter periods after a change.</li></ul><p>CarbonCAM estimates appliance energy from wattage and use duration, then supports user-entered meter comparisons.</p>",
      },
    ],
  },
  "surdurulebilir-beslenme-karbon": {
    title: "Sustainable Food and Carbon Footprints",
    metaTitle: "Sustainable Food and Carbon Emissions Guide",
    metaDescription:
      "Understand why food footprints differ and review practical ways to reduce waste and choose lower-impact meals.",
    excerpt:
      "Food emissions depend on production, land use, processing, refrigeration, transport, cooking, and waste.",
    content: [
      {
        id: "gida-emisyonlari",
        title: "Why food footprints vary",
        content:
          "<p>Product type matters, but farming method, land-use change, feed, energy, packaging, transport, refrigeration, and waste also affect the result. Comparisons should use the same lifecycle boundary and functional unit.</p>",
      },
      {
        id: "oneriler",
        title: "Practical food choices",
        content:
          "<ul><li>Plan purchases and store food correctly to reduce waste.</li><li>Include more plant-based meals where appropriate.</li><li>Choose seasonal products and avoid unnecessary air freight.</li><li>Use portions and leftovers deliberately.</li></ul><p>CarbonCAM's current mobile release does not analyze meal photos or calculate dietary emissions.</p>",
      },
    ],
  },
  "karbon-dengeleme-offset": {
    title: "What Is Carbon Offsetting?",
    metaTitle: "Carbon Offsetting and Credit Quality Explained",
    metaDescription:
      "Learn how carbon credits work and why additionality, permanence, leakage, verification, and transparent claims matter.",
    excerpt:
      "Offsets fund projects intended to avoid, reduce, or remove emissions elsewhere. Credit quality and the wording of claims require careful review.",
    content: [
      {
        id: "offset-nasil-calisir",
        title: "How offsetting works",
        content:
          "<p>A carbon credit generally represents a quantified tonne of CO₂e under a specific methodology. Purchasing or retiring a credit does not remove the need to reduce the buyer's own emissions.</p>",
      },
      {
        id: "standartlar",
        title: "Assessing credit quality",
        content:
          "<ul><li><strong>Additionality:</strong> would the result occur without credit finance?</li><li><strong>Permanence:</strong> can stored carbon be reversed?</li><li><strong>Leakage:</strong> does the activity shift emissions elsewhere?</li><li><strong>Verification:</strong> are methods, monitoring, and retirement records independently reviewed?</li></ul><p>CarbonCAM does not sell credits, recommend offset projects, or certify reduction claims.</p>",
      },
    ],
  },
  "paris-iklim-anlasmasi": {
    title: "The Paris Agreement and Türkiye",
    metaTitle: "The Paris Climate Agreement and Türkiye",
    metaDescription:
      "A concise overview of the Paris Agreement, nationally determined contributions, transparency, and Türkiye's participation.",
    excerpt:
      "The Paris Agreement establishes a global framework for limiting warming through national plans, reporting, finance, adaptation, and periodic ambition cycles.",
    content: [
      {
        id: "anlasma-nedir",
        title: "What is the Paris Agreement?",
        content:
          "<p>The agreement was adopted in 2015 under the UN climate convention. Parties submit nationally determined contributions, report progress, and are expected to strengthen ambition over time while addressing adaptation and support.</p>",
      },
      {
        id: "turkiye-ve-paris",
        title: "Türkiye and the agreement",
        content:
          "<p>Türkiye ratified the agreement in 2021 and submits national climate commitments and reporting. Because targets and implementation measures evolve, current details should be checked in official Turkish and UNFCCC documents.</p><p>Measured household energy savings are one practical contribution. CarbonCAM can help make appliance consumption more visible.</p>",
      },
    ],
  },
  "bireysel-karbon-ayak-izi-hesaplama": {
    title: "Personal Carbon Footprint Calculation Guide",
    metaTitle: "How to Estimate a Personal Carbon Footprint",
    metaDescription:
      "Build a personal footprint estimate from home energy, transport, food, and consumption data while keeping boundaries and uncertainty visible.",
    excerpt:
      "A personal footprint estimate is most useful when it uses real activity data, consistent factors, and the same boundary over time.",
    content: [
      {
        id: "ortalamalar",
        title: "Using averages carefully",
        content:
          "<p>National or lifestyle averages can provide context, but they are not a substitute for personal bills and activity records. Define the year, household allocation, and included categories before comparing results.</p><ul><li>Home electricity and heating</li><li>Private and public transport</li><li>Flights</li><li>Food patterns and waste</li><li>Goods and services</li></ul>",
      },
      {
        id: "carboncan-ile-hesaplama",
        title: "What CarbonCAM currently provides",
        content:
          "<ul><li><strong>Appliance impact:</strong> energy and estimated CO₂e from wattage and daily use.</li><li><strong>Transparent formula:</strong> calculation steps and electricity factor.</li><li><strong>Local records:</strong> analysis history stored on the device.</li><li><strong>Verified savings:</strong> change based on comparable user-entered meter readings.</li><li><strong>Daily tasks:</strong> optional environmental reminders.</li><li><strong>Account control:</strong> local-data clearing and permanent account deletion.</li></ul><p>CarbonCAM does not yet calculate a complete personal footprint across every category.</p>",
      },
    ],
  },
};

export function getArticlesForLocale(locale: string): Article[] {
  return articles.map((article) => {
    const translation = locale === "tr" ? undefined : translations[article.slug];
    const localizedArticle: Article = translation
      ? { ...article, ...translation, categoryLabel: categoryLabelsEn[article.category] }
      : article;
    const enhancement = articleEnhancements[article.slug];
    const faq = articleFaqs[article.slug];
    const content = enhancement
      ? [
          ...localizedArticle.content,
          ...(locale === "tr" ? enhancement.tr : enhancement.en),
          ...(faq ? [locale === "tr" ? faq.tr : faq.en] : []),
        ]
      : localizedArticle.content;
    const wordCount = [localizedArticle.title, localizedArticle.excerpt, ...content.map((section) => `${section.title} ${section.content}`)]
      .join(" ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[^;]+;/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return {
      ...localizedArticle,
      content,
      readingTime: Math.max(3, Math.ceil(wordCount / 200)),
      updatedDate: enhancement ? "2026-09-02" : localizedArticle.updatedDate,
      sources: enhancement?.sources,
    };
  });
}

export function getArticleBySlugForLocale(
  slug: string,
  locale: string,
): Article | undefined {
  return getArticlesForLocale(locale).find((article) => article.slug === slug);
}

export function getRelatedArticlesForLocale(
  article: Article,
  locale: string,
): Article[] {
  const localizedArticles = getArticlesForLocale(locale);
  return article.relatedSlugs
    .map((slug) => localizedArticles.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Article => Boolean(candidate));
}
