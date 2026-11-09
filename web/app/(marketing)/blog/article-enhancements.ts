import type { ArticleSection, ArticleSource } from "./articles";

type LocalizedEnhancement = {
  tr: ArticleSection[];
  en: ArticleSection[];
  sources: ArticleSource[];
};

const accessedDate = "2026-09-02";

const sources = {
  ghgStandards: {
    title: "Standards and Guidance",
    publisher: "GHG Protocol",
    url: "https://ghgprotocol.org/standards-guidance",
    accessedDate,
  },
  ghgTools: {
    title: "Calculation Tools and Guidance",
    publisher: "GHG Protocol",
    url: "https://ghgprotocol.org/calculation-tools-and-guidance",
    accessedDate,
  },
  ipccSynthesis: {
    title: "AR6 Synthesis Report: Climate Change 2023",
    publisher: "IPCC",
    url: "https://www.ipcc.ch/report/ar6/syr/",
    accessedDate,
  },
  ipccEnergy: {
    title: "2006 IPCC Guidelines, Volume 2: Energy",
    publisher: "IPCC",
    url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
    accessedDate,
  },
  turkiyeGrid: {
    title: "2023 Türkiye Elektrik Üretimi ve Elektrik Tüketim Noktası Emisyon Faktörleri",
    publisher: "T.C. Enerji ve Tabii Kaynaklar Bakanlığı",
    url: "https://enerji.gov.tr/Media/Dizin/EVCED/tr/%C3%87evreVe%C4%B0klim/%C4%B0klimDe%C4%9Fi%C5%9Fikli%C4%9Fi/EmisyonFaktorleri/2023_Turkiye_Elektrik_UretimiveElektrik_Tuketim_Noktasi_Emisyon_Faktorleri.pdf",
    accessedDate,
  },
  turkiyeNdc: {
    title: "Türkiye İkinci Ulusal Katkı Beyanı (NDC 3.0)",
    publisher: "T.C. İklim Değişikliği Başkanlığı",
    url: "https://iklim.gov.tr/db/turkce/icerikler/files/%C4%B0kinci%20Ulusal%20Katku%20Beyan%C4%B1%20%28NDC%203.0%29_TR.pdf",
    accessedDate,
  },
  icao: {
    title: "ICAO Carbon Emissions Calculator and Methodology",
    publisher: "International Civil Aviation Organization",
    url: "https://www.icao.int/environmental-protection/environmental-tools/icec",
    accessedDate,
  },
  epaVehicle: {
    title: "Greenhouse Gas Emissions from a Typical Passenger Vehicle",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle",
    accessedDate,
  },
  ukFactors: {
    title: "Government conversion factors for company reporting",
    publisher: "UK Government",
    url: "https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting",
    accessedDate,
  },
  ieaEfficiency: {
    title: "Energy Efficiency",
    publisher: "International Energy Agency",
    url: "https://www.iea.org/topics/energy-efficiency",
    accessedDate,
  },
  doeEnergySaver: {
    title: "Energy Saver",
    publisher: "U.S. Department of Energy",
    url: "https://www.energy.gov/energysaver/energy-saver",
    accessedDate,
  },
  faoFood: {
    title: "Greenhouse gas emissions from agrifood systems",
    publisher: "Food and Agriculture Organization of the United Nations",
    url: "https://www.fao.org/newsroom/detail/Greenhouse-gas-emissions-from-agri-food-systems-global-regional-and-country-trends/en",
    accessedDate,
  },
  icvcm: {
    title: "Core Carbon Principles",
    publisher: "Integrity Council for the Voluntary Carbon Market",
    url: "https://icvcm.org/core-carbon-principles/",
    accessedDate,
  },
  unfcccParis: {
    title: "The Paris Agreement",
    publisher: "UN Climate Change",
    url: "https://unfccc.int/process-and-meetings/the-paris-agreement",
    accessedDate,
  },
  epaHousehold: {
    title: "Household Carbon Footprint Calculator",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www3.epa.gov/carbon-footprint-calculator/",
    accessedDate,
  },
} satisfies Record<string, ArticleSource>;

export const articleEnhancements: Record<string, LocalizedEnhancement> = {
  "karbon-ayak-izi-nedir": {
    tr: [
      {
        id: "sinir-belirleme",
        title: "Sonuçtan önce sınırı belirlemek",
        content: `<p>Bir karbon ayak izi sonucu, yalnızca hangi faaliyetlerin hesaba katıldığı açık olduğunda anlam taşır. Bir hane hesabında elektrik, ısınma, özel araç, toplu taşıma, uçuş, gıda ve satın alınan ürünler aynı dönemi kapsamalıdır. Bir ürün hesabında ise ham madde, üretim, taşıma, kullanım ve kullanım sonu aşamalarından hangilerinin dahil edildiği belirtilmelidir.</p><p>İki sonucu karşılaştırırken önce kapsamı, dönemi ve kullanılan emisyon faktörünün yılını kontrol edin. Biri yalnızca doğrudan yakıt tüketimini, diğeri yaşam döngüsünü içeriyorsa sayılar aynı birimde görünse bile doğrudan karşılaştırılamaz.</p>`,
      },
      {
        id: "sonucu-okumak",
        title: "Bir tahmini doğru yorumlamak",
        content: `<p>Karbon hesabı kesin bir laboratuvar ölçümü değil, faaliyet verisi ile emisyon faktörünü birleştiren bir tahmindir. Elektrik faturası gibi gerçek tüketim verileri, cihaz etiketi ve varsayılan kullanım süresinden daha güçlü bir temel sağlar. Buna karşılık bir ulusal ortalama, kişisel davranışı açıklamak için yalnızca başlangıç noktasıdır.</p><ul><li>Sonucun CO₂ mi yoksa tüm sera gazlarını içeren CO₂e mi olduğunu kontrol edin.</li><li>Faktörün ülke, yıl ve bağlantı türüyle uyumlu olduğundan emin olun.</li><li>Belirsiz girdileri ayrı işaretleyin ve sonucu gereğinden kesin göstermeyin.</li><li>Aynı yöntemi sonraki dönemde tekrarlayarak değişimi izleyin.</li></ul>`,
      },
      {
        id: "karar-araci",
        title: "Ayak izini bir karar aracına dönüştürmek",
        content: `<p>En yararlı çıktı tek bir toplam sayı değil, toplamı oluşturan kalemlerin sıralamasıdır. Önce yüksek tüketimli ve kontrol edilebilir alanları belirleyin. Örneğin uzun süre çalışan bir elektrikli ısıtıcı, nadiren kullanılan küçük bir cihazdan daha anlamlı bir iyileştirme fırsatı sunabilir. Ardından uygulanabilir bir değişiklik seçin, başlangıç değerini kaydedin ve benzer koşullarda yeniden ölçün.</p><p>CarbonCAM cihaz bazlı elektrik tahminlerine odaklanır. Bu dar kapsam, tam bir kişisel ya da kurumsal envanter yerine belirli bir ev aletinin enerji etkisini görünür kılmak için tasarlanmıştır.</p>`,
      },
    ],
    en: [
      {
        id: "define-boundary",
        title: "Define the boundary before reading the result",
        content: `<p>A footprint result is meaningful only when the included activities are clear. A household estimate should place electricity, heating, private travel, public transport, flights, food, and purchases inside the same reporting period. A product study should state whether raw materials, manufacturing, transport, use, and end of life are included.</p><p>Before comparing two figures, check their boundary, time period, and factor year. A result covering direct fuel use cannot be compared fairly with a lifecycle result merely because both are expressed in kilograms of CO₂e.</p>`,
      },
      {
        id: "read-estimate",
        title: "How to interpret an estimate",
        content: `<p>A carbon calculation is not a laboratory measurement. It combines activity data with an emission factor. Actual consumption from a bill or meter usually provides a stronger basis than a nameplate rating and assumed use time, while a national average is only a starting point for personal decisions.</p><ul><li>Check whether the result reports CO₂ alone or all greenhouse gases as CO₂e.</li><li>Match the factor to the country, year, and type of activity.</li><li>Mark uncertain inputs and avoid presenting excessive precision.</li><li>Repeat the same method in the next period to track a genuine change.</li></ul>`,
      },
      {
        id: "decision-tool",
        title: "Turn a footprint into a decision tool",
        content: `<p>The most useful output is not one total but a ranked view of what creates it. Start with large sources that you can influence. A space heater operating for many hours may offer a more useful saving opportunity than a small device used occasionally. Choose one practical change, record a baseline, and measure again under comparable conditions.</p><p>CarbonCAM deliberately focuses on appliance electricity estimates. It does not claim to replace a complete personal, product, or corporate inventory; its purpose is to make one controllable part of energy use easier to understand.</p>`,
      },
    ],
    sources: [sources.ghgStandards, sources.ipccSynthesis],
  },

  "karbon-ayak-izi-nasil-hesaplanir": {
    tr: [
      {
        id: "veri-kalitesi",
        title: "Faaliyet verisinin kalitesini artırma",
        content: `<p>Hesabın kalitesi çoğu zaman formülden değil girdiden etkilenir. Öncelik sırası; sayaç veya fatura verisi, satın alma ve yakıt kaydı, cihazın ölçülmüş tüketimi, üretici etiketi ve son olarak genel varsayım şeklinde kurulabilir. Her kayıt için tarih aralığını, birimi ve kaynağı not etmek daha sonra yapılacak karşılaştırmaları güvenilir kılar.</p><p>Birden fazla kişinin kullandığı konut veya araçta paylaştırma yöntemini baştan seçin. Hanenin toplamını kişi sayısına bölmek kolaydır; ancak çalışma saatleri veya kullanım sorumluluğu farklıysa sonuç yalnızca yaklaşık bir dağılım olur.</p>`,
      },
      {
        id: "cihaz-ornegi",
        title: "Cihaz bazlı örnek hesap",
        content: `<p>1.200 W gücündeki bir cihazın günde 45 dakika çalıştığını varsayalım. Önce gücü kilovata çevirin: 1.200 ÷ 1.000 = 1,2 kW. Süre 0,75 saat olduğundan günlük enerji 1,2 × 0,75 = 0,9 kWh olur. Yıllık kullanım aynı kalırsa 0,9 × 365 = 328,5 kWh elde edilir.</p><p>Emisyon tahmini için bu tüketim, seçilen yıl ve bağlantı türüne uygun kg CO₂e/kWh faktörüyle çarpılır. Sonuç cihaz etiketi ve kullanım süresine dayalıdır; gerçek sayaç tüketimi cihazın çalışma döngüsü, bekleme modu ve verim kayıpları nedeniyle farklı olabilir.</p>`,
      },
      {
        id: "kalite-kontrol",
        title: "Yayımlamadan önce kalite kontrolü",
        content: `<ul><li>Tüm enerji ve yakıt birimlerini ortak birime dönüştürün.</li><li>Aynı faaliyeti iki farklı kategoride saymadığınızı kontrol edin.</li><li>Emisyon faktörünün kaynak bağlantısını ve yayın yılını saklayın.</li><li>Yuvarlamayı son adımda yapın; ara hesapları tam değerle sürdürün.</li><li>Sonuçla birlikte kapsamı, varsayımları ve hariç tutulan kalemleri açıklayın.</li></ul><p>Bu kayıtlar yalnızca hesap hatalarını azaltmaz; bir sonraki yıl aynı yöntemin tekrarlanmasını ve değişimin gerçekten davranıştan mı yoksa yöntem farkından mı kaynaklandığının anlaşılmasını sağlar.</p>`,
      },
    ],
    en: [
      {
        id: "data-quality",
        title: "Improve the quality of activity data",
        content: `<p>Input quality often matters more than formula complexity. A useful order of preference is meter or bill data, purchase and fuel records, measured appliance consumption, manufacturer ratings, and finally general assumptions. Record the date range, unit, and source for every input so later comparisons remain traceable.</p><p>For a shared home or vehicle, choose an allocation method before calculating. Dividing a household total by the number of residents is simple, but it remains an approximation when working hours and responsibility for consumption differ.</p>`,
      },
      {
        id: "appliance-example",
        title: "Worked appliance example",
        content: `<p>Assume a 1,200 W appliance operates for 45 minutes each day. Convert power to kilowatts: 1,200 ÷ 1,000 = 1.2 kW. Forty-five minutes is 0.75 hours, so daily energy is 1.2 × 0.75 = 0.9 kWh. If use remains constant, annual energy is 0.9 × 365 = 328.5 kWh.</p><p>For an emissions estimate, multiply that energy by a kg CO₂e/kWh factor that matches the year and connection type. This remains a nameplate estimate; cycling, standby demand, and efficiency losses can make metered consumption different.</p>`,
      },
      {
        id: "quality-review",
        title: "Quality checks before using a result",
        content: `<ul><li>Convert energy and fuel quantities into consistent units.</li><li>Check that the same activity is not counted in two categories.</li><li>Keep the emission-factor source and publication year.</li><li>Round only the final result, not every intermediate step.</li><li>State the boundary, assumptions, and excluded items beside the result.</li></ul><p>These records reduce calculation errors and allow the method to be repeated. They also help distinguish a real change in activity from a change caused only by a different factor or boundary.</p>`,
      },
    ],
    sources: [sources.ghgTools, sources.turkiyeGrid],
  },

  "araba-karbon-emisyonu-hesaplama": {
    tr: [
      {
        id: "arac-verisi",
        title: "Araç verisini doğru toplamak",
        content: `<p>En güvenilir başlangıç, aynı döneme ait yakıt fişleri ile kilometre sayacı kayıtlarını birlikte kullanmaktır. Depoyu doldurma yöntemiyle ölçüm yapıyorsanız ilk dolumdan sonraki kilometreyi kaydedin, birkaç depo boyunca satın alınan yakıtı toplayın ve son dolumda dönemi kapatın. Tek bir kısa yolculuk trafik, hava ve sürüş tarzından fazla etkilenebilir.</p><p>Araç bilgisayarındaki ortalama tüketim yararlıdır fakat pompa kaydıyla karşılaştırılmalıdır. Hibrit ve şarj edilebilir hibrit araçlarda yakıt ile şebeke elektriğini ayrı hesaplayıp aynı dönemin toplamında birleştirmek gerekir.</p>`,
      },
      {
        id: "yakit-yontemi",
        title: "Yakıt ve mesafe yöntemleri arasındaki fark",
        content: `<p>Yakıt yöntemi, tüketilen litreyi uygun litre başına faktörle çarpar ve gerçek kullanıma daha yakındır. Mesafe yöntemi ise kilometreyi araç sınıfına ait km başına ortalama faktörle çarpar; yakıt kaydı yoksa kullanışlıdır ancak aracın yaşı, doluluk oranı ve sürüş koşullarını geneller.</p><p>İki yöntemi aynı yolculuk için toplayamazsınız; bu çift sayım olur. Şirket aracı raporunda yakıtın yanmasından doğan doğrudan emisyon ile yakıtın üretim ve taşınma kaynaklı yaşam döngüsü etkisini de ayrı başlıklar altında tutun.</p>`,
      },
      {
        id: "arac-kararlari",
        title: "Sonucu ulaşım kararına çevirmek",
        content: `<p>Önce toplam kilometreyi azaltabilecek seçenekleri inceleyin: yolculukları birleştirmek, uzaktan görüşme, toplu taşıma veya araç paylaşımı. Ardından lastik basıncı, gereksiz yük, ani hızlanma ve yüksek hız gibi tüketimi etkileyen unsurları gözden geçirin. Elektrikli aracı değerlendirirken yalnızca egzoz emisyonunun sıfır olmasına değil, kullanılan elektriğin faktörüne ve mümkünse aracın yaşam döngüsü sınırına bakın.</p><p>Karşılaştırmayı aynı güzergâh, benzer hava ve benzer yolcu yüküyle tekrarlamak, tek seferlik iyi bir değerden daha anlamlıdır.</p>`,
      },
    ],
    en: [
      {
        id: "vehicle-data",
        title: "Collect vehicle data that reflects real use",
        content: `<p>The strongest starting point combines fuel receipts with odometer readings for the same period. If you use the full-tank method, record the odometer after the first fill, add purchases across several tanks, and close the period at the next full fill. One short trip can be distorted by traffic, weather, and driving style.</p><p>The vehicle computer is useful but should be checked against pump records. For plug-in hybrids, calculate fuel and grid electricity separately, then combine the results for the same reporting period.</p>`,
      },
      {
        id: "fuel-distance-methods",
        title: "Fuel-based and distance-based methods",
        content: `<p>A fuel-based method multiplies litres consumed by a matching per-litre factor and is usually closer to actual use. A distance method multiplies kilometres by an average factor for a vehicle class. It is useful when fuel data is missing, but generalizes vehicle age, occupancy, and road conditions.</p><p>Do not add both methods for the same journey because that would double count it. In organizational reporting, keep direct combustion emissions separate from lifecycle emissions associated with producing and transporting the fuel.</p>`,
      },
      {
        id: "transport-decisions",
        title: "Use the result to improve transport choices",
        content: `<p>Start with options that avoid kilometres: combine errands, use remote meetings, take public transport, or share a journey. Then review tyre pressure, unnecessary load, harsh acceleration, and sustained high speed. When comparing an electric car, look beyond zero tailpipe emissions to the electricity factor and, where relevant, the lifecycle boundary used for the comparison.</p><p>Repeat measurements on a similar route with comparable weather and passenger load. A consistent trend is more informative than a single unusually efficient trip.</p>`,
      },
    ],
    sources: [sources.epaVehicle, sources.ukFactors],
  },

  "ucak-yolculugu-karbon-emisyonu": {
    tr: [
      {
        id: "ucus-girdileri",
        title: "Uçuş tahminini değiştiren girdiler",
        content: `<p>Yalnızca iki şehir arasındaki düz çizgi mesafesi gerçek uçuş etkisini açıklamaz. Kalkış ve iniş havalimanı, aktarma sayısı, kullanılan uçak grubu, doluluk, yolcu ile kargo arasındaki paylaştırma ve kabin sınıfı sonucu etkiler. Business veya first koltukları daha fazla alan kullandığından bazı yöntemler yolcu başına daha yüksek pay ayırır.</p><p>Bu nedenle farklı hesaplayıcıların aynı rota için farklı sonuç vermesi tek başına hata değildir. Yöntemlerin yalnızca motor kaynaklı CO₂'yi mi, yoksa CO₂ dışı iklim etkileri için ayrıca bir yaklaşım mı kullandığını kontrol edin.</p>`,
      },
      {
        id: "icao-siniri",
        title: "ICAO yönteminin kapsamı",
        content: `<p>ICAO hesaplayıcısı, havalimanı çifti ve sektör verileri üzerinden yolcuya atfedilen uçuş kaynaklı CO₂'yi tahmin eder. Uçak tipi, rota, doluluk ve kargo payı gibi değişkenler ortalama verilerle ele alınır. ICAO, hesaplayıcının uçuş motorlarından çıkan CO₂'ye odaklandığını ve CO₂ dışı etkileri bir çarpanla sonuçta birleştirmediğini açıklar.</p><p>Bir raporda ICAO sonucu kullanılıyorsa bu sınır belirtilmelidir. Başka bir araçla karşılaştırmada da aynı gaz kapsamı, kabin sınıfı ve tek yön/gidiş-dönüş seçimi kullanılmalıdır.</p>`,
      },
      {
        id: "ucus-karar-listesi",
        title: "Seyahat öncesi karar listesi",
        content: `<ul><li>Görüşmenin çevrim içi yapılması mümkün mü?</li><li>Aynı rota tren veya otobüsle makul sürede tamamlanabilir mi?</li><li>Aktarmasız seçenek toplam mesafeyi azaltıyor mu?</li><li>Birden fazla işi tek seyahatte birleştirebilir misiniz?</li><li>Sonucu raporlarken araç, tarih ve yöntem sürümünü kaydettiniz mi?</li></ul><p>Dengeleme satın almak, önce gereksiz seyahati azaltmanın yerine geçmez. Kullanılan kredi ayrıca ek olma, kalıcılık, doğrulama ve çift sayım riskleri açısından incelenmelidir.</p>`,
      },
    ],
    en: [
      {
        id: "flight-inputs",
        title: "Inputs that change a flight estimate",
        content: `<p>Straight-line distance between two cities does not fully describe a flight. Departure and arrival airports, connections, aircraft group, load factor, passenger-to-cargo allocation, and cabin class all affect the result. Premium cabins occupy more space, so some methods allocate a larger share per passenger.</p><p>Different calculators can therefore produce different answers for the same route without either being a simple arithmetic error. Check whether a method reports engine CO₂ only or also applies a separate approach to non-CO₂ climate effects.</p>`,
      },
      {
        id: "icao-boundary",
        title: "What the ICAO method covers",
        content: `<p>The ICAO calculator estimates passenger-attributed flight CO₂ using an airport pair and industry data. Aircraft types, route information, load factors, and cargo allocation are represented through harmonized averages. ICAO explains that the result focuses on CO₂ released by aircraft engines and does not combine non-CO₂ effects through a radiative-forcing multiplier.</p><p>When an ICAO result is used in a report, state that boundary. Comparisons with another tool should use the same gases, cabin class, and one-way or return selection.</p>`,
      },
      {
        id: "pre-travel-checklist",
        title: "A decision checklist before booking",
        content: `<ul><li>Can the meeting be completed online?</li><li>Is rail or coach practical for the same route?</li><li>Does a direct option avoid extra distance?</li><li>Can several purposes be combined into one trip?</li><li>Have you recorded the calculator and methodology version?</li></ul><p>Buying an offset does not replace avoiding unnecessary travel. Any credit should also be assessed for additionality, permanence, verification, and double-counting risk.</p>`,
      },
    ],
    sources: [sources.icao, sources.ipccSynthesis],
  },

  "elektrik-tuketimi-karbon-emisyonu": {
    tr: [
      {
        id: "resmi-faktor",
        title: "Türkiye için doğru elektrik faktörünü seçmek",
        content: `<p>Enerji ve Tabii Kaynaklar Bakanlığının 2023 bilgi formu, üretim ile tüketim noktası faktörlerini ayrı verir. Dağıtım hattına bağlı tüketim noktası için değer 0,469 tCO₂e/MWh'tir; birim dönüşümüyle bu 0,469 kg CO₂e/kWh olur. İletim hattına bağlı tüketim noktası ve santral üretim faktörü farklıdır.</p><p>Bir ev cihazı tahmininde CarbonCAM dağıtım bağlantısı değerini kullanır. Bu tercih sonuç ekranında yıl ve kaynakla açıklanmalıdır. Faktör yıllar içinde elektrik üretim karışımı ve şebeke kayıpları değiştikçe güncellenebileceği için eski bir hesap yeni faktörle sessizce karşılaştırılmamalıdır.</p>`,
      },
      {
        id: "elektrik-ornegi",
        title: "Fatura ve cihaz tahmini arasındaki fark",
        content: `<p>Aylık faturada 240 kWh tüketim görülüyorsa 2023 dağıtım faktörüyle tahmini etki 240 × 0,469 = 112,56 kg CO₂e olur. Bu değer hanenin şebeke elektriği etkisini temsil eder; doğalgaz, ulaşım veya satın alınan ürünleri içermez.</p><p>Cihaz bazlı yöntem ise Watt × saat ile tek bir cihazın tüketimini tahmin eder. Cihazların tahminlerini toplamak, sayaçtaki toplamla tam eşleşmeyebilir; buzdolabı gibi çevrimli çalışan cihazlar, bekleme tüketimleri, adaptör kayıpları ve ortak bina yükleri fark yaratabilir.</p>`,
      },
      {
        id: "elektrik-izleme",
        title: "Tasarrufu karşılaştırılabilir biçimde izlemek",
        content: `<p>Önce faturadan veya sayaçtan tarihli bir başlangıç değeri alın. Değişiklikten sonraki ölçümü benzer gün sayısı, mevsim ve kullanım koşullarıyla karşılaştırın. Klima veya elektrikli ısıtma varsa dış sıcaklık farkı sonucu güçlü biçimde etkileyebilir. Evde yaşayan kişi sayısındaki değişimi de not edin.</p><p>Para tasarrufu için kWh değişimini güncel tarife ile, emisyon değişimi için aynı dönem ve kapsamda seçilen emisyon faktörüyle değerlendirin. Tarife ile emisyon faktörü farklı amaçlara hizmet eder ve birbirinin yerine kullanılmaz.</p>`,
      },
    ],
    en: [
      {
        id: "official-grid-factor",
        title: "Choose the correct electricity factor for Türkiye",
        content: `<p>The Ministry of Energy and Natural Resources publishes generation and consumption-point factors separately. Its 2023 form gives 0.469 tCO₂e/MWh for a consumption point connected to the distribution grid, which is 0.469 kg CO₂e/kWh after unit conversion. Transmission-connected consumption and power-station generation use different figures.</p><p>CarbonCAM uses the distribution-connected value for household appliance estimates and identifies the source year. Because the factor can change with the generation mix and network losses, an older result should not be silently compared with a newly calculated one using a different factor.</p>`,
      },
      {
        id: "bill-device-example",
        title: "Bill data and appliance estimates answer different questions",
        content: `<p>If a monthly bill shows 240 kWh, the 2023 distribution factor gives an estimate of 240 × 0.469 = 112.56 kg CO₂e. This represents grid electricity for the household boundary; it does not include natural gas, travel, or purchased goods.</p><p>An appliance method estimates one device through watts multiplied by operating hours. Adding every appliance estimate may not equal the meter because cycling equipment, standby loads, adapter losses, and shared building services are difficult to capture from nameplates alone.</p>`,
      },
      {
        id: "comparable-monitoring",
        title: "Monitor savings under comparable conditions",
        content: `<p>Record a dated baseline from a bill or meter. Compare the next period using a similar number of days, season, and occupancy. Where air conditioning or electric heating is significant, outdoor temperature can dominate the result. Note changes in the number of residents as well.</p><p>For financial savings, apply the relevant tariff to the kWh change. For emissions, apply a documented factor consistently across the comparison. A tariff and an emission factor serve different purposes and should never be substituted for one another.</p>`,
      },
    ],
    sources: [sources.turkiyeGrid, sources.ghgTools],
  },

  "dogalgaz-karbon-emisyonu": {
    tr: [
      {
        id: "dogalgaz-verisi",
        title: "Faturadaki veriyi hesaplamaya hazırlamak",
        content: `<p>Doğalgaz faturası hacmi metreküp olarak gösterebilir; enerji ve emisyon hesabında ise kullanılan resmi yöntem alt ısıl değer, üst ısıl değer veya kWh üzerinden çalışabilir. Faturada zaten enerji karşılığı veriliyorsa aynı tüketimi yeniden hacim dönüşümüne sokmayın. Dağıtım şirketinin düzeltme katsayısı ve fatura dönemi kaydedilmelidir.</p><p>Yakıtın cihazda yanmasından doğan CO₂ ile üretim, işleme ve boru hattı kaynaklı yaşam döngüsü etkileri farklı sınırlardır. Bir faktör yalnızca yanmayı, diğeri yaşam döngüsünü kapsıyorsa sonuçları aynı toplamda açıklamasız kullanmak yanıltıcı olur.</p>`,
      },
      {
        id: "hava-duzeltmesi",
        title: "Isınma tüketimini hava koşullarından ayırmak",
        content: `<p>Ocak ayını nisan ayıyla doğrudan karşılaştırmak, yalıtım iyileştirmesinin etkisini göstermez. Isıtma derece-gün verisi, dış sıcaklığın tüketim üzerindeki etkisini normalleştirmek için kullanılabilir. Daha basit bir ev takibinde en azından ortalama sıcaklık, evde bulunma süresi, termostat ayarı ve fatura gün sayısı not edilmelidir.</p><p>Sıcak su ile pişirme tüketimi de toplam doğalgazın içindeyse yalnızca ısınmaya atfedilen tasarrufu kesin bir değer gibi sunmayın. Alt sayaç veya cihaz bazlı ölçüm yoksa bu pay belirsizlik olarak açıklanmalıdır.</p>`,
      },
      {
        id: "isitma-oncelikleri",
        title: "Isıtma verimliliğinde öncelik sırası",
        content: `<p>Önce güvenlik ve bakım gelir: yanma cihazları yetkili servis tarafından kontrol edilmeli, havalandırma açıklıkları kapatılmamalıdır. Ardından bina kabuğundaki hava kaçakları, çatı ve duvar yalıtımı, pencere performansı ve ısıtma kontrolü değerlendirilir. Termostat programı ile yalnız kullanılan alanların ısıtılması düşük maliyetli adımlar olabilir.</p><p>Her değişiklik için tarih ve maliyet kaydı tutun. Tasarrufu yalnızca fatura tutarıyla değil, hava ve fiyat değişimlerinden ayrıştırılmış tüketim miktarıyla izleyin.</p>`,
      },
    ],
    en: [
      {
        id: "gas-bill-data",
        title: "Prepare gas-bill data correctly",
        content: `<p>A gas bill may show volume in cubic metres, while an energy or emissions method may use a heating value or kWh. If the bill already provides an energy equivalent, do not convert the same consumption from volume a second time. Keep the distributor's correction factor and the billing dates with the record.</p><p>Combustion CO₂ and lifecycle effects from production, processing, and pipelines represent different boundaries. If one factor covers combustion only and another covers the lifecycle, they should not be mixed without a clear explanation.</p>`,
      },
      {
        id: "weather-normalisation",
        title: "Separate heating performance from weather",
        content: `<p>Comparing January directly with April does not reveal the effect of an insulation measure. Heating degree days can normalize the influence of outdoor temperature. A simpler household record should at least note average weather, occupancy, thermostat setting, and the number of billing days.</p><p>Where hot water and cooking are included in total gas, avoid presenting the whole change as a heating saving. Without sub-metering or appliance measurements, that allocation remains an uncertainty and should be labelled as such.</p>`,
      },
      {
        id: "heating-priorities",
        title: "Priorities for heating efficiency",
        content: `<p>Safety and maintenance come first: combustion appliances should be checked by qualified service personnel and ventilation openings must remain clear. Next, assess air leakage, roof and wall insulation, windows, and heating controls. Scheduling the thermostat and heating only occupied zones can be lower-cost steps.</p><p>Record the date and cost of each change. Track energy quantity, not only the bill amount, so price and weather effects do not hide the actual performance trend.</p>`,
      },
    ],
    sources: [sources.ipccEnergy, sources.ieaEfficiency],
  },

  "scope-1-scope-2-scope-3-nedir": {
    tr: [
      {
        id: "organizasyon-siniri",
        title: "Önce organizasyon sınırını kurmak",
        content: `<p>Scope sınıflaması yapılmadan önce hangi şirketlerin, tesislerin ve operasyonların raporlayan kuruluşa dahil olduğu belirlenir. GHG Protocol kontrol yaklaşımı ile özkaynak payı yaklaşımı gibi seçenekler sunar. Kiralık araç veya tesisin sınıfı, sözleşme ve seçilen sınır yaklaşımına göre değişebilir.</p><p>Sınır bir kez seçildiğinde dönemler arasında tutarlı uygulanmalıdır. Satın alma, birleşme veya varlık satışı gibi yapısal değişiklikler baz yılın yeniden hesaplanmasını gerektirebilir. Bu kararların yazılı olması, aynı kaynağın farklı ekiplerce farklı Scope altında raporlanmasını önler.</p>`,
      },
      {
        id: "scope-cift-sayim",
        title: "Çift sayımı doğru anlamak",
        content: `<p>Satın alınan elektrik, alıcı için Scope 2 iken elektriği üreten şirket için Scope 1 olabilir. Bu, iki ayrı kuruluşun envanterinde kasıtlı olarak farklı bakış açılarıyla görünür; tek bir şirketin toplamında aynı emisyonun iki kez eklenmesi anlamına gelmez. Değer zincirinde benzer örtüşmeler oluşabilir.</p><p>Önemli olan, bir kuruluşun kendi envanterinde kategorileri açık tutması ve toplamları hangi amaçla kullandığını belirtmesidir. Scope 3 kategorileri birbirinden ayrılmalı; tedarikçi verisi, harcama verisi ve fiziksel aktivite verisi karıştırılmadan yöntem notu eklenmelidir.</p>`,
      },
      {
        id: "scope-is-akisi",
        title: "Uygulanabilir bir raporlama iş akışı",
        content: `<ol><li>Kurumsal ve operasyonel sınırı belgeleyin.</li><li>Kaynak envanteri çıkarın ve her kaynağa veri sorumlusu atayın.</li><li>Fatura, sayaç, yakıt ve satın alma kayıtlarını dönem bazında toplayın.</li><li>Faktörlerin coğrafya, yıl ve kapsam uyumunu kontrol edin.</li><li>Hesapları gözden geçirip belirsizlikleri açıklayın.</li><li>Baz yıl ve hedeflerle birlikte yöntem değişikliklerini yayımlayın.</li></ol><p>CarbonCAM'ın ev cihazı tahmini bir kurumsal GHG envanteri değildir; Scope raporlaması için tek başına kullanılmamalıdır.</p>`,
      },
    ],
    en: [
      {
        id: "organizational-boundary",
        title: "Establish the organizational boundary first",
        content: `<p>Before assigning scopes, define which companies, facilities, and operations belong to the reporting organization. The GHG Protocol describes control and equity-share approaches. A leased vehicle or facility may be classified differently depending on the contract and chosen boundary approach.</p><p>Once selected, the boundary should be applied consistently. Acquisitions, mergers, and divestments can require a base-year recalculation. Written decisions prevent different teams from assigning the same source to different scopes.</p>`,
      },
      {
        id: "scope-double-counting",
        title: "Understand double counting in context",
        content: `<p>Purchased electricity is Scope 2 for the buyer and may be Scope 1 for the generating company. It appears from two organizational viewpoints; that does not mean it should be added twice inside one company's total. Similar overlaps can occur along a value chain.</p><p>The reporting organization should keep categories clear and explain the purpose of any combined figure. Scope 3 categories should remain separated, with method notes distinguishing supplier data, spend data, and physical activity data.</p>`,
      },
      {
        id: "scope-workflow",
        title: "A practical reporting workflow",
        content: `<ol><li>Document organizational and operational boundaries.</li><li>List sources and assign a data owner to each one.</li><li>Collect bills, meters, fuel, and purchasing records by period.</li><li>Check every factor for geography, year, and boundary.</li><li>Review calculations and disclose material uncertainties.</li><li>Publish method changes alongside the base year and targets.</li></ol><p>CarbonCAM's household appliance estimate is not a corporate GHG inventory and should not be used alone for scope reporting.</p>`,
      },
    ],
    sources: [sources.ghgStandards, sources.ghgTools],
  },

  "turkiyede-karbon-emisyonu": {
    tr: [
      {
        id: "envanter-okuma",
        title: "Ulusal envanteri doğru okumak",
        content: `<p>Ulusal sera gazı envanteri, ülke sınırları içindeki kaynak ve yutakları uluslararası raporlama kurallarına göre toplar. Toplamın AKAKDO olarak bilinen arazi kullanımı, arazi kullanımı değişikliği ve ormancılık sektörünü içerip içermediği ayrıca belirtilir. Brüt ve net toplam bu nedenle farklı olabilir.</p><p>Bir vatandaşın tüketim ayak izi veya ithal ürünlerin yaşam döngüsü etkisi, ulusal envanter toplamıyla aynı kavram değildir. Yıllar arası eğilim incelenirken metodoloji revizyonları ve yeniden hesaplamalar da kontrol edilmelidir; eski rapordaki sayı yeni raporda güncellenebilir.</p>`,
      },
      {
        id: "hedef-gerceklesme",
        title: "Hedef ile gerçekleşmeyi ayırmak",
        content: `<p>Ulusal katkı beyanı, geleceğe yönelik hedefi ve kullanılan referans senaryoyu açıklar; sera gazı envanteri ise gerçekleşmiş geçmiş emisyonları raporlar. Bir hedefin “referans senaryoya göre azaltım” olarak ifade edilmesi, baz yıla göre mutlak düşüşle aynı değildir. Hedef yıl, kapsanan gazlar, sektörler ve arazi kullanımı sınırı birlikte okunmalıdır.</p><p>Türkiye'nin güncel beyanları ve envanterleri değişebileceği için sabit bir blog cümlesi yerine İklim Değişikliği Başkanlığı ve UNFCCC belgelerinin sürümü esas alınmalıdır.</p>`,
      },
      {
        id: "hane-baglantisi",
        title: "Ulusal veriden hane kararına geçiş",
        content: `<p>Ulusal tablo, hangi sektörlerin öncelikli olduğunu gösterir; tek bir hanenin eylem planı ise kendi tüketim verisine dayanmalıdır. Elektrik için resmi tüketim noktası faktörü, faturadaki kWh ile eşleştirilebilir. Isınma, araç ve uçuşlar ayrı faaliyet verileriyle hesaplanır.</p><p>Bir hanenin azaltımı ulusal toplam içinde çok küçük görünse de ölçülebilir enerji tasarrufu maliyeti ve kaynak kullanımını doğrudan etkiler. Sonuçların sertifika veya doğrulanmış ulusal katkı olarak sunulmaması, bireysel tahmin ile resmi envanter arasındaki sınırı korur.</p>`,
      },
    ],
    en: [
      {
        id: "read-national-inventory",
        title: "Read a national inventory correctly",
        content: `<p>A national greenhouse-gas inventory compiles sources and sinks within national boundaries under international reporting rules. It also states whether land use, land-use change, and forestry is included. Gross and net totals can therefore differ.</p><p>A citizen's consumption footprint or lifecycle emissions from imported products is not the same concept as a territorial national inventory. When studying trends, check methodology revisions and recalculations because a historical value may change in a newer submission.</p>`,
      },
      {
        id: "target-outcome",
        title: "Separate a target from an observed outcome",
        content: `<p>A nationally determined contribution describes a future target and its reference scenario; the inventory reports emissions that already occurred. A reduction “against a reference scenario” is not the same as an absolute fall from a base year. Read the target year, gases, sectors, and land-use boundary together.</p><p>Türkiye's submissions and inventory data can be updated. Current documents from the national authority and the UNFCCC should take precedence over a static sentence in an older article.</p>`,
      },
      {
        id: "national-to-household",
        title: "Move from national data to household decisions",
        content: `<p>National data highlights priority sectors, while a household plan should use the household's own activity records. The official electricity consumption-point factor can be matched to billed kWh. Heating, driving, and flights require separate activity data and suitable factors.</p><p>A household saving is small beside a national total, but measured efficiency can directly reduce cost and resource use. Do not present a personal estimate as certification or as a verified contribution to the national inventory.</p>`,
      },
    ],
    sources: [sources.turkiyeNdc, sources.turkiyeGrid],
  },

  "karbon-ayak-izini-azaltma-yollari": {
    tr: [
      {
        id: "azaltim-onceligi",
        title: "Önce ölç, sonra önceliklendir",
        content: `<p>Uzun bir öneri listesini aynı anda uygulamak yerine, önce son 12 aylık elektrik ve yakıt faturalarını, araç kilometrelerini ve uçuşları toplayın. En büyük iki veya üç kaynağı belirleyin. Etki büyüklüğü, uygulanabilirlik, maliyet ve geri dönüş süresini birlikte değerlendirerek bir öncelik sırası oluşturun.</p><p>Düşük tüketimli bir cihazı birkaç dakika daha az kullanmak görünür bir davranış olsa da yüksek güçlü ısıtma veya soğutmayı iyileştirmek daha büyük sonuç verebilir. Buna karşılık sağlık, güvenlik ve iç hava kalitesini bozacak tasarruflardan kaçınılmalıdır.</p>`,
      },
      {
        id: "geri-tepme",
        title: "Geri tepme etkisini hesaba katmak",
        content: `<p>Daha verimli bir cihaz birim hizmet başına daha az enerji kullanır; ancak kullanım süresi artarsa beklenen tasarrufun bir bölümü kaybolabilir. Yeni klimayı daha düşük sıcaklıkta ve daha uzun çalıştırmak ya da yakıt tasarruflu araçla daha fazla kilometre yapmak buna örnektir.</p><p>Bu nedenle yalnızca cihaz etiketini değil, değişiklikten önce ve sonra toplam tüketimi izleyin. Tasarruf hedefini kWh, litre veya kilometre gibi fiziksel birimle tanımlayın; fiyat değişimleri fatura tutarını etkileyebilir ama gerçek enerji değişimini göstermez.</p>`,
      },
      {
        id: "otuz-gun-plani",
        title: "30 günlük uygulanabilir plan",
        content: `<ol><li>İlk hafta faturaları ve sayaç başlangıç değerini kaydedin.</li><li>İkinci hafta yüksek güçlü cihazların sürelerini ve termostat ayarlarını gözlemleyin.</li><li>Üçüncü hafta tek bir değişiklik uygulayın; örneğin programlama, hava kaçağı giderme veya yolculuk birleştirme.</li><li>Dördüncü hafta aynı kapsamda yeniden ölçün ve sonucu notlarla birlikte değerlendirin.</li></ol><p>Bir ay mevsimsel sonuca varmak için kısa olabilir. Başarılı görünen değişikliği birkaç fatura dönemi izlemek, kalıcı etki ile geçici dalgalanmayı ayırır.</p>`,
      },
    ],
    en: [
      {
        id: "reduction-priority",
        title: "Measure first, then prioritize",
        content: `<p>Instead of attempting a long checklist at once, collect twelve months of electricity and fuel bills, vehicle distance, and flights. Identify the two or three largest sources. Rank actions by potential impact, feasibility, cost, and payback.</p><p>Reducing a low-power device by a few minutes may be visible, but improving high-power heating or cooling can matter more. Savings should never compromise safety, health, or indoor air quality.</p>`,
      },
      {
        id: "rebound-effect",
        title: "Account for the rebound effect",
        content: `<p>An efficient device uses less energy per unit of service, but part of the saving can disappear if operating time increases. Running a new air conditioner longer at a lower set point or driving more kilometres in an efficient car are common examples.</p><p>Track total consumption before and after the change, not only the product label. Define a target in physical units such as kWh, litres, or kilometres. Price changes affect the bill but do not prove an energy reduction.</p>`,
      },
      {
        id: "thirty-day-plan",
        title: "A practical 30-day plan",
        content: `<ol><li>In week one, collect bills and record the opening meter value.</li><li>In week two, observe high-power device hours and thermostat settings.</li><li>In week three, make one change such as scheduling, sealing air leaks, or combining trips.</li><li>In week four, measure again with the same boundary and review the notes.</li></ol><p>One month may be too short for a seasonal conclusion. Continue a promising action across several billing periods to separate a durable effect from normal variation.</p>`,
      },
    ],
    sources: [sources.ieaEfficiency, sources.ipccSynthesis],
  },

  "karbon-notr-nedir": {
    tr: [
      {
        id: "notr-net-sifir",
        title: "Karbon nötr ve net sıfır aynı ifade değildir",
        content: `<p>“Karbon nötr” iddiası belirli bir ürün, etkinlik, kuruluş veya dönem için ölçülen emisyonların azaltım ve dengeleme yoluyla dengelendiğini anlatabilir. “Net sıfır” ise çoğunlukla uzun vadeli, geniş kapsamlı ve bilimle uyumlu derin azaltımı; yalnızca azaltılması zor kalan emisyonlar için giderim kullanımını ifade eder.</p><p>Bir iddiayı değerlendirirken hangi gazların, operasyonların ve değer zinciri kategorilerinin dahil edildiğini sorun. Yalnızca ofis elektriğini kapsayan bir beyan, şirketin tüm değer zincirinin net sıfır olduğu anlamına gelmez.</p>`,
      },
      {
        id: "iddia-kontrolu",
        title: "Bir iklim iddiası için kontrol listesi",
        content: `<ul><li>Baz yıl, hedef yıl ve organizasyon sınırı açıklanmış mı?</li><li>Scope 1, Scope 2 ve önemli Scope 3 kaynakları gösterilmiş mi?</li><li>Mutlak emisyon ile yoğunluk göstergesi ayrı mı?</li><li>Gerçek azaltım, yenilenebilir enerji aracı, giderim ve kredi ayrı raporlanmış mı?</li><li>Kullanılan standart ve bağımsız doğrulama kapsamı belirtilmiş mi?</li></ul><p>Belirsiz “yeşil” ifadeler yerine sayısal ilerleme ve yöntem açıklaması, okuyucunun iddiayı değerlendirmesine izin verir.</p>`,
      },
      {
        id: "bireysel-kullanim",
        title: "Bireysel hedeflerde doğru kullanım",
        content: `<p>Bireyler için en sağlam sıra; enerji ve ulaşım verisini ölçmek, gereksiz talebi azaltmak, verimliliği artırmak ve daha düşük emisyonlu seçeneklere geçmektir. Kalan tahmini emisyon için kredi alınacaksa proje standardı, ek olma, kalıcılık ve iptal kaydı incelenmelidir.</p><p>CarbonCAM'ın cihaz sonucu, yalnızca elektrik tüketiminin dar bir bölümünü kapsar. Bu değeri tüm yaşam tarzının “karbon nötr” kanıtı olarak kullanmak doğru değildir. Hedefin kapsamını sonuçla aynı ölçekte tutmak güvenilirliği artırır.</p>`,
      },
    ],
    en: [
      {
        id: "neutral-net-zero",
        title: "Carbon neutral and net zero are not identical claims",
        content: `<p>A “carbon neutral” claim may describe a defined product, event, organization, or period whose measured emissions are balanced through reductions and credits. “Net zero” generally implies deep, long-term reductions across a broad boundary, with removals reserved for residual emissions that are difficult to eliminate.</p><p>Ask which gases, operations, and value-chain categories are included. A statement covering office electricity alone does not establish that an entire company and its value chain are net zero.</p>`,
      },
      {
        id: "claim-checklist",
        title: "Checklist for evaluating a climate claim",
        content: `<ul><li>Are the base year, target year, and organizational boundary stated?</li><li>Are Scope 1, Scope 2, and material Scope 3 sources visible?</li><li>Are absolute emissions separated from intensity metrics?</li><li>Are reductions, energy instruments, removals, and credits reported separately?</li><li>Is the standard and verification boundary identified?</li></ul><p>Numerical progress and a method note allow readers to evaluate a claim more reliably than a broad “green” label.</p>`,
      },
      {
        id: "personal-use",
        title: "Use the concept carefully for personal goals",
        content: `<p>A sound personal sequence is to measure energy and transport, avoid unnecessary demand, improve efficiency, and choose lower-emission options. If credits are considered for a residual estimate, review the project standard, additionality, permanence, and retirement record.</p><p>A CarbonCAM appliance result covers only a narrow part of electricity use. It cannot demonstrate that a whole lifestyle is carbon neutral. Keep any claim within the same boundary as the underlying calculation.</p>`,
      },
    ],
    sources: [sources.ghgStandards, sources.icvcm],
  },

  "evde-enerji-verimliligi": {
    tr: [
      {
        id: "ev-enerji-haritasi",
        title: "Evin enerji haritasını çıkarmak",
        content: `<p>Son 12 aylık elektrik ve ısınma faturalarını aylara göre sıralayın. Mevsimsel taban tüketimini görmek için ısıtma ve soğutmanın az olduğu ayları karşılaştırın. Ardından priz tipi enerji ölçerle buzdolabı, televizyon sistemi, bilgisayar ve diğer taşınabilir cihazları örnekleyin. Sabit bağlı cihazlar için yetkili elektrikçiden destek alın.</p><p>Watt değeri anlık gücü, kWh ise zaman içindeki enerjiyi gösterir. Yüksek Watt her zaman en büyük yıllık tüketim değildir; düşük güçlü ama 24 saat çalışan ekipman da önemli olabilir.</p>`,
      },
      {
        id: "verimlilik-sirasi",
        title: "Önlem sırasını doğru kurmak",
        content: `<p>Önce gereksiz kullanım ve ayar hatalarını düzeltin: boş odada aydınlatma, uygunsuz termostat programı ve uzun bekleme süreleri. Sonra hava sızıntıları, gölgeleme, sıcak su ayarı ve bakım gibi düşük maliyetli önlemleri değerlendirin. Yalıtım, pencere veya ısıtma sistemi gibi yatırımlar için bina koşullarına uygun profesyonel değerlendirme alın.</p><p>Çalışan bir cihazı yalnız enerji etiketi daha iyi diye erken değiştirmek, üretim ve maliyet etkileri hesaba katılmadan doğru olmayabilir. Arıza, kullanım yoğunluğu ve geri ödeme süresi birlikte değerlendirilmelidir.</p>`,
      },
      {
        id: "tasarruf-dogrulama",
        title: "Gerçek tasarrufu doğrulamak",
        content: `<p>Değişiklikten önce sayaç değeri, tarih, evdeki kişi sayısı ve önemli cihaz ayarlarını kaydedin. Değişiklikten sonra aynı gün sayısına sahip ve benzer hava koşullarındaki bir dönem seçin. Birden fazla önlemi aynı anda uygulamak hangi adımın işe yaradığını ayırmayı zorlaştırır.</p><p>CarbonCAM cihaz süresi için senaryo oluşturabilir; toplam ev performansı için fatura veya sayaç verisi daha uygundur. Tahmin ile ölçümü yan yana tutmak, varsayılan kullanım süresindeki hataları ortaya çıkarır.</p>`,
      },
    ],
    en: [
      {
        id: "home-energy-map",
        title: "Build a map of household energy use",
        content: `<p>Arrange twelve months of electricity and heating bills by month. Compare mild-season months to identify the non-heating and non-cooling baseline. Then sample plug-in loads such as refrigeration, entertainment systems, and computers with a suitable energy meter. Ask a qualified electrician about hard-wired equipment.</p><p>Watts describe power at one moment; kWh describes energy over time. A high-wattage appliance is not always the largest annual load, because lower-power equipment operating continuously can also be significant.</p>`,
      },
      {
        id: "efficiency-order",
        title: "Put efficiency measures in a sensible order",
        content: `<p>Correct avoidable use and control problems first: empty-room lighting, poor thermostat schedules, and unnecessary standby time. Then assess lower-cost measures such as air sealing, shading, hot-water settings, and maintenance. Obtain advice suited to the building before major insulation, window, or heating-system work.</p><p>Replacing a working product early solely for a better energy label may not be the best decision without considering manufacturing impacts, cost, breakdown risk, usage intensity, and payback.</p>`,
      },
      {
        id: "verify-home-saving",
        title: "Verify an actual saving",
        content: `<p>Before a change, record the meter, date, occupancy, and important settings. Afterwards, choose a period with a similar number of days and comparable weather. Implementing several measures simultaneously makes it difficult to identify which one produced the change.</p><p>CarbonCAM can model an appliance-use scenario; bills and meter data are better for whole-home performance. Keeping estimate and measurement together reveals errors in assumed operating hours.</p>`,
      },
    ],
    sources: [sources.doeEnergySaver, sources.ieaEfficiency],
  },

  "surdurulebilir-beslenme-karbon": {
    tr: [
      {
        id: "gida-siniri",
        title: "Gıda ayak izinin sınırları",
        content: `<p>Bir gıdanın iklim etkisi tarımsal üretim, yem, gübre, arazi kullanımı, işleme, soğuk zincir, ambalaj, taşıma, pişirme ve atık aşamalarından oluşabilir. Her çalışma aynı aşamaları içermez. Bu nedenle yalnız “kilometre” veya ambalaj türüne bakarak kesin bir sıralama yapmak yanıltıcıdır.</p><p>Üretim yöntemi ve israf oranı çoğu zaman önemlidir; ancak sonuç ülkeye ve ürüne göre değişir. Karşılaştırmada porsiyon, kilogram, protein veya kalori gibi fonksiyonel birimin aynı olmasına dikkat edilmelidir.</p>`,
      },
      {
        id: "israf-olcumu",
        title: "Evde gıda israfını ölçmek",
        content: `<p>Bir hafta boyunca yenilebilir gıda atığını kategori ve yaklaşık ağırlıkla kaydedin. Bozulma, fazla pişirme, tabakta bırakma ve tarih etiketi karışıklığını ayrı işaretleyin. Sonraki hafta alışveriş listesini mevcut stokla hazırlayın, porsiyonu ayarlayın ve uygun saklama yöntemini kullanın.</p><p>Satın alınan ama yenmeyen gıda; üretim, taşıma, soğutma ve para kaybını birlikte taşır. Bu nedenle israfı azaltmak, belirli bir ürünün uzaklığı hakkında genelleme yapmaktan daha doğrudan ölçülebilen bir başlangıç olabilir.</p>`,
      },
      {
        id: "beslenme-plani",
        title: "Beslenme planını dengeli kurmak",
        content: `<p>Beslenme değişikliği yalnız karbon sayısına göre yapılmamalıdır. Sağlık gereksinimleri, alerjiler, kültürel tercihler, bütçe ve erişim dikkate alınmalıdır; gerekiyorsa diyetisyenden destek alın. Pratik yaklaşım, sık tüketilen yüksek etkili ürünlerde ölçülü değişiklik yapmak, çeşitli bitkisel seçenekleri artırmak ve israfı azaltmaktır.</p><p>“Yerel”, “organik” veya “bitkisel” tek başına tüm yaşam döngüsünü açıklamaz. İddialar yöntem ve kapsamla birlikte okunmalı, kesin sağlık veya çevre sonucu vaat edilmemelidir.</p>`,
      },
    ],
    en: [
      {
        id: "food-boundary",
        title: "Understand the boundary of a food footprint",
        content: `<p>A food footprint may include agricultural production, feed, fertilizer, land use, processing, refrigeration, packaging, transport, cooking, and waste. Studies do not always include the same stages. Ranking foods only by distance or packaging can therefore be misleading.</p><p>Production method and waste rate can be important, but results vary by product and region. Comparisons should use the same functional unit, such as serving, kilogram, protein, or calories.</p>`,
      },
      {
        id: "measure-food-waste",
        title: "Measure avoidable food waste at home",
        content: `<p>For one week, record edible food discarded by category and approximate weight. Separate spoilage, over-preparation, plate waste, and date-label confusion. In the following week, plan shopping from existing stock, adjust portions, and use appropriate storage.</p><p>Food purchased but not eaten carries production, transport, refrigeration, and financial loss. Reducing waste can be a more directly measurable starting point than making a broad claim based only on food miles.</p>`,
      },
      {
        id: "balanced-food-plan",
        title: "Build a balanced food plan",
        content: `<p>Diet changes should not be made from a carbon number alone. Health needs, allergies, culture, budget, and access matter; seek qualified dietary advice where needed. A practical approach is to make measured changes to frequently consumed higher-impact foods, increase varied plant options, and reduce waste.</p><p>Labels such as “local”, “organic”, or “plant-based” do not by themselves describe the whole lifecycle. Read environmental claims with their method and boundary, and avoid promises of a guaranteed health or climate result.</p>`,
      },
    ],
    sources: [sources.faoFood, sources.ipccSynthesis],
  },

  "karbon-dengeleme-offset": {
    tr: [
      {
        id: "kredi-butunlugu",
        title: "Yüksek bütünlüklü kredi ne gerektirir?",
        content: `<p>Bir karbon kredisi, başka yerde gerçekleştiği ileri sürülen bir ton CO₂e azaltım veya giderimi temsil eder. Kalite için projenin kredi geliri olmadan gerçekleşmeyeceğini gösteren ek olma, etkinin sürmesini anlatan kalıcılık, emisyonun başka yere kaymasını inceleyen sızıntı ve aynı sonucun iki tarafça talep edilmesini önleyen çift sayım kontrolleri gerekir.</p><p>Proje belgesi, izleme raporu, bağımsız doğrulama, seri numarası ve iptal kaydı incelenmelidir. Bir standardın logosu tek başına her kredinin aynı kaliteye sahip olduğunu garanti etmez.</p>`,
      },
      {
        id: "azaltim-hiyerarsisi",
        title: "Dengelemeyi azaltım hiyerarşisine yerleştirmek",
        content: `<p>Önce gereksiz emisyonu önleyin, sonra enerji ve malzeme verimliliğiyle azaltın, düşük emisyonlu enerjiye geçin ve yalnız azaltılması zor kalan kısmı açık biçimde raporlayın. Kredi kullanımı gerçek operasyonel azaltımdan ayrı gösterilmelidir.</p><p>“Emisyonsuz” veya “iklim pozitif” gibi geniş ifadeler, sınır ve kredi bilgisi olmadan tüketiciyi yanıltabilir. Daha güvenilir açıklama; brüt emisyonu, yapılan azaltımı, kullanılan kredi miktarını, proje adını, standardı ve iptal dönemini birlikte verir.</p>`,
      },
      {
        id: "offset-sorulari",
        title: "Satın almadan önce sorulacak sorular",
        content: `<ul><li>Proje hangi metodolojiyi ve kayıt sistemini kullanıyor?</li><li>Azaltım veya giderim hangi yıllarda gerçekleşti?</li><li>Tersine dönme riski için tampon ya da sigorta var mı?</li><li>Yerel topluluklar ve biyoçeşitlilik üzerindeki etkiler nasıl izleniyor?</li><li>Kredi benzersiz seri numarasıyla alıcı adına iptal edilecek mi?</li></ul><p>Bu sorular yatırım tavsiyesi değildir; çevresel iddianın dayanağını anlamak için temel bir durum tespiti çerçevesidir.</p>`,
      },
    ],
    en: [
      {
        id: "credit-integrity",
        title: "What a high-integrity credit should address",
        content: `<p>A carbon credit represents a claimed tonne of CO₂e reduction or removal elsewhere. Quality depends on additionality, permanence, leakage controls, and protection against double counting. The project documentation should explain why the outcome would not have happened without the credited activity.</p><p>Review the monitoring report, independent validation or verification, serial number, and retirement record. A program logo alone does not guarantee that every project or vintage has identical quality.</p>`,
      },
      {
        id: "mitigation-hierarchy",
        title: "Place credits within a mitigation hierarchy",
        content: `<p>Avoid unnecessary emissions first, improve energy and material efficiency, move to lower-emission supply, and report the difficult residual separately. Credits should be shown apart from operational reductions.</p><p>Broad labels such as “emissions free” or “climate positive” can mislead when the boundary and credit details are hidden. A more useful disclosure presents gross emissions, reductions achieved, credit quantity, project, standard, and retirement period together.</p>`,
      },
      {
        id: "offset-questions",
        title: "Questions to ask before purchasing",
        content: `<ul><li>Which methodology and registry does the project use?</li><li>When did the reduction or removal occur?</li><li>Is there a buffer or insurance mechanism for reversal?</li><li>How are community and biodiversity impacts monitored?</li><li>Will the unique serial number be retired for the buyer?</li></ul><p>These questions are not investment advice. They are a basic due-diligence framework for understanding the evidence behind an environmental claim.</p>`,
      },
    ],
    sources: [sources.icvcm, sources.unfcccParis],
  },

  "paris-iklim-anlasmasi": {
    tr: [
      {
        id: "paris-mekanizmasi",
        title: "Paris Anlaşması nasıl işler?",
        content: `<p>Paris Anlaşması tek bir küresel emisyon kotası vermek yerine ülkelerin ulusal katkı beyanları hazırladığı, bunları zaman içinde güçlendirmesinin beklendiği ve ilerlemeyi ortak şeffaflık çerçevesinde raporladığı bir yapı kurar. Küresel durum değerlendirmesi, toplu ilerlemeyi belirli aralıklarla inceler ve sonraki katkılara bilgi sağlar.</p><p>Sıcaklık hedefi, uyum, finansman ve kapasite geliştirme aynı anlaşmanın parçalarıdır. Bir ülkenin taraf olması, hedefin otomatik olarak gerçekleştiği anlamına gelmez; politika, yatırım, uygulama ve raporlama sonuçları ayrıca izlenmelidir.</p>`,
      },
      {
        id: "turkiye-paris",
        title: "Türkiye belgelerini izlemek",
        content: `<p>Türkiye'nin hedefleri için en güncel ulusal katkı beyanı, iki yıllık şeffaflık raporları ve ulusal sera gazı envanteri birlikte okunmalıdır. Referans senaryo, baz yıl, hedef yıl, sektör kapsamı ve AKAKDO dahil olup olmadığı hedefin anlamını değiştirir.</p><p>Blog yazılarındaki sabit sayılar zamanla eskir. Bu nedenle CarbonCAM kaynak bölümünde doğrudan ulusal makam ve UNFCCC belgesine bağlantı verir; yeni resmi sürüm yayımlandığında açıklamalar ve tarihler gözden geçirilmelidir.</p>`,
      },
      {
        id: "bireysel-baglanti",
        title: "Anlaşma bireysel kararlara nasıl bağlanır?",
        content: `<p>Paris Anlaşması bireylere kişisel kota koymaz. Bununla birlikte ulusal enerji, ulaşım, bina ve atık politikaları günlük seçeneklerin altyapısını etkiler. Haneler için en somut katkı; gerçek tüketimi ölçmek, verimlilik önlemlerini uygulamak ve değişimi benzer koşullarda izlemektir.</p><p>Bir cihazın enerji tahmini tek başına ulusal hedef ilerlemesini doğrulamaz. CarbonCAM sonucu kişisel karar desteğidir; resmi envanter, sertifika veya Paris uyum beyanı değildir.</p>`,
      },
    ],
    en: [
      {
        id: "paris-mechanism",
        title: "How the Paris Agreement works",
        content: `<p>Rather than setting one global emissions quota, the Paris Agreement establishes a cycle in which countries submit nationally determined contributions, are expected to strengthen them over time, and report progress through a common transparency framework. The global stocktake periodically reviews collective progress and informs later contributions.</p><p>Temperature goals, adaptation, finance, and capacity building are parts of the same agreement. Becoming a Party does not automatically deliver a target; policy, investment, implementation, and reported outcomes still need to be assessed.</p>`,
      },
      {
        id: "turkiye-documents",
        title: "Follow Türkiye's current documents",
        content: `<p>Türkiye's latest nationally determined contribution, biennial transparency reports, and national greenhouse-gas inventory should be read together. The reference scenario, base year, target year, sector coverage, and treatment of land use change the meaning of a target.</p><p>Static numbers in an article can age. CarbonCAM therefore links to the national authority and UNFCCC material in the source section; descriptions and dates should be reviewed when a new official version appears.</p>`,
      },
      {
        id: "personal-connection",
        title: "How the agreement connects to household choices",
        content: `<p>The Paris Agreement does not assign a personal emissions quota. National energy, transport, buildings, and waste policies nevertheless shape the infrastructure behind daily choices. A household can contribute by measuring actual consumption, implementing efficiency measures, and tracking change under comparable conditions.</p><p>An appliance estimate does not verify national progress. A CarbonCAM result is personal decision support, not an official inventory, certificate, or statement of Paris alignment.</p>`,
      },
    ],
    sources: [sources.unfcccParis, sources.turkiyeNdc],
  },

  "bireysel-karbon-ayak-izi-hesaplama": {
    tr: [
      {
        id: "kisisel-sinir",
        title: "Kişisel hesabın sınırını yazmak",
        content: `<p>Takvim yılı veya son 12 ay gibi net bir dönem seçin. Haneye ait elektrik ve ısınma toplamını kişi sayısına bölüp bölmeyeceğinizi, ortak araçları nasıl paylaştıracağınızı ve iş seyahatini kişisel hesaba dahil edip etmeyeceğinizi baştan belirleyin. Gıda ve satın alınan ürünler için kullanılan yaklaşımı ayrıca açıklayın.</p><p>Sınırın amacı mükemmel bir sayı üretmek değil, sonraki dönemde aynı şekilde tekrar edilebilen bir başlangıç oluşturmaktır. Kapsam değişirse eski ve yeni sonuçları doğrudan karşılaştırmak yerine iki yöntemi yan yana açıklayın.</p>`,
      },
      {
        id: "kisisel-veri-tablosu",
        title: "Toplanacak veri tablosu",
        content: `<ul><li><strong>Elektrik:</strong> dönem, kWh ve bağlantı türü.</li><li><strong>Isınma:</strong> yakıt türü, miktar, enerji birimi ve fatura günleri.</li><li><strong>Araç:</strong> yakıt litresi veya km, araç türü ve paylaştırma.</li><li><strong>Uçuş:</strong> havalimanı çifti, kabin ve tek yön/gidiş-dönüş.</li><li><strong>Gıda ve tüketim:</strong> seçilen tahmin yöntemi ve içerilen kategoriler.</li></ul><p>Her satırda veri kaynağı, faktör kaynağı ve belirsizlik notu bulunursa gelecek yıl güncelleme yapmak kolaylaşır.</p>`,
      },
      {
        id: "kisisel-sonuc",
        title: "Sonucu eyleme ve takibe dönüştürmek",
        content: `<p>Kategorileri büyükten küçüğe sıralayın ve kontrol edebileceğiniz ilk iki alanı seçin. Her alan için fiziksel bir hedef belirleyin: aylık kWh, yıllık araç kilometresi veya uçuş sayısı gibi. Maliyet ve yaşam koşullarına uygun tek bir adımla başlayın.</p><p>CarbonCAM cihaz bazlı elektriği görünür kılabilir fakat ısınma, tüm ulaşım, beslenme ve satın almaları birleştiren eksiksiz kişisel hesap sunmaz. Uygulama sonucunu daha geniş çalışmanın yalnızca elektrikli cihaz bölümünde kullanın ve bu sınırı paylaşırken açıkça belirtin.</p>`,
      },
    ],
    en: [
      {
        id: "personal-boundary",
        title: "Write down the personal boundary",
        content: `<p>Choose a clear period such as a calendar year or the latest twelve months. Decide whether household electricity and heating will be divided by residents, how shared vehicles will be allocated, and whether business travel belongs in the personal result. Describe the method used for food and purchased goods separately.</p><p>The purpose is not a perfect number but a repeatable baseline. If the boundary changes, explain old and new methods side by side rather than presenting them as a direct trend.</p>`,
      },
      {
        id: "personal-data-table",
        title: "Data to collect",
        content: `<ul><li><strong>Electricity:</strong> period, kWh, and connection type.</li><li><strong>Heating:</strong> fuel, quantity, energy unit, and billing days.</li><li><strong>Vehicle:</strong> litres or distance, vehicle type, and allocation.</li><li><strong>Flights:</strong> airport pair, cabin, and one-way or return.</li><li><strong>Food and purchases:</strong> estimation method and included categories.</li></ul><p>Add the activity-data source, factor source, and uncertainty note to every line so the estimate can be updated consistently.</p>`,
      },
      {
        id: "personal-action",
        title: "Turn the result into action and tracking",
        content: `<p>Rank categories from largest to smallest and select the first two that you can influence. Define a physical target such as monthly kWh, annual vehicle kilometres, or number of flights. Begin with one step that fits cost and living conditions.</p><p>CarbonCAM can make appliance electricity visible, but it does not combine heating, all transport, food, and purchases into a complete personal footprint. Use its result only within the appliance-electricity part of a wider study and disclose that boundary when sharing it.</p>`,
      },
    ],
    sources: [sources.epaHousehold, sources.ghgTools, sources.turkiyeGrid],
  },
};

