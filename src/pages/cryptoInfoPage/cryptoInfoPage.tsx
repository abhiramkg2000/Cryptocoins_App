import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import Chart from "../../components/chart/chart";
import CryptoInfoTable from "../../components/tables/cryptoInfoTable/cryptoInfoTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";
import Loader from "../../components/loader/loader";
import SnackBar from "../../components/snackbar/snackbar";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import {
  addToWatchlist,
  deleteFromWatchlist,
} from "../../state/slice/watchlistSlice";

import {
  getLastDays,
  formatCoinPrices,
  getBookmark,
} from "../../helper/helper";

import { CryptoCurrencyChartInfoType } from "../../types/common.types";

import "./cryptoInfoPage.scss";

export default function CryptoInfoPage() {
  const [coinChartInfo, setCoinChartInfo] =
    useState<CryptoCurrencyChartInfoType>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dateRange, setDateRange] = useState(7);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const watchlistCoins = useAppSelector((state) => state.watchlistPage.list);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const coinData = location.state || {};
  const coinId = coinData.id ? coinData.id : "";

  const [bookmark, setBookmark] = useState(() =>
    getBookmark(watchlistCoins, coinId)
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&precision=2&days=${dateRange}&interval=daily`
      )
      .then((res) => {
        setCoinChartInfo(res.data);
        // console.log(res.data);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [coinId, dateRange]);

  let formatedCoinPrices = formatCoinPrices(coinChartInfo?.prices!);
  const dates = getLastDays(formatedCoinPrices?.length);

  const handleDateRangeClick = (date: number) => {
    setDateRange(date);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <nav className="navigation">
        <Button
          className="back-button"
          disableRipple={true}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </nav>
      <div className="crypto-info-container">
        {!loading ? (
          <>
            {formatedCoinPrices?.length && !error ? (
              <>
                <div className="chart-container">
                  <div className="chart-title">
                    {bookmark ? (
                      <BookmarkIcon
                        sx={{ fontSize: "2.5rem", cursor: "pointer" }}
                        onClick={() => {
                          setBookmark(false);
                          dispatch(deleteFromWatchlist(coinData));
                          setSnackbarMessage(
                            `${coinData.name} removed from watchlist`
                          );
                          setSnackbarOpen(true);
                        }}
                      />
                    ) : (
                      <BookmarkBorderIcon
                        sx={{ fontSize: "2.5rem", cursor: "pointer" }}
                        onClick={() => {
                          setBookmark(true);
                          dispatch(
                            addToWatchlist({
                              coinData: coinData,
                              bookmark: true,
                            })
                          );
                          setSnackbarMessage(
                            `${coinData.name} added to watchlist`
                          );
                          setSnackbarOpen(true);
                        }}
                      />
                    )}
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
              </>
            ) : (
              <NoDataToDisplay text={"Crypto Price Chart is unavailable"} />
            )}
            {Object.keys(coinData).length ? (
              <div className="coin-info-container">
                <CryptoInfoTable coinData={coinData} />
              </div>
            ) : (
              <NoDataToDisplay text={"Crypto Info is unavailable"} />
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <SnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
      />
    </>
  );
}
