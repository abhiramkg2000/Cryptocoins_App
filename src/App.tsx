import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopNavigation from "./components/topNavigation/topNavigation";
import TrendingListPage from "./pages/trendingListPage/trendingListPage";
import CryptoListPage from "./pages/cryptoListPage/cryptoListPage";
import CryptoInfoPage from "./pages/cryptoInfoPage/cryptoInfoPage";
import NotFound from "./components/notFound/notFound";

import "./App.scss";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<TopNavigation />}>
            <Route
              path="/"
              element={
                <CryptoListPage
                  page={page}
                  setPage={setPage}
                  search={search}
                  setSearch={setSearch}
                />
              }
            />
            <Route
              path="/trending"
              element={
                <TrendingListPage
                  page={page}
                  setPage={setPage}
                  search={search}
                  setSearch={setSearch}
                />
              }
            />
          </Route>
          <Route path="/details/:name" element={<CryptoInfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
