// Crypto List table types
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

// Crypto Chart and Info table types
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

// Trending Crypto List table types
export type PriceChangePercentage24h = {
  aed?: number | null;
  ars?: number | null;
  aud?: number | null;
  bch?: number | null;
  bdt?: number | null;
  bhd?: number | null;
  bmd?: number | null;
  bnb?: number | null;
  brl?: number | null;
  btc?: number | null;
  cad?: number | null;
  chf?: number | null;
  clp?: number | null;
  cny?: number | null;
  czk?: number | null;
  dkk?: number | null;
  dot?: number | null;
  eos?: number | null;
  eth?: number | null;
  eur?: number | null;
  gbp?: number | null;
  gel?: number | null;
  hkd?: number | null;
  huf?: number | null;
  idr?: number | null;
  ils?: number | null;
  inr?: number | null;
  jpy?: number | null;
  krw?: number | null;
  kwd?: number | null;
  lkr?: number | null;
  ltc?: number | null;
  mmk?: number | null;
  mxn?: number | null;
  myr?: number | null;
  ngn?: number | null;
  nok?: number | null;
  nzd?: number | null;
  php?: number | null;
  pkr?: number | null;
  pln?: number | null;
  rub?: number | null;
  sar?: number | null;
  sek?: number | null;
  sgd?: number | null;
  thb?: number | null;
  try?: number | null;
  twd?: number | null;
  uah?: number | null;
  usd?: number | null;
  vef?: number | null;
  vnd?: number | null;
  xag?: number | null;
  xau?: number | null;
  xdr?: number | null;
  xlm?: number | null;
  xrp?: number | null;
  yfi?: number | null;
  zar?: number | null;
  bits?: number | null;
  link?: number | null;
  sats?: number | null;
};

export type TrendingCoinData = {
  price?: number | null;
  price_btc?: string | null;
  price_change_percentage_24h?: PriceChangePercentage24h | null;
  market_cap?: string | null;
  market_cap_btc?: string | null;
  total_volume?: string | null;
  total_volume_btc?: string | null;
  sparkline?: string | null;
  content?: string | null;
};

export type TrendingCoin = {
  id?: string | null;
  coin_id?: number | null;
  name?: string | null;
  symbol?: string | null;
  market_cap_rank?: number | null;
  thumb?: string | null;
  small?: string | null;
  large?: string | null;
  slug?: string | null;
  price_btc?: number | null;
  score?: number | null;
  data?: TrendingCoinData | null;
};

export type TrendingCoinResponse = {
  item: TrendingCoin | null;
};

export type TrendingCoinList = TrendingCoinResponse[];
