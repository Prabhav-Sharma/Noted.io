import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import {
  MockAPI,
  Landing,
  Home,
  Profile,
  Search,
  Trash,
  Archives,
} from "../pages";
import Note from "../pages/Note";
import ProtectedRoutes from "./ProtectedRoutes";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/mockman" element={<MockAPI />}></Route>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/trash"
          element={
            <Layout>
              <Trash />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/archives"
          element={
            <Layout>
              <Archives />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route path="/note/:type/:noteId" element={<Note />} />
      </Route>
    </Routes>
  );
}

export default Router;
