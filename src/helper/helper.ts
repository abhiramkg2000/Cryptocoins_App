import {
  CryptoCurrencyDataType,
  CryptoInfoTableType,
  WatchlistCryptoCurrencyType,
} from "../types/common.types";

export const formatCoinData = (
  coinData: CryptoCurrencyDataType
): CryptoInfoTableType => {
  const localDate = new Date(coinData.last_updated!);
  const formattedDate = localDate.toLocaleString();

  return [
    { field: "Name", value: `${coinData.name}` },
    { field: "Symbol", value: `${coinData.symbol}` },
    { field: "Id", value: `${coinData.id}` },
    { field: "Current Price", value: `$${coinData.current_price?.toFixed(2)}` },
    { field: "Market Cap Rank", value: `${coinData.market_cap_rank}` },
    { field: "Market Cap", value: `${coinData.market_cap}` },
    { field: "Total Volume", value: `${coinData.total_volume}` },
    {
      field: "Price Change 24h",
      value: `$${coinData.price_change_24h?.toFixed(2)}`,
    },
    {
      field: "Price Change Percentage 24h",
      value: `${coinData.price_change_percentage_24h?.toFixed(2)}%`,
    },
    {
      field: "Circulating Supply",
      value: `${coinData.circulating_supply?.toFixed(2)}`,
    },
    { field: "Total Supply", value: `${coinData.total_supply?.toFixed(2)}` },
    { field: "Last Updated", value: `${formattedDate}` },
  ];
};

export const getLastDays = (days: number) => {
  let dates = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i
    );
    const formatedDate = date.toLocaleDateString().slice(0, 10);
    dates.push(formatedDate);
  }
  return dates;
};

export const formatCoinPrices = (prices: number[][]) => {
  return prices?.map((item) => item[1]);
};

export const getBookmark = (
  watchlistCoins: WatchlistCryptoCurrencyType[],
  coinId: string
) => {
  const getCoin = watchlistCoins.find((coin) => coin.id === coinId);
  if (getCoin) {
    return getCoin.bookmark;
  } else {
    return false;
  }
};
