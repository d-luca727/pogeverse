import React, { useState } from "react";
import axios from "axios";
import store from "../../app/store";
import HTMLReactParser from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import millify from "millify";

import {
  Col,
  Row,
  Typography,
  Select,
  InputNumber,
  Button,
  notification,
} from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  FrownOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useGetCryptoDetailsQuery } from "../../services/crypto-api";
import TradingChart from "./TradingChart";
import Loader from "../Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoTrading = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { profile } = store.getState();

  const [buyAmount, setBuyAmount] = useState(0);

  const navigate = useNavigate();

  const cryptoDetails = data?.data?.coin;

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const openPosition = (e) => {
    e.preventDefault();
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          /*  Authorization: `Bearer ${localStorage.getItem("authToken")}`, */
        },
      };

      try {
        await axios.put(
          "/api/trade/open",
          {
            username: profile.username,
            coin: cryptoDetails.symbol,
            money_invested: buyAmount,
            open_price: cryptoDetails.price,
          },
          config
        );

        notification.open({
          message: "Trade has been successful",
          description: `You invested $${buyAmount} in ${cryptoDetails.symbol}. `,
        });
      } catch (error) {
        console.log(error);
        notification.open({
          message: "An error has occured",
          description: `Check if you have exceeded the maximum amount of funds available. `,
          icon: <FrownOutlined />,
        });
      }
    };

    fetchPrivateDate();
  };

  if (isFetching) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>

      <Title className="coin-heading-container" level={3}>
        TradingView Chart
      </Title>
      <TradingChart symbol={data?.data?.coin.symbol} />

      {/* trading stuff */}
      <Title className="coin-heading-container" level={3}>
        Trade
      </Title>
      <Row gutter={[24, 16]}>
        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <DollarCircleOutlined />
              </Text>
              <Text>buy at Price(USD)</Text>
            </Col>
            <Text className="stats">
              ${cryptoDetails?.price.toString().slice(0, 8)}
            </Text>
          </Col>
        </Col>
        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <DollarCircleOutlined />
              </Text>
              <Text>sell at Price(USD)</Text>
            </Col>
            <Text className="stats">
              ${cryptoDetails?.price.toString().slice(0, 8)}
            </Text>
          </Col>
        </Col>

        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <FundOutlined />
              </Text>
              <Text>Amount to Buy</Text>
            </Col>
            <Col className="stats">
              <InputNumber
                min={0}
                max={profile.money}
                onChange={(value) => setBuyAmount(value)}
              />
              <Button onClick={openPosition}>Buy</Button>
            </Col>
          </Col>
        </Col>

        <Col span={12}>
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>
                <FundOutlined />
              </Text>
              <Text>To close your position go to your wallet:</Text>
            </Col>
            <Col className="stats">
              <Button onClick={() => navigate("/profile")}>
                Check your Wallet
              </Button>
            </Col>
          </Col>
        </Col>
      </Row>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value, index }) => (
            <Col key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value, index }) => (
            <Col key={index} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link, index) => (
            <Row className="coin-link" key={index}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoTrading;
