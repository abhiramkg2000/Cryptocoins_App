import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./notFound.scss";

export default function NotFound() {
  const [countDown, setCountDown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="not-found">
      Page not found, redirecting to home page in {countDown}s
    </div>
  );
}
