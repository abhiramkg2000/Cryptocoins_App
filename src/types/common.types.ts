export type RoiType = {
  currency?: string | null;
  percentage?: number | null;
  times?: number | null;
};

export type CryptoCurrencyDataType = {
  ath?: number | null;
  ath_change_percentage?: number | null;
  ath_date?: string | null;
  atl?: number | null;
  atl_change_percentage?: number | null;
  atl_date?: string | null;
  circulating_supply?: number | null;
  current_price?: number | null;
  fully_diluted_valuation?: number | null;
  high_24h?: number | null;
  id?: string | null;
  image?: string | null;
  last_updated?: string | null;
  low_24h?: number | null;
  market_cap?: number | null;
  market_cap_change_24h?: number | null;
  market_cap_change_percentage_24h?: number | null;
  market_cap_rank?: number | null;
  max_supply?: number | null;
  name?: string | null;
  price_change_24h?: number | null;
  price_change_percentage_24h?: number | null;
  roi?: RoiType | null;
  symbol?: string | null;
  total_supply?: number | null;
  total_volume?: number | null;
};

export type CryptoCurrencyListType = CryptoCurrencyDataType[];

export type CryptoCurrencyChartInfoType = {
  market_caps?: number[][] | null;
  prices?: number[][] | null;
  total_volumes?: number[][] | null;
};

export type CryptoInfoType = {
  field: string;
  value: string;
};

export type CryptoInfoTableType = CryptoInfoType[];
