export const dynamic = "force-static";

const APP_ADS_CONTENT = `google.com, pub-4762071706286282, DIRECT, f08c47fec0942fa0\n`;

export async function GET() {
  return new Response(APP_ADS_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
