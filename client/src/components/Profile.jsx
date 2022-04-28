import store from "../app/store";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Row, Statistic, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import { useGetCryptosQuery } from "../services/crypto-api";

import Loader from "./Loader";

import {
  ArrowUpOutlined,
  DollarCircleOutlined,
  FrownOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

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

  //getting all the cryptos
  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);

    const filteredData = cryptoList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
    setCryptoQuery(true);
  }, [cryptoList, searchTerm]);

  //validating auth token
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
      }
    };

    fetchPrivateDate();
  }, []);

  //onClick close position
  const closePosition = async (index) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.put(
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
      dispatch(atLogin(data.data));
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
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Statistic title="Username:" value={profile.username} />
        </Col>
        <Col span={12}>
          <Statistic title="email:" value={profile.email} />
        </Col>
        <br></br>

        <br></br>
        <Col span={12}>
          <Statistic
            title="Amount of Money Available:"
            value={`$ ${profile?.money.toFixed(2)}`}
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
          <Row gutter={[16, 16]} className="coin-stats">
            <Col span={16} key={index}>
              <Col className="coin-stats-name" style={{ fontSize: "150%" }}>
                <Text>
                  <DollarCircleOutlined />
                </Text>
                <Text>
                  <strong>{coin} / USD</strong>
                </Text>
              </Col>
              <Col span={6}>
                <Statistic
                  style={{ paddingTop: 15 }}
                  title={"open price"}
                  value={`
                  $${open.toFixed(2)}`}
                />
              </Col>
              <Col span={4}>
                <Statistic
                  style={{ paddingTop: 15 }}
                  title={"invested amount"}
                  value={`
                  $${amount.toFixed(2)}`}
                />
              </Col>
            </Col>

            <Col>
              <Text style={{ padding: 5 }}>
                <div style={{ fontSize: "200%", textAlign: "center" }}>
                  {(
                    (cryptos?.find((crypto) => crypto.symbol == coin).price /
                      open) *
                      amount -
                    amount
                  ).toFixed(2) >= 0 ? (
                    <ArrowUpOutlined style={{ color: "green" }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: "red" }} />
                  )}
                </div>
                <Statistic
                  style={{
                    textAlign: "center",
                    paddingBottom: 10,
                  }}
                  title={"profit/loss"}
                  value={`
                    $${(
                      (cryptos?.find((crypto) => crypto.symbol == coin).price /
                        open) *
                        amount -
                      amount
                    ).toFixed(2)}`}
                />
              </Text>

              <Button
                style={{ textAlign: "center" }}
                danger
                onClick={() => closePosition(index)}
              >
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
