import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

import TrendingListTable from "../../components/trendingListTable/trendingListTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";

import { TrendingCoinList } from "../../types/common.types";

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
  const [coins, setCoins] = useState<TrendingCoinList>([]);
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

  const filteredCoins = coins.filter((coin) => {
    if (coin.item?.name) {
      return coin.item.name.toLowerCase().includes(search.toLowerCase());
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
              <div className="search-container">
                <input
                  autoFocus
                  type="text"
                  value={search}
                  placeholder="Search"
                  className="search-coin"
                  onChange={handleChange}
                />
              </div>
              <div className="crypto-list-container">
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
