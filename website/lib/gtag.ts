
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID! || "";

export const pageview = (url: string) => {
  if (!GA_TRACKING_ID || typeof window === "undefined") return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
