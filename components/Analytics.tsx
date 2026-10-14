import Script from "next/script";

// Google Ads / GA4 tag. Set NEXT_PUBLIC_GADS_ID (e.g. AW-XXXXXXXXX) to enable.
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GADS_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
