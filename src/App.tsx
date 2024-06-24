import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CryptoListPage from "./pages/cryptoListPage/cryptoListPage";
import CryptoInfoPage from "./pages/cryptoInfoPage/cryptoInfoPage";
import NotFound from "./components/notFound/notFound";

import "./App.scss";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Router>
        <Routes>
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
          <Route path="/details/:name" element={<CryptoInfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
