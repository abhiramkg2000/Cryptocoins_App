import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

import CryptoListTable from "../../components/cryptoListTable/cryptoListTable";
import NoDataToDisplay from "../../components/noDataToDisplay/noDataToDisplay";

import { CryptoCurrencyListType } from "../../types/common.types";

import "./cryptoListPage.scss";

export default function CryptoListPage({
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
  const [coins, setCoins] = useState<CryptoCurrencyListType>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
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
    if (coin.name) {
      return coin.name.toLowerCase().includes(search.toLowerCase());
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
                <CryptoListTable
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
