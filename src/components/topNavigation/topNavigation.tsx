import { useNavigate, Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useAppSelector, useAppDispatch } from "../../state/hooks/hooks";
import { updateTopNavigation } from "../../state/slice/topNavigationSlice";

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
      <Box sx={{ marginTop: "2rem" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label="All"
            value={"all"}
            sx={{ textTransform: "none", fontSize: "1rem" }}
          />
          <Tab
            label="Trending"
            value={"trending"}
            sx={{ textTransform: "none", fontSize: "1rem" }}
          />
          <Tab
            label="Watchlist"
            value={"watchlist"}
            sx={{ textTransform: "none", fontSize: "1rem" }}
          />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
}
