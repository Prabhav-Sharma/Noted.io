import React from "react";
import { Routes, Route } from "react-router-dom";
import { MockAPI, Landing, Home } from "../pages";
import Note from "../pages/Note";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/mockman" element={<MockAPI />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/note/:type/:noteId" element={<Note />} />
    </Routes>
  );
}

export default Router;
