import React from "react";
import { Routes, Route } from "react-router-dom";
import { MockAPI, Landing, Home } from "../pages";
import Note from "../pages/Note";
import ProtectedRoutes from "./ProtectedRoutes";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/mockman" element={<MockAPI />}></Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/note/:type/:noteId" element={<Note />} />
      </Route>
    </Routes>
  );
}

export default Router;
