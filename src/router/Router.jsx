import React from "react";
import { Routes, Route } from "react-router-dom";
import { MockAPI, Home, Notes } from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/mockman" element={<MockAPI />}></Route>
      <Route path="/notes" element={<Notes />}></Route>
    </Routes>
  );
}

export default Router;
