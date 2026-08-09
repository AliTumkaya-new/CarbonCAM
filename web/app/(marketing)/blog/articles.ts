// CarbonCam Blog — Makale Veritabanı
// Her makale SEO-optimize, özgün Türkçe içerik içerir.

export type ArticleCategory = "temel-bilgiler" | "hesaplama" | "azaltma" | "turkiye" | "sektorel";

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: ArticleCategory;
  categoryLabel: string;
  readingTime: number; // dakika
  publishDate: string; // ISO date
  updatedDate?: string;
  excerpt: string;
  heroIcon: string; // SVG path
  heroColor: string;
  content: ArticleSection[];
  relatedSlugs: string[];
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string; // HTML içerik
}

export const categoryLabels: Record<ArticleCategory, string> = {
  "temel-bilgiler": "Temel Bilgiler",
  "hesaplama": "Hesaplama",
  "azaltma": "Azaltma Yolları",
  "turkiye": "Türkiye",
  "sektorel": "Sektörel",
};

export const categoryColors: Record<ArticleCategory, string> = {
  "temel-bilgiler": "#3b82f6",
  "hesaplama": "#8b5cf6",
  "azaltma": "#10b981",
  "turkiye": "#f59e0b",
  "sektorel": "#ec4899",
};

export const articles: Article[] = [
  // ─── 1. Karbon Ayak İzi Nedir? ───
  {
    slug: "karbon-ayak-izi-nedir",
    title: "Karbon Ayak İzi Nedir? Kapsamlı Rehber",
    metaTitle: "Karbon Ayak İzi Nedir? | 2026 Kapsamlı Rehber — CarbonCam",
    metaDescription: "Karbon ayak izi nedir, nasıl oluşur ve neden önemlidir? Bireysel ve kurumsal karbon ayak izi hakkında bilmeniz gereken her şey bu rehberde.",
    category: "temel-bilgiler",
    categoryLabel: "Temel Bilgiler",
    readingTime: 12,
    publishDate: "2026-01-15",
    updatedDate: "2026-08-01",
    excerpt: "Karbon ayak izi, bir birey, kuruluş, etkinlik veya ürünün atmosfere saldığı toplam sera gazı miktarını ifade eder. Günlük yaşamda kullandığımız enerji, tükettiğimiz gıdalar, ulaşım tercihlerimiz ve satın aldığımız ürünlerin hepsi karbon ayak izimize katkıda bulunur.",
    heroIcon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    heroColor: "#3b82f6",
    content: [
      {
        id: "tanim",
        title: "Karbon Ayak İzi Tanımı",
        content: `<p>Karbon ayak izi, bir bireyin, kuruluşun, etkinliğin veya ürünün doğrudan ve dolaylı olarak atmosfere saldığı toplam <strong>sera gazı miktarını</strong> ifade eder. Bu ölçüm genellikle <strong>karbondioksit eşdeğeri (CO₂e)</strong> cinsinden ton veya kilogram olarak hesaplanır.</p>
<p>Sera gazları sadece karbondioksitten (CO₂) ibaret değildir. Metan (CH₄), diazot monoksit (N₂O), florlu gazlar (HFC, PFC, SF₆) gibi gazlar da sera etkisine katkıda bulunur. Bu gazların her birinin farklı <strong>Küresel Isınma Potansiyeli (GWP)</strong> vardır. Örneğin, metanın GWP değeri CO₂'nin yaklaşık 28 katıdır; yani 1 kg metan, atmosferde 28 kg CO₂ kadar ısıtma etkisi yapar.</p>
<p>Dünya genelinde bir insanın ortalama karbon ayak izi yılda yaklaşık <strong>4 ton CO₂e</strong> civarındadır. Ancak bu rakam ülkeden ülkeye büyük farklılık gösterir. ABD'de kişi başı ortalama yaklaşık 16 ton iken, Hindistan'da bu rakam 2 ton civarındadır. Türkiye'de ise kişi başı yıllık karbon ayak izi yaklaşık <strong>5,5 ton CO₂e</strong> seviyesindedir.</p>`
      },
      {
        id: "neden-onemli",
        title: "Karbon Ayak İzi Neden Önemli?",
        content: `<p>İklim değişikliği, dünyamızın karşı karşıya olduğu en büyük çevresel tehditlerden biridir. Bilim insanları, küresel sıcaklık artışını <strong>1,5°C</strong> ile sınırlamak için sera gazı emisyonlarının 2030'a kadar %45, 2050'ye kadar ise net sıfıra indirilmesi gerektiğini belirtmektedir.</p>
<p>Karbon ayak izimizi bilmek önemlidir çünkü:</p>
<ul>
<li><strong>Farkındalık oluşturur:</strong> Günlük alışkanlıklarımızın çevresel etkisini somutlaştırır</li>
<li><strong>Ölçülebilir hedefler koymamızı sağlar:</strong> Neyi ölçemezseniz, onu yönetemezsiniz</li>
<li><strong>Doğru karar almayı kolaylaştırır:</strong> Hangi alışkanlığımızın en çok emisyon yarattığını gösterir</li>
<li><strong>Toplumsal sorumluluk:</strong> Bireylerin ve şirketlerin çevresel sorumluluğunu artırır</li>
<li><strong>Ekonomik avantaj:</strong> Enerji verimliliği genellikle maliyet tasarrufu anlamına gelir</li>
</ul>`
      },
      {
        id: "nasil-olusur",
        title: "Karbon Ayak İzi Nasıl Oluşur?",
        content: `<p>Karbon ayak izimiz günlük yaşamın hemen her alanından beslenir:</p>
<h4>🏠 Ev ve Enerji</h4>
<p>Evlerimizi ısıtmak, soğutmak ve aydınlatmak için kullandığımız enerji, karbon ayak izimizin önemli bir bölümünü oluşturur. Türkiye'de bir evin yıllık ortalama elektrik tüketimi yaklaşık 2.500 kWh'tir ve bu da yaklaşık <strong>1,1 ton CO₂e</strong> emisyona karşılık gelir.</p>
<h4>🚗 Ulaşım</h4>
<p>Benzinli bir otomobille günde 30 km yol yapan birinin yıllık ulaşım kaynaklı karbon ayak izi yaklaşık <strong>1,8 ton CO₂e</strong>'dir. Uçak yolculukları ise mesafe başına en yüksek emisyona sahip ulaşım türlerinden biridir.</p>
<h4>🍽️ Beslenme</h4>
<p>Gıda üretimi, küresel sera gazı emisyonlarının yaklaşık %26'sından sorumludur. Özellikle hayvancılık sektörü, metan emisyonları nedeniyle büyük bir paya sahiptir. Kırmızı et tüketimi, bitkisel beslenmeye kıyasla 10-50 kat daha fazla emisyona neden olabilir.</p>
<h4>🛒 Tüketim</h4>
<p>Satın aldığımız kıyafetler, elektronik cihazlar, ev eşyaları gibi ürünlerin üretim, taşıma ve bertaraf süreçleri de karbon ayak izimize eklenir. Hızlı moda endüstrisi, küresel emisyonların yaklaşık %3-10'undan sorumlu tutulmaktadır.</p>`
      },
      {
        id: "olcum-birimleri",
        title: "Ölçüm Birimleri ve Standartlar",
        content: `<p>Karbon ayak izi ölçümünde kullanılan temel birim <strong>CO₂e (karbondioksit eşdeğeri)</strong>'dir. Bu birim, farklı sera gazlarını ortak bir ölçü birimine dönüştürmeyi sağlar.</p>
<p>Başlıca standartlar:</p>
<ul>
<li><strong>GHG Protocol:</strong> En yaygın kullanılan kurumsal sera gazı muhasebe standardı</li>
<li><strong>ISO 14064:</strong> Sera gazı emisyonlarının ölçümü ve raporlanması için uluslararası standart</li>
<li><strong>ISO 14067:</strong> Ürün karbon ayak izi için standart</li>
<li><strong>PAS 2050:</strong> Ürün ve hizmetlerin yaşam döngüsü sera gazı emisyonları</li>
</ul>
<p>CarbonCam uygulaması, bu uluslararası standartlara uygun hesaplama metodolojileri kullanarak bireysel karbon ayak izinizi doğru ve güvenilir şekilde hesaplar.</p>`
      },
      {
        id: "kisisel-vs-kurumsal",
        title: "Bireysel vs Kurumsal Karbon Ayak İzi",
        content: `<p><strong>Bireysel karbon ayak izi</strong>, tek bir kişinin yaşam tarzından kaynaklanan emisyonları kapsar: enerji kullanımı, ulaşım, beslenme, tüketim alışkanlıkları ve atık yönetimi.</p>
<p><strong>Kurumsal karbon ayak izi</strong> ise bir şirketin tüm operasyonlarından kaynaklanan emisyonları içerir. GHG Protocol'e göre üç kapsam (scope) altında sınıflandırılır:</p>
<ul>
<li><strong>Scope 1:</strong> Doğrudan emisyonlar (şirketin sahip olduğu/kontrol ettiği kaynaklardan)</li>
<li><strong>Scope 2:</strong> Dolaylı enerji emisyonları (satın alınan elektrik, ısı, buhar)</li>
<li><strong>Scope 3:</strong> Diğer dolaylı emisyonlar (tedarik zinciri, iş seyahatleri, ürün kullanımı)</li>
</ul>
<p>CarbonCam, hem bireysel kullanıcılar hem de farkındalık oluşturmak isteyen kurumlar için tasarlanmış bir platformdur.</p>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izi-nasil-hesaplanir", "scope-1-scope-2-scope-3-nedir", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 2. Karbon Ayak İzi Nasıl Hesaplanır? ───
  {
    slug: "karbon-ayak-izi-nasil-hesaplanir",
    title: "Karbon Ayak İzi Nasıl Hesaplanır?",
    metaTitle: "Karbon Ayak İzi Nasıl Hesaplanır? | Adım Adım Hesaplama — CarbonCam",
    metaDescription: "Karbon ayak izi hesaplama yöntemlerini adım adım öğrenin. Emisyon faktörleri, hesaplama formülleri ve CarbonCam ile kolay hesaplama rehberi.",
    category: "hesaplama",
    categoryLabel: "Hesaplama",
    readingTime: 15,
    publishDate: "2026-01-20",
    updatedDate: "2026-07-15",
    excerpt: "Karbon ayak izi hesaplama, belirli aktivitelerin ne kadar sera gazı emisyonuna neden olduğunu belirlemek için emisyon faktörlerini kullanır. Bu rehberde hesaplama yöntemlerini adım adım öğreneceksiniz.",
    heroIcon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    heroColor: "#8b5cf6",
    content: [
      {
        id: "temel-formul",
        title: "Temel Hesaplama Formülü",
        content: `<p>Karbon ayak izi hesaplamasının temelinde basit bir formül yatar:</p>
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;text-align:center;margin:24px 0;font-size:18px;font-weight:600;color:#0f172a">
CO₂e Emisyon = Aktivite Verisi × Emisyon Faktörü
</div>
<p><strong>Aktivite verisi</strong>, ölçülebilir bir girdidir: tüketilen kWh elektrik, yakılan litre benzin, yenilen kg et gibi. <strong>Emisyon faktörü</strong> ise birim aktivite başına üretilen sera gazı miktarıdır.</p>
<p>Örneğin:</p>
<ul>
<li>100 kWh elektrik tüketimi × 0,440 kg CO₂e/kWh = <strong>44 kg CO₂e</strong></li>
<li>50 litre benzin yakma × 2,31 kg CO₂e/litre = <strong>115,5 kg CO₂e</strong></li>
<li>1 kg kırmızı et tüketimi × 27 kg CO₂e/kg = <strong>27 kg CO₂e</strong></li>
</ul>`
      },
      {
        id: "emisyon-faktorleri",
        title: "Emisyon Faktörleri",
        content: `<p>Emisyon faktörleri, farklı aktivitelerin karbon yoğunluğunu belirleyen katsayılardır. Türkiye için güncel emisyon faktörleri:</p>
<h4>⚡ Elektrik</h4>
<p>Türkiye'nin elektrik şebekesi emisyon faktörü: <strong>0,440 kg CO₂e/kWh</strong> (2025 TEİAŞ verisi). Bu değer, enerji kaynaklarının (kömür, doğalgaz, yenilenebilir) dağılımına göre her yıl güncellenir.</p>
<h4>🔥 Doğalgaz</h4>
<p>Doğalgaz yakımı: <strong>2,02 kg CO₂e/m³</strong>. Ev tipi doğalgaz tüketiminde aylık ortalama 100-300 m³ kullanılır.</p>
<h4>⛽ Benzin ve Dizel</h4>
<p>Benzin: <strong>2,31 kg CO₂e/litre</strong>, Dizel: <strong>2,68 kg CO₂e/litre</strong>. Motor verimliliği, araç ağırlığı ve sürüş koşulları gerçek emisyonu etkiler.</p>
<h4>✈️ Uçuş</h4>
<p>Ekonomi sınıfı kısa mesafe: <strong>0,255 kg CO₂e/km</strong>, Uzun mesafe: <strong>0,195 kg CO₂e/km</strong>. Business class, ekonomiye göre yaklaşık 3 kat daha fazla emisyona neden olur.</p>`
      },
      {
        id: "hesaplama-adimlari",
        title: "Adım Adım Hesaplama",
        content: `<p>Bireysel karbon ayak izinizi hesaplamak için şu adımları izleyin:</p>
<h4>Adım 1: Enerji Tüketiminizi Belirleyin</h4>
<p>Elektrik ve doğalgaz faturalarınızdan aylık tüketim miktarlarınızı not edin. Yıllık ortalama almak en doğru sonucu verir.</p>
<h4>Adım 2: Ulaşım Alışkanlıklarınızı Hesaplayın</h4>
<p>Haftalık araba kullanım mesafenizi, toplu taşıma kullanımınızı ve yıllık uçuş sayınızı/mesafenizi belirleyin.</p>
<h4>Adım 3: Beslenme Tercihlerinizi Değerlendirin</h4>
<p>Haftalık kırmızı et, beyaz et, süt ürünleri ve bitkisel gıda tüketiminizi tahmin edin.</p>
<h4>Adım 4: Tüketim Alışkanlıklarınızı Ekleyin</h4>
<p>Yeni kıyafet, elektronik ve diğer ürün alımlarınızı yıllık bazda değerlendirin.</p>
<h4>Adım 5: Toplam Emisyonu Hesaplayın</h4>
<p>Her kategorideki emisyonları toplayarak yıllık karbon ayak izinizi elde edin.</p>
<p>Tüm bu adımları <strong>CarbonCam uygulaması</strong> otomatik olarak yapar — fotoğraf çekerek, günlük aktivitelerinizi kaydederek ve akıllı algoritmalarla hesaplayarak.</p>`
      },
      {
        id: "karbon-hesaplama-araclari",
        title: "Karbon Hesaplama Araçları",
        content: `<p>Karbon ayak izi hesaplama için çeşitli araçlar mevcuttur:</p>
<ul>
<li><strong>CarbonCam:</strong> Mobil uygulama ile fotoğrafla analiz, gamification ve gerçek zamanlı takip</li>
<li><strong>Çevrimiçi hesaplayıcılar:</strong> Web tabanlı basit formlar (genellikle yıllık tahmin)</li>
<li><strong>Kurumsal platformlar:</strong> İşletmeler için detaylı raporlama araçları</li>
</ul>
<p>CarbonCam'in farkı, günlük aktivitelerinizi <strong>gerçek zamanlı</strong> olarak takip edebilmesi ve bunu eğlenceli bir deneyime dönüştürmesidir. XP kazanın, dijital ormanınızı büyütün ve karbon ayak izinizi azaltmanın keyfini çıkarın!</p>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izi-nedir", "bireysel-karbon-ayak-izi-hesaplama", "elektrik-tuketimi-karbon-emisyonu"]
  },

  // ─── 3. Araba Karbon Emisyonu ───
  {
    slug: "araba-karbon-emisyonu-hesaplama",
    title: "Araba Karbon Emisyonu Hesaplama",
    metaTitle: "Araba Karbon Emisyonu Hesaplama | Yakıt Türüne Göre — CarbonCam",
    metaDescription: "Arabanızın karbon emisyonunu hesaplayın. Benzin, dizel, LPG, hibrit ve elektrikli araç emisyon karşılaştırması. Yakıt tüketimine göre CO₂ hesaplama.",
    category: "hesaplama",
    categoryLabel: "Hesaplama",
    readingTime: 10,
    publishDate: "2026-02-05",
    excerpt: "Otomobiller, bireysel karbon ayak izinin en büyük bileşenlerinden biridir. Yakıt türüne, motor hacmine ve sürüş koşullarına göre araç emisyonlarını hesaplayın.",
    heroIcon: "M8 17h8M8 17l-2-8h12l-2 8M8 17H6a2 2 0 01-2-2V9h2m10 8h2a2 2 0 002-2V9h-2M6 9l1-4h10l1 4",
    heroColor: "#ef4444",
    content: [
      {
        id: "arac-emisyon-genel",
        title: "Araç Emisyonları Hakkında",
        content: `<p>Ulaşım sektörü, küresel sera gazı emisyonlarının yaklaşık <strong>%16'sından</strong> sorumludur ve bireysel araç kullanımı bunun büyük bir bölümünü oluşturur. Türkiye'de trafiğe kayıtlı araç sayısı 27 milyonun üzerindedir ve her yıl artmaya devam etmektedir.</p>
<p>Bir otomobilin karbon emisyonu şu faktörlere bağlıdır:</p>
<ul>
<li><strong>Yakıt türü:</strong> Benzin, dizel, LPG, elektrik, hibrit</li>
<li><strong>Motor hacmi ve verimliliği</strong></li>
<li><strong>Araç ağırlığı</strong></li>
<li><strong>Sürüş koşulları:</strong> Şehir içi vs. şehirlerarası</li>
<li><strong>Bakım durumu:</strong> Lastik basıncı, motor bakımı</li>
</ul>`
      },
      {
        id: "yakit-turleri",
        title: "Yakıt Türlerine Göre Emisyon Faktörleri",
        content: `<p>Her yakıt türü farklı miktarda CO₂ üretir:</p>
<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#f8fafc">
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Yakıt Türü</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Emisyon Faktörü</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Ort. 100 km Emisyon</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Benzin</td><td style="padding:12px;border:1px solid #e2e8f0">2,31 kg CO₂e/litre</td><td style="padding:12px;border:1px solid #e2e8f0">~16,2 kg CO₂e</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Dizel</td><td style="padding:12px;border:1px solid #e2e8f0">2,68 kg CO₂e/litre</td><td style="padding:12px;border:1px solid #e2e8f0">~14,7 kg CO₂e</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">LPG</td><td style="padding:12px;border:1px solid #e2e8f0">1,61 kg CO₂e/litre</td><td style="padding:12px;border:1px solid #e2e8f0">~14,5 kg CO₂e</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Elektrikli</td><td style="padding:12px;border:1px solid #e2e8f0">0 doğrudan (şebekeye bağlı)</td><td style="padding:12px;border:1px solid #e2e8f0">~7,9 kg CO₂e*</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Hibrit</td><td style="padding:12px;border:1px solid #e2e8f0">Karma</td><td style="padding:12px;border:1px solid #e2e8f0">~10,4 kg CO₂e</td></tr>
</tbody>
</table>
<p style="font-size:13px;color:#64748b">*Elektrikli araç emisyonu, Türkiye şebeke emisyon faktörüne göre hesaplanmıştır.</p>`
      },
      {
        id: "hesaplama-ornegi",
        title: "Hesaplama Örneği",
        content: `<p>Diyelim ki günde 40 km yol yapan, 100 km'de 7 litre benzin tüketen bir arabanız var:</p>
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:20px 0">
<p><strong>Günlük tüketim:</strong> 40 km × (7 L / 100 km) = 2,8 litre/gün</p>
<p><strong>Günlük emisyon:</strong> 2,8 L × 2,31 kg CO₂e/L = <strong>6,47 kg CO₂e/gün</strong></p>
<p><strong>Yıllık emisyon:</strong> 6,47 × 365 = <strong>2.361 kg CO₂e/yıl ≈ 2,36 ton CO₂e</strong></p>
</div>
<p>Bu, yaklaşık <strong>105 ağacın</strong> bir yılda absorbe edebileceği CO₂ miktarına denk gelir!</p>
<p>CarbonCam uygulaması ile araç kullanımınızı kolayca takip edebilir, farklı ulaşım alternatiflerinin emisyon karşılaştırmasını görebilirsiniz.</p>`
      },
      {
        id: "azaltma-onerileri",
        title: "Araç Emisyonlarını Azaltma Önerileri",
        content: `<ul>
<li><strong>Toplu taşıma kullanın:</strong> Otobüs veya metro, bireysel araç kullanımına göre kişi başı %80 daha az emisyon üretir</li>
<li><strong>Araç paylaşımı:</strong> Carpooling ile emisyonu yarıya indirebilirsiniz</li>
<li><strong>Ekonomik sürüş:</strong> Sabit hızda, ani fren/hızlanma olmadan sürmek %15-20 yakıt tasarrufu sağlar</li>
<li><strong>Lastik basıncı kontrolü:</strong> Doğru basınç, yakıt tüketimini %3-5 azaltır</li>
<li><strong>Gereksiz ağırlık:</strong> Bagajdaki fazla yükü çıkarın, her 50 kg ekstra ağırlık %2 daha fazla yakıt demektir</li>
<li><strong>Elektrikli/hibrit araç:</strong> Uzun vadede hem emisyonu hem maliyeti düşürür</li>
</ul>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izi-nasil-hesaplanir", "ucak-yolculugu-karbon-emisyonu", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 4. Uçak Yolculuğu Karbon Emisyonu ───
  {
    slug: "ucak-yolculugu-karbon-emisyonu",
    title: "Uçak Yolculuğu Karbon Emisyonu",
    metaTitle: "Uçak Yolculuğu Karbon Emisyonu | Uçuş Emisyon Hesaplama — CarbonCam",
    metaDescription: "Uçak yolculuğunun karbon emisyonunu hesaplayın. Kısa-uzun mesafe, ekonomi-business class karşılaştırması ve emisyon azaltma yolları.",
    category: "hesaplama",
    categoryLabel: "Hesaplama",
    readingTime: 9,
    publishDate: "2026-02-10",
    excerpt: "Havacılık sektörü küresel emisyonların %2,5'ini oluşturur. Bir uçuşun karbon emisyonunu hesaplamayı ve alternatif ulaşım yöntemlerini karşılaştırmayı öğrenin.",
    heroIcon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    heroColor: "#06b6d4",
    content: [
      {
        id: "havacilik-emisyonlari",
        title: "Havacılık ve Karbon Emisyonu",
        content: `<p>Havacılık sektörü, küresel sera gazı emisyonlarının yaklaşık <strong>%2,5'inden</strong> sorumludur. Ancak yolcu başına bakıldığında, uçak yolculuğu en yüksek emisyona sahip ulaşım türlerinden biridir.</p>
<p>Bir uçuşun karbon emisyonunu etkileyen faktörler:</p>
<ul>
<li><strong>Mesafe:</strong> Kısa mesafe uçuşlar km başına daha fazla emisyon üretir (kalkış ve iniş fazları)</li>
<li><strong>Sınıf:</strong> Business class, ekonominin 3 katı; first class ise 4 katı emisyon</li>
<li><strong>Uçak tipi:</strong> Yeni nesil uçaklar %15-25 daha verimli</li>
<li><strong>Doluluk oranı:</strong> Dolu uçan uçak, kişi başı daha az emisyon üretir</li>
<li><strong>Radyatif zorlama:</strong> Yüksek irtifada salınan emisyonlar, yer seviyesindekinden 2-4 kat daha fazla ısınma etkisi yapar</li>
</ul>`
      },
      {
        id: "populer-rotalar",
        title: "Popüler Rotalar ve Emisyon Değerleri",
        content: `<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#f8fafc">
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Rota</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Mesafe</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Ekonomi CO₂e</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Business CO₂e</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:12px;border:1px solid #e2e8f0">İstanbul → Ankara</td><td style="padding:12px;border:1px solid #e2e8f0">450 km</td><td style="padding:12px;border:1px solid #e2e8f0">115 kg</td><td style="padding:12px;border:1px solid #e2e8f0">345 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">İstanbul → Antalya</td><td style="padding:12px;border:1px solid #e2e8f0">530 km</td><td style="padding:12px;border:1px solid #e2e8f0">135 kg</td><td style="padding:12px;border:1px solid #e2e8f0">405 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">İstanbul → Londra</td><td style="padding:12px;border:1px solid #e2e8f0">2.500 km</td><td style="padding:12px;border:1px solid #e2e8f0">490 kg</td><td style="padding:12px;border:1px solid #e2e8f0">1.470 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">İstanbul → New York</td><td style="padding:12px;border:1px solid #e2e8f0">8.100 km</td><td style="padding:12px;border:1px solid #e2e8f0">1.580 kg</td><td style="padding:12px;border:1px solid #e2e8f0">4.740 kg</td></tr>
</tbody>
</table>
<p>İstanbul-New York arası tek yön ekonomi sınıfı uçuş, bir Türk vatandaşının yıllık karbon ayak izinin yaklaşık <strong>%29'una</strong> denk gelir!</p>`
      },
      {
        id: "alternatifler",
        title: "Uçağa Alternatif Ulaşım",
        content: `<p>Mümkün olduğunda uçak yerine daha düşük emisyonlu alternatifler tercih edilebilir:</p>
<ul>
<li><strong>Yüksek Hızlı Tren:</strong> Uçağa göre kişi başı %85-90 daha az emisyon (İstanbul-Ankara YHT: ~15 kg CO₂e)</li>
<li><strong>Otobüs:</strong> Uzun mesafe otobüsler uçağa göre %70-80 daha az emisyon</li>
<li><strong>Video konferans:</strong> İş seyahatlerini sanal toplantılarla değiştirmek en etkili yol</li>
</ul>
<p>CarbonCam ile her seyahatinizin karbon etkisini karşılaştırabilir ve bilinçli tercihler yapabilirsiniz.</p>`
      }
    ],
    relatedSlugs: ["araba-karbon-emisyonu-hesaplama", "karbon-ayak-izi-nasil-hesaplanir", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 5. Elektrik Tüketimi Karbon Emisyonu ───
  {
    slug: "elektrik-tuketimi-karbon-emisyonu",
    title: "Elektrik Tüketimi ve Karbon Emisyonu",
    metaTitle: "Elektrik Tüketimi Karbon Emisyonu Hesaplama | Türkiye — CarbonCam",
    metaDescription: "Elektrik tüketiminizin karbon emisyonunu hesaplayın. Türkiye şebeke emisyon faktörü, ev aletlerinin tüketimi ve enerji tasarrufu yolları.",
    category: "hesaplama",
    categoryLabel: "Hesaplama",
    readingTime: 11,
    publishDate: "2026-02-20",
    excerpt: "Türkiye'de elektrik üretiminin yaklaşık %60'ı fosil yakıtlardan sağlanıyor. Elektrik tüketiminizin karbon emisyonunu nasıl hesaplayacağınızı ve azaltma yollarını öğrenin.",
    heroIcon: "M13 10V3L4 14h7v7l9-11h-7z",
    heroColor: "#f59e0b",
    content: [
      {
        id: "turkiye-elektrik",
        title: "Türkiye'de Elektrik Üretimi ve Emisyon",
        content: `<p>Türkiye'nin elektrik üretim kaynakları ve oranları (2025 verisi):</p>
<ul>
<li><strong>Doğalgaz:</strong> %22 — Nispeten temiz fosil yakıt</li>
<li><strong>Kömür:</strong> %32 — En yüksek emisyonlu kaynak</li>
<li><strong>Hidroelektrik:</strong> %20 — Yenilenebilir</li>
<li><strong>Rüzgar:</strong> %12 — Yenilenebilir</li>
<li><strong>Güneş:</strong> %8 — Yenilenebilir</li>
<li><strong>Diğer:</strong> %6 — Jeotermal, biyokütle vb.</li>
</ul>
<p>Türkiye'nin ortalama şebeke emisyon faktörü: <strong>0,440 kg CO₂e/kWh</strong>. Bu, her 1 kWh elektrik tüketiminin 440 gram CO₂ eşdeğeri emisyona neden olduğu anlamına gelir.</p>`
      },
      {
        id: "ev-aletleri",
        title: "Ev Aletlerinin Yıllık Karbon Ayak İzi",
        content: `<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#f8fafc">
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Cihaz</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Yıllık Tüketim</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Yıllık CO₂e</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Klima (Yaz 4 ay)</td><td style="padding:12px;border:1px solid #e2e8f0">~700 kWh</td><td style="padding:12px;border:1px solid #e2e8f0">308 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Buzdolabı</td><td style="padding:12px;border:1px solid #e2e8f0">~350 kWh</td><td style="padding:12px;border:1px solid #e2e8f0">154 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Çamaşır Makinesi</td><td style="padding:12px;border:1px solid #e2e8f0">~200 kWh</td><td style="padding:12px;border:1px solid #e2e8f0">88 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">TV (4 saat/gün)</td><td style="padding:12px;border:1px solid #e2e8f0">~180 kWh</td><td style="padding:12px;border:1px solid #e2e8f0">79 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Bulaşık Makinesi</td><td style="padding:12px;border:1px solid #e2e8f0">~250 kWh</td><td style="padding:12px;border:1px solid #e2e8f0">110 kg</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Aydınlatma</td><td style="padding:12px;border:1px solid #e2e8f0">~400 kWh</td><td style="padding:12px;border:1px solid #e2e8f0">176 kg</td></tr>
</tbody>
</table>
<p>Ortalama bir Türk evinin yıllık elektrik kaynaklı karbon ayak izi: yaklaşık <strong>1.100 kg CO₂e (1,1 ton)</strong>.</p>`
      },
      {
        id: "tasarruf-yollari",
        title: "Elektrik Kaynaklı Emisyonu Azaltma",
        content: `<ul>
<li><strong>LED aydınlatma:</strong> Akkor ampullerden LED'e geçiş %80-90 enerji tasarrufu sağlar</li>
<li><strong>A+++ sınıfı cihazlar:</strong> Enerji verimli ev aletleri tercih edin</li>
<li><strong>Akıllı termostat:</strong> Klima ve ısıtma otomatik optimizasyonu ile %20-30 tasarruf</li>
<li><strong>Stand-by modunu kapatın:</strong> Bekleme modundaki cihazlar yılda 50-100 kWh tüketir</li>
<li><strong>Güneş panelleri:</strong> Çatı tipi güneş panelleri ile evinizin elektriğinin bir kısmını üretin</li>
<li><strong>Yeşil enerji tarifeleri:</strong> Bazı elektrik sağlayıcıları yenilenebilir enerji tarifeleri sunar</li>
</ul>
<p>CarbonCam'in ev enerji takibi özelliği ile aylık elektrik tüketiminizi ve karbon emisyonunuzu takip edebilirsiniz.</p>`
      }
    ],
    relatedSlugs: ["dogalgaz-karbon-emisyonu", "evde-enerji-verimliligi", "karbon-ayak-izi-nasil-hesaplanir"]
  },

  // ─── 6. Doğalgaz Karbon Emisyonu ───
  {
    slug: "dogalgaz-karbon-emisyonu",
    title: "Doğalgaz Kullanımı ve Karbon Emisyonu",
    metaTitle: "Doğalgaz Karbon Emisyonu | Ev ve Sanayi Hesaplama — CarbonCam",
    metaDescription: "Doğalgaz tüketiminizin karbon emisyonunu hesaplayın. Konut ve sanayi doğalgaz emisyon faktörleri, ısıtma verimliliği ve alternatif enerji kaynakları.",
    category: "hesaplama",
    categoryLabel: "Hesaplama",
    readingTime: 9,
    publishDate: "2026-03-01",
    excerpt: "Doğalgaz, Türkiye'deki evlerin %70'inin ısınma kaynağı. Doğalgaz tüketiminizin karbon emisyonunu hesaplamayı ve enerji verimliliği ile nasıl azaltacağınızı öğrenin.",
    heroIcon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0 .065.023.13.025.198A6.002 6.002 0 0012 20a6.002 6.002 0 005.657-4.015c.012.007.025.011.037.018C16.308 17.39 15 17 14 16c1 0 3-2 3-4s-1.5-3-3-3",
    heroColor: "#f97316",
    content: [
      {
        id: "dogalgaz-emisyon",
        title: "Doğalgaz ve Sera Gazı Emisyonları",
        content: `<p>Doğalgaz, fosil yakıtlar arasında en düşük karbon yoğunluğuna sahip olanıdır. Kömüre göre %50-60, petrole göre %25-30 daha az CO₂ üretir. Ancak yine de önemli bir emisyon kaynağıdır.</p>
<p>Doğalgaz emisyon faktörleri:</p>
<ul>
<li><strong>Yanma emisyonu:</strong> 2,02 kg CO₂e/m³ (veya 56,1 kg CO₂e/GJ)</li>
<li><strong>Yaşam döngüsü emisyonu:</strong> Üretim, taşıma ve dağıtım dahil yaklaşık 2,35 kg CO₂e/m³</li>
<li><strong>Metan kaçağı:</strong> Doğalgaz altyapısından %1-3 metan kaçağı, toplam etkiyi artırır</li>
</ul>`
      },
      {
        id: "konut-tuketimi",
        title: "Konut Doğalgaz Tüketimi ve Emisyon",
        content: `<p>Türkiye'de bir konutun aylık doğalgaz tüketimi bölgeye ve mevsime göre değişir:</p>
<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#f8fafc">
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Dönem</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Ort. Tüketim (m³/ay)</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">CO₂e Emisyon (kg/ay)</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Kış (Aralık-Şubat)</td><td style="padding:12px;border:1px solid #e2e8f0">250-400</td><td style="padding:12px;border:1px solid #e2e8f0">505-808</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Geçiş (Mart, Kasım)</td><td style="padding:12px;border:1px solid #e2e8f0">100-200</td><td style="padding:12px;border:1px solid #e2e8f0">202-404</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">Yaz (Haziran-Eylül)</td><td style="padding:12px;border:1px solid #e2e8f0">15-30</td><td style="padding:12px;border:1px solid #e2e8f0">30-61</td></tr>
</tbody>
</table>
<p>Türkiye'de bir konutun yıllık ortalama doğalgaz kaynaklı karbon emisyonu: yaklaşık <strong>2.000-3.500 kg CO₂e (2-3,5 ton)</strong>.</p>
<p>CarbonCam uygulaması ile doğalgaz faturanızı fotoğrafla taratarak otomatik emisyon hesaplaması yapabilirsiniz.</p>`
      },
      {
        id: "verimlilik",
        title: "Doğalgaz Verimliliğini Artırma",
        content: `<ul>
<li><strong>Yoğuşmalı kombi:</strong> Geleneksel kombilere göre %10-15 daha verimli</li>
<li><strong>Bina yalıtımı:</strong> Dış cephe ve çatı yalıtımı enerji tüketimini %30-50 azaltır</li>
<li><strong>Cam izolasyonu:</strong> Çift cam, ısı kaybını %40-60 azaltır</li>
<li><strong>Oda sıcaklığı:</strong> Her 1°C düşüş, enerji tüketimini %6-8 azaltır (21°C ideal)</li>
<li><strong>Programlanabilir termostat:</strong> Saatlere göre otomatik ayar ile %15-20 tasarruf</li>
<li><strong>Isı pompası:</strong> Alternatif ısıtma sistemi olarak düşünülebilir</li>
</ul>`
      }
    ],
    relatedSlugs: ["elektrik-tuketimi-karbon-emisyonu", "evde-enerji-verimliligi", "karbon-ayak-izi-nasil-hesaplanir"]
  },

  // ─── 7. Scope 1, 2, 3 Nedir? ───
  {
    slug: "scope-1-scope-2-scope-3-nedir",
    title: "Scope 1, Scope 2, Scope 3 Emisyonlar Nedir?",
    metaTitle: "Scope 1, 2, 3 Emisyonlar Nedir? | GHG Protocol Rehberi — CarbonCam",
    metaDescription: "GHG Protocol'e göre Scope 1, Scope 2 ve Scope 3 emisyonların ne olduğunu, aralarındaki farkları ve nasıl hesaplandığını öğrenin.",
    category: "temel-bilgiler",
    categoryLabel: "Temel Bilgiler",
    readingTime: 13,
    publishDate: "2026-03-10",
    excerpt: "GHG Protocol, sera gazı emisyonlarını üç kapsam (scope) altında sınıflandırır. Bu sınıflandırma, şirketlerin ve bireylerin emisyonlarını sistematik olarak yönetmesini sağlar.",
    heroIcon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    heroColor: "#6366f1",
    content: [
      {
        id: "ghg-protocol",
        title: "GHG Protocol Nedir?",
        content: `<p><strong>Greenhouse Gas Protocol (GHG Protocol)</strong>, dünya genelinde en yaygın kullanılan sera gazı muhasebe standardıdır. World Resources Institute (WRI) ve World Business Council for Sustainable Development (WBCSD) tarafından geliştirilmiştir.</p>
<p>GHG Protocol, emisyonları kaynağına göre üç kapsama ayırır. Bu sınıflandırma, şirketlerin emisyonlarını sistematik olarak tanımlamasını, ölçmesini ve raporlamasını sağlar.</p>`
      },
      {
        id: "scope-1",
        title: "Scope 1: Doğrudan Emisyonlar",
        content: `<p>Scope 1, bir kuruluşun <strong>doğrudan sahip olduğu veya kontrol ettiği kaynaklardan</strong> çıkan emisyonları kapsar.</p>
<p>Örnekler:</p>
<ul>
<li>Şirket araçlarının yakıt tüketimi</li>
<li>Üretim tesislerindeki yakma süreçleri (kazanlar, fırınlar)</li>
<li>Soğutucu gazların kaçağı (klima sistemleri)</li>
<li>Endüstriyel proseslerden kaynaklanan emisyonlar</li>
</ul>
<p>Bireysel açıdan Scope 1: Evinizdeki doğalgaz kombisi, kendi arabanızın egzoz emisyonu.</p>`
      },
      {
        id: "scope-2",
        title: "Scope 2: Dolaylı Enerji Emisyonları",
        content: `<p>Scope 2, satın alınan <strong>elektrik, ısı, buhar veya soğutma</strong> enerjisinin üretiminden kaynaklanan emisyonları kapsar. Bu emisyonlar fiziksel olarak başka bir tesiste gerçekleşir, ancak satın alan kuruluşun tüketim kararlarından kaynaklanır.</p>
<p>Örnekler:</p>
<ul>
<li>Ofis ve fabrikaların elektrik tüketimi</li>
<li>Satın alınan buhar veya sıcak su</li>
<li>Bölgesel ısıtma/soğutma sistemleri</li>
</ul>
<p>Bireysel açıdan Scope 2: Evinizde kullandığınız şebeke elektriğinin üretim emisyonu.</p>`
      },
      {
        id: "scope-3",
        title: "Scope 3: Diğer Dolaylı Emisyonlar",
        content: `<p>Scope 3, kuruluşun değer zincirindeki <strong>diğer tüm dolaylı emisyonları</strong> kapsar. Genellikle toplam emisyonun %70-90'ını oluşturur ve hesaplanması en zor kapsamdır.</p>
<p>15 kategoriye ayrılır. Önemli örnekler:</p>
<ul>
<li><strong>Satın alınan ürün/hizmetler:</strong> Hammadde ve malzeme üretimi</li>
<li><strong>İş seyahatleri:</strong> Uçak, tren, otel</li>
<li><strong>Çalışan ulaşımı:</strong> Evden işe gidiş-geliş</li>
<li><strong>Ürün kullanımı:</strong> Satılan ürünlerin müşteri tarafından kullanımı</li>
<li><strong>Atık bertarafı:</strong> Operasyonlardan kaynaklanan atıklar</li>
<li><strong>Kira/franchise:</strong> Kiralanan varlıkların emisyonları</li>
</ul>
<p>Bireysel açıdan Scope 3: Satın aldığınız ürünlerin üretimi, gıda zinciri, kargo/teslimat emisyonları.</p>`
      },
      {
        id: "bireysel-uygulama",
        title: "Bireylere Nasıl Uygulanır?",
        content: `<p>Scope kavramı esas olarak kurumsal kullanım için geliştirilmiş olsa da, bireylere de uyarlanabilir:</p>
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:20px 0">
<p><strong>Bireysel Scope 1:</strong> Arabanızdaki benzin, evinizdeki doğalgaz</p>
<p><strong>Bireysel Scope 2:</strong> Şebeke elektriğiniz</p>
<p><strong>Bireysel Scope 3:</strong> Satın aldığınız ürünler, gıda, kıyafet, uçuşlar</p>
</div>
<p>CarbonCam uygulaması tüm bu kapsamları otomatik olarak kategorize eder ve hangi alandan ne kadar emisyon geldiğini size gösterir. Ev, Ulaşım, Yemek ve Alışveriş kategorileri ile karbon ayak izinizi detaylı şekilde analiz edebilirsiniz.</p>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izi-nedir", "karbon-notr-nedir", "karbon-dengeleme-offset"]
  },

  // ─── 8. Türkiye'de Karbon Emisyonu ───
  {
    slug: "turkiyede-karbon-emisyonu",
    title: "Türkiye'de Karbon Emisyonu: Veriler ve Analiz",
    metaTitle: "Türkiye'de Karbon Emisyonu | Güncel Veriler ve İstatistikler — CarbonCam",
    metaDescription: "Türkiye'nin karbon emisyonu verileri, sektörel dağılım, kişi başı emisyon ve Paris Anlaşması hedefleri. Güncel istatistikler ve analiz.",
    category: "turkiye",
    categoryLabel: "Türkiye",
    readingTime: 14,
    publishDate: "2026-03-20",
    updatedDate: "2026-07-01",
    excerpt: "Türkiye, dünya genelinde en çok sera gazı salan ülkeler arasında 16. sırada yer alıyor. Enerji, sanayi, ulaşım ve tarım sektörlerindeki emisyon verilerini ve Türkiye'nin iklim hedeflerini inceleyin.",
    heroIcon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm0 0h18",
    heroColor: "#ef4444",
    content: [
      {
        id: "genel-bakis",
        title: "Türkiye Emisyon Genel Bakış",
        content: `<p>Türkiye, yıllık yaklaşık <strong>530 milyon ton CO₂e</strong> sera gazı emisyonu ile dünyada 16. en büyük emisyon kaynağıdır. 1990'dan bu yana emisyonlar %140'ın üzerinde artmıştır.</p>
<p>Temel göstergeler (2025 verisi):</p>
<ul>
<li><strong>Toplam emisyon:</strong> ~530 milyon ton CO₂e/yıl</li>
<li><strong>Kişi başı emisyon:</strong> ~5,5 ton CO₂e/yıl</li>
<li><strong>GDP başına emisyon:</strong> 0,28 kg CO₂e/USD</li>
<li><strong>Dünya emisyonundaki pay:</strong> ~%1,1</li>
</ul>
<p>Türkiye'nin kişi başı emisyonu dünya ortalamasının (4,7 ton) üzerinde, ancak AB ortalamasının (6,8 ton) altındadır.</p>`
      },
      {
        id: "sektorel-dagilim",
        title: "Sektörel Dağılım",
        content: `<p>Türkiye'nin sera gazı emisyonlarının sektörel dağılımı:</p>
<ul>
<li><strong>Enerji sektörü: %72</strong> — Elektrik üretimi, ısınma, ulaşım yakıtları</li>
<li><strong>Sanayi: %13</strong> — Çimento, demir-çelik, kimya</li>
<li><strong>Tarım: %12</strong> — Hayvancılık, gübre, pirinç tarımı</li>
<li><strong>Atık: %3</strong> — Çöp depolama, atık su arıtma</li>
</ul>
<p>Enerji sektörü içinde ise:</p>
<ul>
<li>Elektrik ve ısı üretimi: %42</li>
<li>Ulaşım: %23</li>
<li>Sanayi enerji kullanımı: %20</li>
<li>Konutlar ve binalar: %15</li>
</ul>`
      },
      {
        id: "hedefler",
        title: "Türkiye'nin İklim Hedefleri",
        content: `<p>Türkiye 2021'de Paris İklim Anlaşması'nı onaylamış ve çeşitli hedefler belirlemiştir:</p>
<ul>
<li><strong>2053 Net Sıfır Hedefi:</strong> Türkiye, 2053 yılına kadar net sıfır emisyon hedefi açıklamıştır</li>
<li><strong>NDC (Ulusal Katkı Beyanı):</strong> 2030 hedefi referans senaryoya göre %41 azaltma</li>
<li><strong>Yenilenebilir enerji hedefi:</strong> 2035'e kadar elektrik üretiminde %65 yenilenebilir</li>
<li><strong>Nükleer enerji:</strong> Akkuyu NGS ile 35 milyar kWh/yıl temiz elektrik</li>
</ul>
<p>Bireysel olarak karbon ayak izimizi azaltmak, Türkiye'nin bu hedeflerine ulaşmasına katkıda bulunur. CarbonCam ile bireysel katkınızı ölçebilir ve takip edebilirsiniz.</p>`
      }
    ],
    relatedSlugs: ["paris-iklim-anlasmasi", "karbon-ayak-izi-nedir", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 9. Karbon Ayak İzini Azaltma Yolları ───
  {
    slug: "karbon-ayak-izini-azaltma-yollari",
    title: "Karbon Ayak İzini Azaltmanın 15 Etkili Yolu",
    metaTitle: "Karbon Ayak İzi Azaltma | 15 Etkili Yol — CarbonCam",
    metaDescription: "Bireysel karbon ayak izinizi azaltmanın 15 pratik ve etkili yolu. Enerji, ulaşım, beslenme ve tüketim alışkanlıklarınızı değiştirin.",
    category: "azaltma",
    categoryLabel: "Azaltma Yolları",
    readingTime: 12,
    publishDate: "2026-04-01",
    updatedDate: "2026-08-01",
    excerpt: "Bireysel karbon ayak izinizi azaltmanın 15 somut ve uygulanabilir yolu. Enerji tasarrufu, ulaşım alternatifleri, beslenme değişiklikleri ve bilinçli tüketim ile fark yaratın.",
    heroIcon: "M5 13l4 4L19 7",
    heroColor: "#10b981",
    content: [
      {
        id: "enerji",
        title: "Enerji Tasarrufu (Yıllık ~1.2 ton CO₂e azaltma potansiyeli)",
        content: `<ol>
<li><strong>LED aydınlatmaya geçin:</strong> Tüm ampullerinizi LED ile değiştirmek yılda ~120 kg CO₂e tasarrufu sağlar</li>
<li><strong>Akıllı termostat kullanın:</strong> Programlanabilir termostat ile gereksiz ısıtma/soğutmayı önleyin (%20-30 tasarruf)</li>
<li><strong>Enerji verimli cihazlar:</strong> A+++ sınıfı ev aletleri, eski modellere göre %40-60 daha az enerji tüketir</li>
<li><strong>Stand-by'ı kapatın:</strong> Kullanılmayan elektronik cihazları tamamen kapatın — bekleme modunda bile enerji tüketirler</li>
<li><strong>Doğal ışık ve havalandırma:</strong> Gün ışığından faydalanın, gereksiz yapay aydınlatmadan kaçının</li>
</ol>`
      },
      {
        id: "ulasim",
        title: "Ulaşım Alternatifleri (Yıllık ~1.5 ton CO₂e azaltma potansiyeli)",
        content: `<ol start="6">
<li><strong>Toplu taşıma:</strong> Haftada 3 gün toplu taşıma kullanmak yılda ~800 kg CO₂e tasarrufu sağlar</li>
<li><strong>Bisiklet/yürüyüş:</strong> 5 km altı mesafeler için motorsuz ulaşım tercih edin</li>
<li><strong>Araç paylaşımı (carpooling):</strong> İş arkadaşlarınızla araç paylaşarak emisyonu yarıya indirin</li>
<li><strong>Uzaktan çalışma:</strong> Mümkünse haftada 2-3 gün evden çalışın</li>
<li><strong>Uçuş sayısını azaltın:</strong> Yılda bir tane daha az uzun mesafe uçuş = ~1.5 ton CO₂e tasarruf</li>
</ol>`
      },
      {
        id: "beslenme",
        title: "Beslenme Değişiklikleri (Yıllık ~0.8 ton CO₂e azaltma potansiyeli)",
        content: `<ol start="11">
<li><strong>Et tüketimini azaltın:</strong> Haftada 1-2 gün etsiz beslenme bile yılda ~300 kg CO₂e tasarrufu sağlar</li>
<li><strong>Yerel ve mevsimsel gıdalar:</strong> İthal gıdalar yerine yerel ürünler taşıma emisyonunu azaltır</li>
<li><strong>Gıda israfını önleyin:</strong> Dünyada üretilen gıdanın %30'u israf oluyor — planlı alışveriş yapın</li>
</ol>`
      },
      {
        id: "tuketim",
        title: "Bilinçli Tüketim (Yıllık ~0.5 ton CO₂e azaltma potansiyeli)",
        content: `<ol start="14">
<li><strong>Az ama kaliteli satın alın:</strong> Hızlı moda yerine dayanıklı ürünler tercih edin</li>
<li><strong>İkinci el ve tamir:</strong> Geri dönüşüm, ikinci el alışveriş ve tamir kültürünü benimseyin</li>
</ol>
<p>Bu 15 öneriyi uygulamak yıllık karbon ayak izinizi <strong>4 tona kadar</strong> azaltabilir — bu da bir kişinin ortalama yıllık emisyonunun %70'inden fazlasıdır!</p>
<p>CarbonCam uygulaması ile hangi alışkanlıklarınızı değiştirdiğinizi takip edebilir, ilerlemenizi görevler ve XP ile ölçebilir, dijital ormanınızın büyümesini izleyebilirsiniz. 🌳</p>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izi-nedir", "evde-enerji-verimliligi", "surdurulebilir-beslenme-karbon"]
  },

  // ─── 10. Karbon Nötr Nedir? ───
  {
    slug: "karbon-notr-nedir",
    title: "Karbon Nötr Nedir ve Nasıl Olunur?",
    metaTitle: "Karbon Nötr Nedir? | Net Sıfır Emisyon Rehberi — CarbonCam",
    metaDescription: "Karbon nötr ne demek, net sıfır emisyondan farkı nedir? Bireysel ve kurumsal karbon nötrlük stratejileri ve karbon dengeleme yöntemleri.",
    category: "temel-bilgiler",
    categoryLabel: "Temel Bilgiler",
    readingTime: 10,
    publishDate: "2026-04-15",
    excerpt: "Karbon nötr olmak, ürettiğiniz kadar karbon emisyonunu dengelemek anlamına gelir. Net sıfır ile farkını, bireylerin ve şirketlerin karbon nötr olma yollarını keşfedin.",
    heroIcon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    heroColor: "#059669",
    content: [
      {
        id: "tanim",
        title: "Karbon Nötr ve Net Sıfır Tanımı",
        content: `<p><strong>Karbon nötr (carbon neutral)</strong>: Atmosfere salınan CO₂ emisyonunun, dengeleme (offset) projeleri aracılığıyla telafi edilmesi durumudur. Emisyon azaltımı + dengeleme = sıfır net etki.</p>
<p><strong>Net sıfır (net zero)</strong>: Tüm sera gazlarının (sadece CO₂ değil) hem azaltılması hem de kalan emisyonların kalıcı karbon uzaklaştırma yöntemleriyle dengelenmesidir.</p>
<p>Temel fark: Karbon nötr sadece CO₂'ye odaklanır ve dengeleme ile sağlanabilirken, net sıfır tüm sera gazlarını kapsar ve öncelikle <strong>emisyon azaltımına</strong> dayanır.</p>`
      },
      {
        id: "bireysel-strateji",
        title: "Bireysel Karbon Nötr Olma Stratejisi",
        content: `<p>Karbon nötr olmak için üç adımlı yaklaşım:</p>
<h4>1. Ölçün</h4>
<p>Önce mevcut karbon ayak izinizi doğru şekilde hesaplayın. CarbonCam uygulaması bunu otomatik yapar.</p>
<h4>2. Azaltın</h4>
<p>Mümkün olduğunca emisyonlarınızı azaltın: enerji verimliliği, ulaşım alternatifleri, beslenme değişiklikleri.</p>
<h4>3. Dengeleyin</h4>
<p>Azaltamadığınız emisyonları sertifikalı karbon dengeleme projeleri aracılığıyla telafi edin.</p>
<p>Önemli: Karbon dengeleme, emisyon azaltmanın <strong>yerine geçmez</strong>, tamamlayıcıdır. Önce azaltma, sonra dengeleme prensibi uygulanmalıdır.</p>`
      }
    ],
    relatedSlugs: ["karbon-dengeleme-offset", "karbon-ayak-izi-nedir", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 11. Evde Enerji Verimliliği ───
  {
    slug: "evde-enerji-verimliligi",
    title: "Evde Enerji Verimliliği ve Karbon Azaltma",
    metaTitle: "Evde Enerji Verimliliği | Karbon ve Maliyet Tasarrufu — CarbonCam",
    metaDescription: "Evinizde enerji verimliliğini artırarak hem karbon emisyonunuzu hem de faturalarınızı azaltın. Yalıtım, enerji verimli cihazlar ve akıllı ev çözümleri.",
    category: "azaltma",
    categoryLabel: "Azaltma Yolları",
    readingTime: 11,
    publishDate: "2026-05-01",
    excerpt: "Konutlar, Türkiye'nin toplam enerji tüketiminin %30'undan sorumlu. Basit enerji verimliliği önlemleriyle hem karbon ayak izinizi hem de enerji faturalarınızı azaltabilirsiniz.",
    heroIcon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    heroColor: "#0ea5e9",
    content: [
      {
        id: "yalitim",
        title: "Bina Yalıtımı",
        content: `<p>Bina yalıtımı, enerji verimliliğinin en etkili ve kalıcı yoludur:</p>
<ul>
<li><strong>Dış cephe yalıtımı:</strong> Isı kaybını %40-60 azaltır, yıllık 1.000-2.000 ₺ tasarruf</li>
<li><strong>Çatı yalıtımı:</strong> Isının %25'i çatıdan kaçar, yalıtım ile %90'ı engellenir</li>
<li><strong>Çift/üçlü cam:</strong> Pencerelerden %40-70 daha az ısı kaybı</li>
<li><strong>Zemin yalıtımı:</strong> Isı kaybının %15'ini engeller</li>
</ul>
<p>Tam yalıtımlı bir evde yıllık enerji tasarrufu: <strong>600-1.200 kg CO₂e</strong></p>`
      },
      {
        id: "akilli-ev",
        title: "Akıllı Ev Çözümleri",
        content: `<ul>
<li><strong>Akıllı termostat:</strong> Evin boş olduğu saatlerde ısıtmayı azaltır (%20-30 tasarruf)</li>
<li><strong>Akıllı priz:</strong> Stand-by tüketimini sıfırlar</li>
<li><strong>Hareket sensörlü aydınlatma:</strong> Gereksiz aydınlatmayı önler</li>
<li><strong>Enerji izleme sistemi:</strong> Anlık tüketimi görselleştirir</li>
</ul>
<p>CarbonCam, ev enerji tüketiminizi faturalarınız üzerinden otomatik olarak takip eder ve karbon emisyonunuzu hesaplar. Aylık trendleri görerek hangi dönemlerde daha fazla tükettiğinizi anlayabilirsiniz.</p>`
      }
    ],
    relatedSlugs: ["elektrik-tuketimi-karbon-emisyonu", "dogalgaz-karbon-emisyonu", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 12. Sürdürülebilir Beslenme ───
  {
    slug: "surdurulebilir-beslenme-karbon",
    title: "Sürdürülebilir Beslenme ve Karbon Ayak İzi",
    metaTitle: "Sürdürülebilir Beslenme ve Karbon | Gıda Emisyonları — CarbonCam",
    metaDescription: "Beslenme alışkanlıklarının karbon ayak izi üzerindeki etkisi. Gıda türlerine göre emisyon karşılaştırması ve sürdürülebilir beslenme önerileri.",
    category: "azaltma",
    categoryLabel: "Azaltma Yolları",
    readingTime: 10,
    publishDate: "2026-05-15",
    excerpt: "Gıda sistemi küresel emisyonların %26'sından sorumlu. Beslenme tercihlerinizi küçük değişikliklerle dönüştürerek karbon ayak izinizi önemli ölçüde azaltabilirsiniz.",
    heroIcon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    heroColor: "#84cc16",
    content: [
      {
        id: "gida-emisyonlari",
        title: "Gıda Türlerine Göre Karbon Emisyonu",
        content: `<p>Her gıda türünün farklı bir karbon yoğunluğu vardır (kg CO₂e / kg gıda):</p>
<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#f8fafc">
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Gıda</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">CO₂e/kg</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Karşılaştırma</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🥩 Sığır eti</td><td style="padding:12px;border:1px solid #e2e8f0">27 kg</td><td style="padding:12px;border:1px solid #e2e8f0">En yüksek</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🧀 Peynir</td><td style="padding:12px;border:1px solid #e2e8f0">13,5 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Yüksek</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🐖 Domuz eti</td><td style="padding:12px;border:1px solid #e2e8f0">7,6 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Orta</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🐔 Tavuk</td><td style="padding:12px;border:1px solid #e2e8f0">6,9 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Orta</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🥚 Yumurta</td><td style="padding:12px;border:1px solid #e2e8f0">4,8 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Düşük-Orta</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🍚 Pirinç</td><td style="padding:12px;border:1px solid #e2e8f0">4,0 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Düşük-Orta</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🥦 Sebze</td><td style="padding:12px;border:1px solid #e2e8f0">0,4-2 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Düşük</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🍎 Meyve</td><td style="padding:12px;border:1px solid #e2e8f0">0,3-1 kg</td><td style="padding:12px;border:1px solid #e2e8f0">Çok düşük</td></tr>
</tbody>
</table>
<p>1 kg sığır eti üretmek, ~67 kg sebze üretmekle aynı emisyona neden olur!</p>`
      },
      {
        id: "oneriler",
        title: "Sürdürülebilir Beslenme Önerileri",
        content: `<ul>
<li><strong>Flexitarian diyet:</strong> Haftada 2-3 gün tamamen bitkisel beslenin</li>
<li><strong>Kırmızı eti azaltın:</strong> Sığır eti yerine tavuk veya balık tercih edin</li>
<li><strong>Yerel ve mevsimlik ürünler:</strong> Sera ve ithalat emisyonunu azaltır</li>
<li><strong>Gıda israfını önleyin:</strong> Planlı alışveriş, doğru saklama, artıkları değerlendirme</li>
<li><strong>Su tüketimine dikkat:</strong> Şişe su yerine filtreli musluk suyu kullanın</li>
</ul>
<p>CarbonCam'in yemek takibi özelliği ile günlük beslenmenizin karbon etkisini fotoğrafla analiz edebilir ve daha sürdürülebilir alternatifleri keşfedebilirsiniz. 🍽️</p>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izini-azaltma-yollari", "karbon-ayak-izi-nedir", "bireysel-karbon-ayak-izi-hesaplama"]
  },

  // ─── 13. Karbon Dengeleme (Offset) ───
  {
    slug: "karbon-dengeleme-offset",
    title: "Karbon Dengeleme (Offset) Nedir?",
    metaTitle: "Karbon Dengeleme Nedir? | Offset Projeleri Rehberi — CarbonCam",
    metaDescription: "Karbon dengeleme (carbon offset) nedir, nasıl çalışır? Gönüllü karbon piyasası, sertifika standartları ve güvenilir dengeleme projeleri.",
    category: "temel-bilgiler",
    categoryLabel: "Temel Bilgiler",
    readingTime: 11,
    publishDate: "2026-06-01",
    excerpt: "Karbon dengeleme, azaltamadığınız emisyonları başka projelere yatırım yaparak telafi etmenizi sağlar. Gönüllü karbon piyasasını ve güvenilir projelerin nasıl seçileceğini öğrenin.",
    heroIcon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    heroColor: "#14b8a6",
    content: [
      {
        id: "offset-nasil-calisir",
        title: "Karbon Dengeleme Nasıl Çalışır?",
        content: `<p>Karbon dengeleme, bir yerde üretilen sera gazı emisyonunun, başka bir yerdeki emisyon azaltma veya karbon uzaklaştırma projelerine finansman sağlayarak telafi edilmesidir.</p>
<p>Yaygın dengeleme proje türleri:</p>
<ul>
<li><strong>Ağaçlandırma ve orman koruma:</strong> Ağaçlar CO₂'yi absorbe eder (~22 kg CO₂/ağaç/yıl)</li>
<li><strong>Yenilenebilir enerji:</strong> Gelişmekte olan ülkelerde rüzgar/güneş projeleri</li>
<li><strong>Metan yakalama:</strong> Çöp depolama alanlarından metan gazı toplama</li>
<li><strong>Temiz pişirme:</strong> Gelişmekte olan ülkelerde verimli ocak dağıtımı</li>
<li><strong>Doğrudan hava yakalama (DAC):</strong> Atmosferden CO₂ yakalama teknolojisi</li>
</ul>`
      },
      {
        id: "standartlar",
        title: "Güvenilir Sertifika Standartları",
        content: `<p>Kaliteli karbon kredisi satın almak için şu standartlara sahip projeleri tercih edin:</p>
<ul>
<li><strong>Gold Standard:</strong> WWF tarafından desteklenen, en katı standart</li>
<li><strong>Verra (VCS):</strong> En yaygın gönüllü karbon standardı</li>
<li><strong>American Carbon Registry (ACR)</strong></li>
<li><strong>Climate Action Reserve (CAR)</strong></li>
</ul>
<p>Dikkat edilecek kriterler: Ek olma (additionality), kalıcılık, sızıntı önleme, bağımsız doğrulama.</p>
<p>CarbonCam uygulaması, karbon ayak izinizi hesapladıktan sonra güvenilir dengeleme seçeneklerini size sunar.</p>`
      }
    ],
    relatedSlugs: ["karbon-notr-nedir", "karbon-ayak-izi-nedir", "karbon-ayak-izini-azaltma-yollari"]
  },

  // ─── 14. Paris İklim Anlaşması ───
  {
    slug: "paris-iklim-anlasmasi",
    title: "Paris İklim Anlaşması ve Türkiye",
    metaTitle: "Paris İklim Anlaşması ve Türkiye | Hedefler ve Yükümlülükler — CarbonCam",
    metaDescription: "Paris İklim Anlaşması nedir, Türkiye'nin yükümlülükleri ve hedefleri nelerdir? 1.5°C hedefi, NDC ve iklim finansmanı hakkında bilgi edinin.",
    category: "turkiye",
    categoryLabel: "Türkiye",
    readingTime: 12,
    publishDate: "2026-06-15",
    excerpt: "2015'te imzalanan Paris İklim Anlaşması, küresel sıcaklık artışını 1,5°C ile sınırlamayı hedefler. Türkiye'nin 2021'de onayladığı anlaşmadaki yükümlülüklerini ve hedeflerini inceleyin.",
    heroIcon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    heroColor: "#2563eb",
    content: [
      {
        id: "anlasma-nedir",
        title: "Paris Anlaşması Nedir?",
        content: `<p><strong>Paris İklim Anlaşması</strong>, 12 Aralık 2015'te 196 ülke tarafından Birleşmiş Milletler İklim Değişikliği Çerçeve Sözleşmesi (UNFCCC) kapsamında kabul edilmiştir.</p>
<p>Ana hedefler:</p>
<ul>
<li>Küresel ortalama sıcaklık artışını sanayi öncesi döneme göre <strong>2°C'nin altında</strong> tutmak</li>
<li>Mümkünse <strong>1,5°C ile sınırlamak</strong> için çaba göstermek</li>
<li>İklim değişikliğine uyum kapasitesini artırmak</li>
<li>Finansman akışlarını düşük karbon ekonomisine yönlendirmek</li>
</ul>
<p>Her ülke kendi Ulusal Katkı Beyanı (NDC) ile emisyon azaltma hedeflerini belirler ve her 5 yılda günceller.</p>`
      },
      {
        id: "turkiye-ve-paris",
        title: "Türkiye'nin Paris Anlaşması'ndaki Konumu",
        content: `<p>Türkiye, Paris Anlaşması'nı 22 Nisan 2016'da imzalamış ve 6 Ekim 2021'de TBMM'de onaylamıştır. Önemli noktalar:</p>
<ul>
<li><strong>NDC hedefi:</strong> 2030'da referans senaryoya göre %41 emisyon azaltma</li>
<li><strong>Net sıfır hedefi:</strong> 2053 yılına kadar</li>
<li><strong>Yeşil kalkınma:</strong> 2023'te Yeşil Mutabakat Eylem Planı açıklandı</li>
<li><strong>Emisyon Ticaret Sistemi:</strong> Türkiye ETS'nin kurulması planlanmakta</li>
</ul>
<p>Her bireyin bu hedefe katkıda bulunması önemlidir. CarbonCam ile kendi karbon ayak izinizi azaltarak Türkiye'nin iklim hedeflerine destek olabilirsiniz.</p>`
      }
    ],
    relatedSlugs: ["turkiyede-karbon-emisyonu", "karbon-notr-nedir", "scope-1-scope-2-scope-3-nedir"]
  },

  // ─── 15. Bireysel Karbon Ayak İzi Hesaplama Rehberi ───
  {
    slug: "bireysel-karbon-ayak-izi-hesaplama",
    title: "Bireysel Karbon Ayak İzi Hesaplama Rehberi",
    metaTitle: "Bireysel Karbon Ayak İzi Hesaplama | Detaylı Rehber — CarbonCam",
    metaDescription: "Kendi karbon ayak izinizi adım adım hesaplayın. Ev, ulaşım, beslenme ve tüketim kategorilerinde detaylı hesaplama rehberi ve CarbonCam ile kolay takip.",
    category: "hesaplama",
    categoryLabel: "Hesaplama",
    readingTime: 14,
    publishDate: "2026-07-01",
    updatedDate: "2026-08-01",
    excerpt: "Bireysel karbon ayak izinizi ev, ulaşım, beslenme ve tüketim kategorilerinde detaylı olarak nasıl hesaplayacağınızı adım adım öğrenin.",
    heroIcon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    heroColor: "#a855f7",
    content: [
      {
        id: "ortalamalar",
        title: "Türkiye Ortalamaları",
        content: `<p>Hesaplamanıza başlamadan önce Türkiye ortalamalarını bilin:</p>
<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#f8fafc">
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Kategori</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Yıllık Ortalama</th>
<th style="padding:12px;text-align:left;border:1px solid #e2e8f0;font-weight:600">Pay</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🏠 Ev Enerjisi</td><td style="padding:12px;border:1px solid #e2e8f0">2,1 ton CO₂e</td><td style="padding:12px;border:1px solid #e2e8f0">%38</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🚗 Ulaşım</td><td style="padding:12px;border:1px solid #e2e8f0">1,6 ton CO₂e</td><td style="padding:12px;border:1px solid #e2e8f0">%29</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🍽️ Beslenme</td><td style="padding:12px;border:1px solid #e2e8f0">1,2 ton CO₂e</td><td style="padding:12px;border:1px solid #e2e8f0">%22</td></tr>
<tr><td style="padding:12px;border:1px solid #e2e8f0">🛒 Tüketim</td><td style="padding:12px;border:1px solid #e2e8f0">0,6 ton CO₂e</td><td style="padding:12px;border:1px solid #e2e8f0">%11</td></tr>
<tr style="background:#f0fdf4;font-weight:600"><td style="padding:12px;border:1px solid #e2e8f0">Toplam</td><td style="padding:12px;border:1px solid #e2e8f0">5,5 ton CO₂e</td><td style="padding:12px;border:1px solid #e2e8f0">%100</td></tr>
</tbody>
</table>`
      },
      {
        id: "carboncan-ile-hesaplama",
        title: "CarbonCam ile Kolay Hesaplama",
        content: `<p>Manuel hesaplama yerine CarbonCam uygulamasını kullanarak karbon ayak izinizi çok daha kolay ve doğru hesaplayabilirsiniz:</p>
<ul>
<li><strong>📸 Fotoğrafla Analiz:</strong> Faturalarınızı, market alışverişinizi, yemeklerinizi fotoğrafla taratın</li>
<li><strong>📊 Otomatik Kategorizasyon:</strong> Emisyonlar Ev, Ulaşım, Yemek ve Alışveriş olarak otomatik sınıflandırılır</li>
<li><strong>📈 Trend Analizi:</strong> Haftalık, aylık ve yıllık trendlerinizi takip edin</li>
<li><strong>🎯 Hedef Belirleme:</strong> Aylık karbon hedefi koyun ve ilerlemenizi izleyin</li>
<li><strong>🌳 Dijital Orman:</strong> Azalttığınız her kg CO₂e için dijital ormanınız büyür</li>
<li><strong>🏆 Gamification:</strong> XP kazanın, görevleri tamamlayın ve seviye atlayın</li>
</ul>
<p>CarbonCam'i ücretsiz indirin ve karbon ayak izinizi bugün takip etmeye başlayın!</p>`
      }
    ],
    relatedSlugs: ["karbon-ayak-izi-nasil-hesaplanir", "karbon-ayak-izi-nedir", "karbon-ayak-izini-azaltma-yollari"]
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter(a => a.category === category);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map(slug => articles.find(a => a.slug === slug))
    .filter(Boolean) as Article[];
}
