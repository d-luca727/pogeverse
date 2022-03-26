import React from "react";
import { Routes as Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import {
  Navbar,
  Trade,
  Homepage,
  Cryptos,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";

//trading
import CryptoTrading from "./components/trading/CryptoTrading";

//routing
import PrivateRoute from "./components/routing/PrivateRoute";

//screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/" element={<Homepage />}></Route>

              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptos />}
              ></Route>

              <Route
                exact
                path="/crypto/:coinId"
                element={<CryptoDetails />}
              ></Route>
              <Route
                exact
                path="/crypto-trading/:coinId"
                element={<CryptoTrading />}
              ></Route>

              <Route exact path="/news" element={<News />}></Route>

              {/* fix the flashing screen before showing the login page */}
              <Route exact path="/trade" element={<PrivateRoute />}>
                <Route exact path="/trade" element={<PrivateScreen />} />
              </Route>

              <Route exact path="/login" element={<LoginScreen />} />
              <Route exact path="/register" element={<RegisterScreen />} />
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPasswordScreen />}
              />
              <Route
                exact
                path="/passwordreset/:resetToken"
                element={<ResetPasswordScreen />}
              />
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            PogeVerse
            <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/Home">Home</Link>
            <Link to="/trade">Trade</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
