import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";

import { store } from "./state/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
