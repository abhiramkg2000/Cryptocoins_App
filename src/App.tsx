import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopNavigation from "./components/topNavigation/topNavigation";
import CryptoListPage from "./pages/cryptoListPage/cryptoListPage";
import TrendingListPage from "./pages/trendingListPage/trendingListPage";
import CryptoInfoPage from "./pages/cryptoInfoPage/cryptoInfoPage";
import NotFound from "./components/notFound/notFound";

import "./App.scss";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<TopNavigation />}>
            <Route path="/" element={<CryptoListPage />} />
            <Route path="/trending" element={<TrendingListPage />} />
          </Route>
          <Route path="/details/:name" element={<CryptoInfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
