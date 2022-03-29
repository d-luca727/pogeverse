import store from "../app/store";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Row, Statistic, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import { useGetCryptosQuery } from "../services/crypto-api";

import Loader from "./Loader";

import { DollarCircleOutlined, FrownOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { atLogin } from "../app/profileReducer";

const { Title, Text } = Typography;

const Profile = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let { profile } = store.getState();

  const __profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { data: cryptoList, isFetching } = useGetCryptosQuery(100);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCryptoQuery, setCryptoQuery] = useState(false);

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);

    const filteredData = cryptoList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
    setCryptoQuery(true);
  }, [cryptoList, searchTerm]);

  useEffect(() => {}, [profile]);
  //maybe make a validate function later
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);

        dispatch(atLogin(data.data));
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        console.log(error + "non autorazizinalbe");
      }
    };

    fetchPrivateDate();
  }, [profile]);

  const closePosition = async (index) => {
    console.log(profile);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.put(
        "/api/trade/close",
        {
          username: profile.username,
          trade_id: profile.trades[index].id,
          coin_amount_now: cryptos?.find(
            (crypto) => crypto.symbol == profile.trades[index].coin
          ).price,
        },
        config
      );

      notification.open({
        message: "Trade has been closed successfully",
      });
    } catch (error) {
      console.log(error);
      notification.open({
        message: "An error has occured",

        icon: <FrownOutlined />,
      });
    }
  };

  if (!localStorage.getItem("authToken")) navigate("/login");
  if (isFetching || !isCryptoQuery) return <Loader />;

  return error ? (
    <>
      <span className="error-message">{error}</span>
      <div className="btn-login">
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  ) : (
    <>
      <Title level={2} className="heading">
        Profile
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Username:" value={profile.username} />
        </Col>
        <Col span={12}>
          <Statistic title="email:" value={profile.email} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Amount of Money:"
            value={`$ ${profile?.money}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Number of open positions:"
            value={profile?.trades.length}
          />
        </Col>
      </Row>

      <Title className="title-positions" level={2}>
        Open Positions
      </Title>
      {profile?.trades.length == 0 && (
        <>
          <Title level={4}>
            You haven't opened any position yet. Go to Trade and start trading!
          </Title>
        </>
      )}
      {profile?.trades.map(({ coin, open, amount }, index) => (
        <>
          <Row>
            <Col span={14} key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>
                  <DollarCircleOutlined />
                </Text>
                <Text>
                  {coin} / USD open at price: $ {open}
                </Text>
                <span> ------ </span>
                <Text>invested amount: $ {amount}</Text>
              </Col>
            </Col>
            <Col>
              <Text className={"positions-end"}>
                <Statistic
                  title={"profit/loss"}
                  value={
                    (cryptos?.find((crypto) => crypto.symbol == coin).price /
                      open) *
                    amount
                  }
                />
              </Text>

              <Button onClick={() => closePosition(index)}>
                Close Position
              </Button>
            </Col>
          </Row>
          <br />
          <br />
        </>
      ))}
    </>
  );
};

export default Profile;
