import { useNavigate } from "react-router-dom";
import axios from "axios";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import Pagination from "@mui/material/Pagination";

import NoDataToDisplay from "../../noDataToDisplay/noDataToDisplay";

import { useAppSelector, useAppDispatch } from "../../../state/hooks/hooks";
import { updateTrendingPage } from "../../../state/slice/trendingListSlice";

import {
  TrendingCryptoCurrencyType,
  TrendingCryptoCurrencyListType,
} from "../../../types/common.types";

import "./trendingListTable.scss";

export default function TrendingListTable({
  coinsData,
}: {
  coinsData: TrendingCryptoCurrencyListType;
}) {
  const currentPage = useAppSelector((state) => state.trendingPage.currentPage);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let sortedCoinsData: TrendingCryptoCurrencyListType = coinsData;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(updateTrendingPage(page));
  };

  const handleRowClick = (coin: TrendingCryptoCurrencyType) => {
    let data = {};
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin?.id}`
      )
      .then((res) => {
        // console.log(res.data[0]);
        data = res.data[0];
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate(`/details/${coin?.name?.replace(/ /g, "_").toLowerCase()}`, {
          state: data,
        });
      });
  };

  return (
    <>
      {sortedCoinsData.length ? (
        <TableContainer className="trending-crypto-list-table-container">
          <Table size="small" className="trending-crypto-list-table">
            <TableHead>
              <TableRow>
                <TableCell>Market Cap Rank</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Current Price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCoinsData
                ?.slice(currentPage * 10 - 10, currentPage * 10)
                .map((coin) => {
                  return (
                    <TableRow
                      key={coin.item?.id}
                      onClick={() => handleRowClick(coin.item!)}
                    >
                      <TableCell>{coin.item?.market_cap_rank}</TableCell>
                      <TableCell>
                        <img
                          src={coin.item?.thumb!}
                          height={"50px"}
                          width={"50px"}
                          alt="Crypto image"
                        />
                      </TableCell>
                      <TableCell>{coin.item?.name}</TableCell>
                      <TableCell>{coin.item?.symbol?.toLowerCase()}</TableCell>
                      <TableCell>
                        ${coin.item?.data?.price?.toFixed(2)}
                      </TableCell>
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
