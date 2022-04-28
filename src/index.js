import React from "react";
import ReactDOM from "react-dom";
import "./styles/utils.css";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/providers/AuthProvider";
import { UserDataProvider } from "./contexts/providers/userDataProvider";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
