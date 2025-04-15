import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../state/hooks/hooks";
import { updateTopNavigation } from "../../state/slice/topNavigationSlice";

import "./notFound.scss";

export default function NotFound() {
  const [countDown, setCountDown] = useState(3);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      dispatch(updateTopNavigation("all"));
      navigate("/");
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="not-found">
      Page not found, redirecting to listing page in {countDown}s
    </div>
  );
}
