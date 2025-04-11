import { ScaleLoader } from "react-spinners";

import "./loader.scss";

export default function Loader() {
  return (
    <div className="loader">
      <ScaleLoader loading color="#44475b" />
    </div>
  );
}
