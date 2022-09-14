export const endpoints = {
  coins: `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false`,
  coinMarketChart: (coinId: string) => `/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
  exchanges: "",
};