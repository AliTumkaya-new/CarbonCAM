"use client";

import { useState } from "react";
import Link from "next/link";

// Icons
const CodeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const CopyIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const BoltIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
  </svg>
);

const KeyIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-900">
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">{title}</span>
          <span className="text-xs text-gray-500">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm text-gray-100">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          title="Kopyala"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("quickstart");

  const sections = [
    { id: "quickstart", label: "Hızlı Başlangıç", icon: <BoltIcon /> },
    { id: "authentication", label: "Kimlik Doğrulama", icon: <KeyIcon /> },
    { id: "calculate", label: "Karbon Hesaplama", icon: <LeafIcon /> },
    { id: "analyze", label: "AI Görüntü Analizi", icon: <CodeIcon /> },
    { id: "errors", label: "Hata Kodları", icon: <ShieldIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-emerald-100 text-sm font-medium mb-6">
              <CodeIcon />
              <span>API Documentation v2.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CarbonCAM API
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
              Karbon ayak izi hesaplama ve AI destekli makine analizi için güçlü REST API
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                API Anahtarı Al
                <ChevronRightIcon />
              </Link>
              <a
                href="#quickstart"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Hızlı Başlangıç
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {section.icon}
                    {section.label}
                  </a>
                ))}
              </nav>

              {/* Base URL Card */}
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Base URL
                </p>
                <code className="text-sm text-emerald-600 dark:text-emerald-400 font-mono">
                  https://carboncam.com.tr/api
                </code>
              </div>
            </div>
          </div>

          {/* Documentation Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Quick Start */}
            <section id="quickstart" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Hızlı Başlangıç
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                CarbonCAM API ile karbon ayak izi hesaplamalarına hemen başlayın. 
                Aşağıdaki adımları takip ederek ilk API çağrınızı yapabilirsiniz.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      API Anahtarı Alın
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Dashboard&apos;dan API anahtarınızı oluşturun. Her istek için bu anahtar gereklidir.
                    </p>
                    <Link
                      href="/dashboard?tab=api"
                      className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                    >
                      API Anahtarı Oluştur
                      <ChevronRightIcon />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      İlk İsteğinizi Yapın
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      cURL veya tercih ettiğiniz HTTP client ile basit bir hesaplama yapın.
                    </p>
                    <CodeBlock
                      title="Örnek İstek"
                      language="bash"
                      code={`curl -X POST https://carboncam.com.tr/api/calculate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "machine_type": "CNC Freze",
    "power_kw": 15,
    "process_time_minutes": 60,
    "material": "Çelik",
    "weight_kg": 10
  }'`}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Yanıtı İşleyin
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      API, hesaplanan karbon emisyonu ve enerji tüketimi bilgilerini JSON formatında döndürür.
                    </p>
                    <CodeBlock
                      title="Örnek Yanıt"
                      language="json"
                      code={`{
  "success": true,
  "data": {
    "total_energy_kwh": 15.0,
    "total_carbon_kg": 5.85,
    "carbon_intensity": 0.39,
    "breakdown": {
      "machining_energy": 12.5,
      "idle_energy": 2.5,
      "material_factor": 1.2
    }
  }
}`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Kimlik Doğrulama
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                CarbonCAM API, Bearer token authentication kullanır. Her istekte API anahtarınızı 
                Authorization header&apos;ında göndermeniz gerekmektedir.
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300">Güvenlik Uyarısı</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      API anahtarınızı asla client-side kodda veya public repository&apos;lerde paylaşmayın. 
                      Sunucu tarafında güvenli bir şekilde saklayın.
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock
                title="Authorization Header"
                language="http"
                code={`Authorization: Bearer cc_live_xxxxxxxxxxxxxxxxxxxx`}
              />

              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Test Anahtarları</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-emerald-600 dark:text-emerald-400">cc_test_</code> ile başlar. 
                    Geliştirme ortamında kullanılır.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Canlı Anahtarlar</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-emerald-600 dark:text-emerald-400">cc_live_</code> ile başlar. 
                    Production ortamında kullanılır.
                  </p>
                </div>
              </div>
            </section>

            {/* Calculate Endpoint */}
            <section id="calculate" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Karbon Hesaplama
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Makine işleme süreçleri için karbon ayak izi hesaplaması yapın.
              </p>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-lg font-mono text-sm">
                  <span className="font-bold">POST</span>
                  <span>/api/calculate</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">İstek Parametreleri</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Parametre</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Tip</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Zorunlu</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Açıklama</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">machine_type</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                      <td className="py-3 px-4"><span className="text-emerald-600">✓</span></td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Makine türü (CNC Freze, Torna, vb.)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">power_kw</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">number</td>
                      <td className="py-3 px-4"><span className="text-emerald-600">✓</span></td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Makine gücü (kW)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">process_time_minutes</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">number</td>
                      <td className="py-3 px-4"><span className="text-emerald-600">✓</span></td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">İşlem süresi (dakika)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">material</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                      <td className="py-3 px-4"><span className="text-gray-400">-</span></td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">İşlenen malzeme</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">weight_kg</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">number</td>
                      <td className="py-3 px-4"><span className="text-gray-400">-</span></td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Malzeme ağırlığı (kg)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <CodeBlock
                title="Örnek İstek"
                language="javascript"
                code={`const response = await fetch('https://carboncam.com.tr/api/calculate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    machine_type: 'CNC Freze',
    power_kw: 15,
    process_time_minutes: 60,
    material: 'Çelik',
    weight_kg: 10
  })
});

const data = await response.json();
console.log(data);`}
              />
            </section>

            {/* AI Image Analysis */}
            <section id="analyze" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                AI Görüntü Analizi
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Makine fotoğraflarını AI ile analiz ederek otomatik tanıma ve parametre tahmini yapın.
              </p>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg font-mono text-sm">
                  <span className="font-bold">POST</span>
                  <span>/api/analyze-image</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">AI Destekli</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Bu endpoint Google Gemini AI kullanarak makine fotoğraflarını analiz eder. 
                      200+ marka ve 30+ makine kategorisi tanıyabilir.
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock
                title="Örnek İstek (Base64)"
                language="javascript"
                code={`const response = await fetch('https://carboncam.com.tr/api/analyze-image', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
    analyze_type: 'machine'
  })
});

const result = await response.json();
// {
//   machine_type: "CNC Milling Machine",
//   brand: "DMG MORI",
//   model: "DMU 50",
//   estimated_power_kw: 25,
//   confidence: 0.92
// }`}
              />
            </section>

            {/* Error Codes */}
            <section id="errors" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Hata Kodları
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                API standart HTTP durum kodları kullanır. Aşağıda sık karşılaşılan hatalar listelenmiştir.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded font-mono text-sm font-bold">400</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Bad Request</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">İstek parametreleri geçersiz veya eksik.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded font-mono text-sm font-bold">401</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Unauthorized</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">API anahtarı eksik veya geçersiz.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded font-mono text-sm font-bold">403</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Forbidden</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bu kaynağa erişim izniniz yok.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 rounded font-mono text-sm font-bold">429</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Rate Limited</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Çok fazla istek gönderildi. Lütfen bekleyin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded font-mono text-sm font-bold">500</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Internal Server Error</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sunucu hatası. Lütfen daha sonra tekrar deneyin.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <CodeBlock
                  title="Hata Yanıt Formatı"
                  language="json"
                  code={`{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "power_kw must be a positive number",
    "details": {
      "field": "power_kw",
      "received": -5
    }
  }
}`}
                />
              </div>
            </section>

            {/* SDK Section */}
            <section className="scroll-mt-24">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">SDK & Kütüphaneler</h2>
                <p className="text-emerald-100 mb-6">
                  Popüler programlama dilleri için resmi SDK&apos;larımız yakında yayınlanacak.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">🟨</span>
                    <span className="font-medium">JavaScript</span>
                    <span className="block text-xs text-emerald-200 mt-1">Yakında</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">🐍</span>
                    <span className="font-medium">Python</span>
                    <span className="block text-xs text-emerald-200 mt-1">Yakında</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <span className="text-2xl mb-2 block">🔷</span>
                    <span className="font-medium">Go</span>
                    <span className="block text-xs text-emerald-200 mt-1">Yakında</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Need Help */}
            <section className="scroll-mt-24">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Yardıma mı ihtiyacınız var?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Sorularınız için destek ekibimizle iletişime geçebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/help"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Yardım Merkezi
                  </Link>
                  <a
                    href="mailto:support@carboncam.com.tr"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    E-posta Gönder
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
