import { useNavigate } from "react-router-dom";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import Pagination from "@mui/material/Pagination";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import NoDataToDisplay from "../noDataToDisplay/noDataToDisplay";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import {
  sortMarketCapRank,
  updatePage,
} from "../../state/slice/cryptoListSlice";

import {
  CryptoCurrencyDataType,
  CryptoCurrencyListType,
} from "../../types/common.types";

import "./cryptoListTable.scss";

export default function CryptoListTable({
  coinsData,
}: {
  coinsData: CryptoCurrencyListType;
}) {
  const currentPage = useAppSelector((state) => state.listPage.currentPage);
  const marketCapRankSort = useAppSelector(
    (state) => state.listPage.marketCapRankSort
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let sortedCoinsData: CryptoCurrencyListType = coinsData;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(updatePage(page));
  };

  const handleRowClick = (data: CryptoCurrencyDataType) => {
    navigate(`/details/${data.name?.replace(/ /g, "_").toLowerCase()}`, {
      state: data,
    });
  };

  // const handlePriceSort = (sort: boolean) => {
  //   if (sort) {
  //     sortedCoinsData = sortedCoinsData?.sort(
  //       (a, b) => b.current_price! - a.current_price!
  //     );
  //   } else {
  //     sortedCoinsData = sortedCoinsData?.sort(
  //       (a, b) => a.current_price! - b.current_price!
  //     );
  //   }
  // };

  const handleMarketCapRankSort = (sort: boolean) => {
    if (sort) {
      sortedCoinsData = sortedCoinsData?.sort(
        (a, b) => b.market_cap_rank! - a.market_cap_rank!
      );
    } else {
      sortedCoinsData = sortedCoinsData?.sort(
        (a, b) => a.market_cap_rank! - b.market_cap_rank!
      );
    }
  };

  handleMarketCapRankSort(marketCapRankSort);

  return (
    <>
      {sortedCoinsData.length ? (
        <TableContainer className="crypto-list-table-container">
          <Table size="small" className="crypto-list-table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <ArrowDownwardIcon
                    className={`arrowDown ${marketCapRankSort ? "up" : ""}`}
                    onClick={() => {
                      dispatch(sortMarketCapRank(!marketCapRankSort));
                      handleMarketCapRankSort(!marketCapRankSort);
                    }}
                  />
                  Market Cap Rank
                </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>
                  {/* <ArrowDownwardIcon
                    className={`arrowDown ${sortPrice ? "" : "up"}`}
                    onClick={() => {
                      setSortPrice((prev) => !prev);
                      handlePriceSort(!sortPrice);
                    }}
                  /> */}
                  Current Price ($)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCoinsData
                ?.slice(currentPage * 10 - 10, currentPage * 10)
                .map((coin) => {
                  return (
                    <TableRow
                      key={coin.id}
                      onClick={() => handleRowClick(coin)}
                    >
                      <TableCell>{coin.market_cap_rank}</TableCell>
                      <TableCell>
                        <img
                          src={coin.image!}
                          height={"50px"}
                          width={"50px"}
                          alt="Crypto image"
                        />
                      </TableCell>
                      <TableCell>{coin.name}</TableCell>
                      <TableCell>{coin.symbol}</TableCell>
                      <TableCell>${coin.current_price?.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Pagination
                    className="pagination"
                    count={Math.ceil(coinsData.length / 10)}
                    page={currentPage}
                    onChange={handleChangePage}
                    showFirstButton={true}
                    showLastButton={true}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <NoDataToDisplay text="No Crypto found" />
      )}
    </>
  );
}
