import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import TrendingListTable from "../../components/trendingListTable/trendingListTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";

import { TrendingCryptoCurrencyListType } from "../../types/common.types";

import "./trendingListPage.scss";

export default function TrendingListPage({
  page,
  setPage,
  search,
  setSearch,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [coins, setCoins] = useState<TrendingCryptoCurrencyListType>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/search/trending`)
      .then((res) => {
        setCoins(res.data.coins);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSearchClear = () => {
    setSearch("");
  };

  const filteredCoins = coins.filter((coin) => {
    if (coin.item?.name) {
      return coin.item.name.toLowerCase().includes(search.toLowerCase());
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
                  value={search}
                  placeholder="Search a crypto"
                  className="trending-search-coin"
                  onChange={handleChange}
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
                <TrendingListTable
                  coinsData={filteredCoins}
                  page={page}
                  setPage={setPage}
                />
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
        <div className="loader">
          <ScaleLoader loading color="#44475b" />
        </div>
      )}
    </div>
  );
}
