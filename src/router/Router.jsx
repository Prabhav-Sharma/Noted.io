import React from "react";
import { Routes, Route } from "react-router-dom";
import { MockAPI, Landing, Home } from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/mockman" element={<MockAPI />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default Router;
