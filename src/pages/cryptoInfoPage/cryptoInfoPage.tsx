import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

import Chart from "../../components/chart/chart";
import CryptoInfoTable from "../../components/cryptoInfoTable/cryptoInfoTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";

import { CryptoCurrencyChartInfoType } from "../../types/common.types";
import { getLastSevenDays, formatCoinPrices } from "../../helper/helper";

import "./cryptoInfoPage.scss";

export default function CryptoInfoPage() {
  const [coinChartInfo, setCoinChartInfo] =
    useState<CryptoCurrencyChartInfoType>({});
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const coinData = location.state || {};
  const coinId = coinData.id ? coinData.id : "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=7&interval=daily`
      )
      .then((res) => {
        setCoinChartInfo(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [coinId]);

  const dates = getLastSevenDays();

  let formatedCoinPrices = formatCoinPrices(coinChartInfo?.prices!);

  return (
    <>
      <nav>
        <ul>
          <li className="home_link">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <div className="crypto_info_container">
        {!loading ? (
          <>
            {formatedCoinPrices?.length ? (
              <div className="chart_container">
                <h1>Price change</h1>
                <Chart dates={dates} prices={formatedCoinPrices!} />
              </div>
            ) : (
              <NoDataToDisplay text={"Crypto Price Chart is unavailable"} />
            )}
            {Object.keys(coinData).length ? (
              <div className="coin_info_container">
                <CryptoInfoTable coinData={coinData} />
              </div>
            ) : (
              <NoDataToDisplay text={"Crypto Info is unavailable"} />
            )}
          </>
        ) : (
          <div className="loader">
            <ScaleLoader loading color="#44475b" />
          </div>
        )}
      </div>
    </>
  );
}
