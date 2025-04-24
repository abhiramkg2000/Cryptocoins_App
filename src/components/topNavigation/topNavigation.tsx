import { useNavigate, Outlet } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import { updateTopNavigation } from "../../state/slice/topNavigationSlice";

import "./topNavigation.scss";

export default function TopNavigation() {
  const value = useAppSelector((state) => state.topNavigation.value);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "trending") {
      navigate("/trending");
    } else if (newValue === "all") {
      navigate("/");
    } else {
      navigate("/watchlist");
    }
    dispatch(updateTopNavigation(newValue));
  };

  return (
    <>
      <div className="top-navigation">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label="All"
            value={"all"}
            className={`tab ${value === "all" ? "active" : ""}`}
            disableRipple={true}
          />
          <Tab
            label="Trending"
            value={"trending"}
            className={`tab ${value === "trending" ? "active" : ""}`}
            disableRipple={true}
          />
          <Tab
            label="Watchlist"
            value={"watchlist"}
            className={`tab ${value === "watchlist" ? "active" : ""}`}
            disableRipple={true}
          />
        </Tabs>
      </div>
      <Outlet />
    </>
  );
}
