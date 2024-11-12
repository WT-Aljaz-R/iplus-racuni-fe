import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditRacunRoute } from "./routes/EditRacunRoute";
import { HistoryRacuniRoute } from "./routes/HistoryRacuniRoute";
import { ValidatedRacunRoute } from "./routes/ValidatedRacunRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditRacunRoute />}></Route>
        <Route path="/history" element={<HistoryRacuniRoute />}></Route>
        <Route
          path="/validated-racun"
          element={<ValidatedRacunRoute />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
