import React from "react";

import { BrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/auth/login";
import "./App.css";
import "antd/dist/antd.css";
import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
