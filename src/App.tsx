import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CoinList from "./components/page/coinlist/CoinList";
import Detail from "./components/page/detail/Detail";

const mainPathList = ["coinlist", "detail"];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      !mainPathList.includes(location.pathname.split("/")[1])
    ) {
      navigate("/coinlist");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/coinlist/*" element={<CoinList />} />
        <Route path="/detail/*" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
