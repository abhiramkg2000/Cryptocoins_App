import { useState } from "react";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks";
import {
  sortMarketCapRank,
  sortCurrentPrice,
  sortName,
  updateSortCriteria,
  updateSortOrder,
} from "../../state/slice/cryptoListSlice";

import "./sortModal.scss";

export default function SortModal() {
  const [open, setOpen] = useState(false);

  const sortOrder = useAppSelector((state) => state.listPage.sortOrder);
  const sortCriteria = useAppSelector((state) => state.listPage.sortCriteria);

  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="sort-button-container">
        <IconButton
          className="sort-button"
          disableRipple={true}
          onClick={handleOpen}
        >
          Sort
          <SortIcon className="sort-icon" />
        </IconButton>
      </div>
      <Modal open={open} onClose={handleClose} className="sort-modal">
        <div className="sort-modal-content">
          <div className="sort-criteria-buttons">
            <Button
              className={`sort-modal-button ${
                sortCriteria === "market_cap_rank" ? "active" : ""
              }`}
              disableRipple={true}
              onClick={() => {
                dispatch(updateSortCriteria("market_cap_rank"));
                dispatch(updateSortOrder(false));
                dispatch(sortMarketCapRank());
              }}
            >
              Market Cap Rank
            </Button>
            <Button
              className={`sort-modal-button ${
                sortCriteria === "name" ? "active" : ""
              }`}
              disableRipple={true}
              onClick={() => {
                dispatch(updateSortCriteria("name"));
                dispatch(updateSortOrder(false));
                dispatch(sortName());
              }}
            >
              Name
            </Button>
            <Button
              className={`sort-modal-button ${
                sortCriteria === "current_price" ? "active" : ""
              }`}
              disableRipple={true}
              onClick={() => {
                dispatch(updateSortCriteria("current_price"));
                dispatch(updateSortOrder(false));
                dispatch(sortCurrentPrice());
              }}
            >
              Current Price
            </Button>
          </div>
          <div className="sort-order-buttons">
            <Button
              className="sort-modal-button"
              disableRipple={true}
              onClick={() => {
                dispatch(updateSortOrder(!sortOrder));
                if (sortCriteria === "market_cap_rank") {
                  dispatch(sortMarketCapRank());
                } else if (sortCriteria === "name") {
                  dispatch(sortName());
                } else if (sortCriteria === "current_price") {
                  dispatch(sortCurrentPrice());
                }
              }}
            >
              <ArrowDownwardIcon
                className={`arrowDown ${
                  sortCriteria === "name"
                    ? sortOrder
                      ? ""
                      : "up"
                    : sortOrder
                    ? "up"
                    : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
