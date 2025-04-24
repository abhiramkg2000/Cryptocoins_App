import { useEffect } from "react";

import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import WatchlistTable from "../../components/tables/watchlistTable/watchlistTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import {
  watchlistCoinSearch,
  updateWatchlistPage,
} from "../../state/slice/watchlistSlice";
import { updateTopNavigation } from "../../state/slice/topNavigationSlice";

import "./watchlistPage.scss";

export default function WatchlistPage() {
  const coins = useAppSelector((state) => state.watchlistPage.list);
  const searchCoin = useAppSelector((state) => state.watchlistPage.searchCoin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateTopNavigation("watchlist"));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(watchlistCoinSearch(e.target.value));
    dispatch(updateWatchlistPage(1));
  };

  const handleSearchClear = () => {
    dispatch(watchlistCoinSearch(""));
  };

  const filteredCoins = coins.filter((coin) => {
    if (coin.name) {
      return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
    } else {
      return coin;
    }
  });

  return (
    <div className="watchlist-crypto-container">
      <>
        {coins?.length ? (
          <>
            <div className="watchlist-search-container">
              <InputBase
                autoFocus
                type="text"
                value={searchCoin}
                placeholder="Search a crypto"
                className="watchlist-search-coin"
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
            <div className="watchlist-crypto-list-container">
              <WatchlistTable coinsData={filteredCoins} />
            </div>
          </>
        ) : (
          <NoDataToDisplay text={"Watchlist is Empty"} absolute={true} />
        )}
      </>
    </div>
  );
}
