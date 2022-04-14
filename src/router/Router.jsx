import React from "react";
import { Routes, Route } from "react-router-dom";
import { MockAPI, Home } from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/mockman" element={<MockAPI />}></Route>
    </Routes>
  );
}

export default Router;
