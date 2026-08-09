import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled =
    typeof publishableKey === "string" &&
    publishableKey.startsWith("pk_") &&
    publishableKey.length >= 20 &&
    !publishableKey.includes("XXXX") &&
    !publishableKey.includes("xxxxxxxx");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4">
      <div className="w-full">
        {clerkEnabled ? (
          children
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl border border-white/20 bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h1 className="mt-5 text-2xl font-bold text-slate-900">Giriş servisi yapılandırılmadı</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              CarbonCAM kimlik doğrulama anahtarları bu ortamda tanımlı değil. Üretim ortamında
              Clerk anahtarları eklendiğinde giriş ve kayıt ekranı otomatik olarak etkinleşir.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Ana sayfaya dön
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
