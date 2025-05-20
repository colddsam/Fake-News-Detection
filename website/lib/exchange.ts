export const convertCurrency = async (amount: number, from: string, to: string): Promise<number> => {
    try {
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      return Math.round(amount * (data.rates[to] || 1));
    } catch (e) {
      return amount;
    }
  };
  