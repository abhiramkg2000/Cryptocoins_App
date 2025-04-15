import { useState, useEffect } from "react";
import axios from "axios";

import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import TrendingListTable from "../../components/trendingListTable/trendingListTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";
import Loader from "../../components/loader/loader";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import {
  trendingCoinSearch,
  updateTrendingCryptoList,
  updateTrendingPage,
} from "../../state/slice/trendingListSlice";
import { updateTopNavigation } from "../../state/slice/topNavigationSlice";

import "./trendingListPage.scss";

export default function TrendingListPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const coins = useAppSelector((state) => state.trendingPage.list);
  const searchCoin = useAppSelector((state) => state.trendingPage.searchCoin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateTopNavigation("trending"));
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/search/trending`)
      .then((res) => {
        dispatch(updateTrendingCryptoList(res.data.coins));
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
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(trendingCoinSearch(e.target.value));
    dispatch(updateTrendingPage(1));
  };

  const handleSearchClear = () => {
    dispatch(trendingCoinSearch(""));
  };

  const filteredCoins = coins.filter((coin) => {
    if (coin.item?.name) {
      return coin.item.name.toLowerCase().includes(searchCoin.toLowerCase());
    } else {
      return coin;
    }
  });

  return (
    <div className="trending-crypto-container">
      {!loading ? (
        <>
          {coins?.length && !error ? (
            <>
              <div className="trending-search-container">
                <InputBase
                  autoFocus
                  type="text"
                  value={searchCoin}
                  placeholder="Search a crypto"
                  className="trending-search-coin"
                  onChange={handleSearch}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearchClear}
                        sx={{ color: "#44475b" }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="trending-crypto-list-container">
                <TrendingListTable coinsData={filteredCoins} />
              </div>
            </>
          ) : (
            <NoDataToDisplay
              text={"Crypto List is unavailable"}
              absolute={true}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
