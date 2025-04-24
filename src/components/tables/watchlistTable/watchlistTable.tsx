import { useNavigate } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

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
import {
  updateWatchlistPage,
  updateWatchlistOrder,
} from "../../../state/slice/watchlistSlice";

import {
  CryptoCurrencyDataType,
  WatchlistCryptoCurrencyType,
} from "../../../types/common.types";

import "./watchlistTable.scss";

export default function WatchlistTable({
  coinsData,
}: {
  coinsData: WatchlistCryptoCurrencyType[];
}) {
  const currentPage = useAppSelector(
    (state) => state.watchlistPage.currentPage
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let sortedCoinsData: WatchlistCryptoCurrencyType[] = coinsData;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(updateWatchlistPage(page));
  };

  const handleRowClick = (data: CryptoCurrencyDataType) => {
    navigate(`/details/${data.name?.replace(/ /g, "_").toLowerCase()}`, {
      state: data,
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // console.log("result", result);
    const currentData = [...sortedCoinsData];
    const [movedItem] = currentData.splice(result.source.index, 1);
    currentData.splice(result.destination.index, 0, movedItem);

    dispatch(updateWatchlistOrder(currentData));
  };

  return (
    <>
      {sortedCoinsData.length ? (
        <TableContainer className="watchlist-table-container">
          <Table size="small" className="watchlist-table">
            <TableHead>
              <TableRow>
                <TableCell>Market Cap Rank</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Current Price ($)</TableCell>
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="coins">
                {(provided: DroppableProvided) => (
                  <TableBody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {sortedCoinsData
                      ?.slice(currentPage * 10 - 10, currentPage * 10)
                      .map((coin, index) => {
                        return (
                          <Draggable
                            key={coin.id!}
                            draggableId={coin.id!}
                            index={index}
                          >
                            {(provided: DraggableProvided, snapshot) => (
                              <TableRow
                                onClick={() => handleRowClick(coin)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  ...(snapshot.isDragging && {
                                    display: "table",
                                  }),
                                }}
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
                                <TableCell>
                                  ${coin.current_price?.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
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
