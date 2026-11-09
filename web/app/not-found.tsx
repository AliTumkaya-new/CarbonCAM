import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-6xl font-black text-emerald-600 mb-4">404</span>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sayfa Bulunamadı / Page Not Found</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-sm"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
