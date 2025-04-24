import { useState, useEffect } from "react";
import axios from "axios";

import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import SortModal from "../../components/sortModal/sortModal";
import CryptoListTable from "../../components/tables/cryptoListTable/cryptoListTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";
import Loader from "../../components/loader/loader";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import {
  coinSearch,
  updateCryptoList,
  updatePage,
  updateSortCriteria,
  updateSortOrder,
} from "../../state/slice/cryptoListSlice";

import "./cryptoListPage.scss";

export default function CryptoListPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const coins = useAppSelector((state) => state.listPage.list);
  const searchCoin = useAppSelector((state) => state.listPage.searchCoin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        dispatch(updateCryptoList(res.data));
        // console.log(res.data);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        dispatch(updateSortCriteria("market_cap_rank"));
        dispatch(updateSortOrder(false));
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(coinSearch(e.target.value));
    dispatch(updatePage(1));
  };

  const handleSearchClear = () => {
    dispatch(coinSearch(""));
  };

  const filteredCoins = coins.filter((coin) => {
    if (coin.name) {
      return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
    } else {
      return coin;
    }
  });

  return (
    <div className="crypto-container">
      {!loading ? (
        <>
          {coins?.length && !error ? (
            <>
              <div className="search-and-sort-container">
                <SortModal />
                <InputBase
                  autoFocus
                  type="text"
                  value={searchCoin}
                  placeholder="Search a crypto"
                  className="search-coin"
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
              <div className="crypto-list-container">
                <CryptoListTable coinsData={filteredCoins} />
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
