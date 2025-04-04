import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

import Button from "@mui/material/Button";

import Chart from "../../components/chart/chart";
import CryptoInfoTable from "../../components/cryptoInfoTable/cryptoInfoTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";

import { getLastDays, formatCoinPrices } from "../../helper/helper";
import { CryptoCurrencyChartInfoType } from "../../types/common.types";

import "./cryptoInfoPage.scss";

export default function CryptoInfoPage() {
  const [coinChartInfo, setCoinChartInfo] =
    useState<CryptoCurrencyChartInfoType>({});
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(7);

  const location = useLocation();

  const coinData = location.state || {};
  const coinId = coinData.id ? coinData.id : "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&precision=2&days=${dateRange}&interval=daily`
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
  }, [coinId, dateRange]);

  const dates = getLastDays(dateRange);

  let formatedCoinPrices = formatCoinPrices(coinChartInfo?.prices!);

  const handleDateRangeClick = (date: number) => {
    setDateRange(date);
  };

  return (
    <>
      <nav className="top-navigation">
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <div className="crypto-info-container">
        {!loading ? (
          <>
            {formatedCoinPrices?.length ? (
              <div className="chart-container">
                <div className="chart-title">
                  <h1>{coinData.name}</h1>
                  <img
                    src={coinData.image}
                    height={"40px"}
                    width={"40px"}
                    alt="Crypto image"
                  />
                </div>
                <Chart dates={dates} prices={formatedCoinPrices!} />
              </div>
            ) : (
              <NoDataToDisplay text={"Crypto Price Chart is unavailable"} />
            )}
            <div className="coin-date-range-container">
              <Button
                className={`coin-date-range-button ${
                  dateRange === 7 ? "active" : ""
                }`}
                disableRipple={true}
                onClick={() => handleDateRangeClick(7)}
              >
                1W
              </Button>
              <Button
                className={`coin-date-range-button ${
                  dateRange === 30 ? "active" : ""
                }`}
                disableRipple={true}
                onClick={() => handleDateRangeClick(30)}
              >
                1M
              </Button>
              <Button
                className={`coin-date-range-button ${
                  dateRange === 365 ? "active" : ""
                }`}
                disableRipple={true}
                onClick={() => handleDateRangeClick(365)}
              >
                1Y
              </Button>
            </div>
            {Object.keys(coinData).length ? (
              <div className="coin-info-container">
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
