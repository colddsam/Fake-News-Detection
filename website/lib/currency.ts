export const getUserCurrencyInfo = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return {
        country: data.country_name,
        currency: data.currency,
        currencySymbol: getCurrencySymbol(data.currency),
      };
    } catch (e) {
      return { country: "India", currency: "INR", currencySymbol: "₹" }; // default fallback
    }
  };
  
  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      AUD: "A$",
    };
    return symbols[currency] || currency;
  };
  