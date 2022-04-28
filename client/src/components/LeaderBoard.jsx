import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Col, Row } from "antd";
import millify from "millify";

import Loader from "./Loader";

const { Title, Text } = Typography;

const players = [
  { username: "pino", money: 900, trades: 2 },
  { username: "pallino", money: 300, trades: 3 },
  { username: "povero", money: 2, trades: 4 },
];

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get("/api/leaderboard", config);
        setUsers(data.data);
      } catch (error) {
        setError("Could not retrieve server data. ");
      }
    };

    fetchUsers();
  });

  if (users.length === 0) return <Loader />;
  return (
    <div>
      <Title className="coin-heading-container" level={2}>
        Global PogeVerse Leaderboard
      </Title>
      <Title className="coin-heading-container" level={3}>
        Best Players
      </Title>
      {users.map(({ username, money, trades }, index) => (
        <Col key={index} className="coin-stats">
          <Col className="coin-stats-name">
            <Text>{index + 1}.</Text>
            <Text>
              <strong>{username}</strong>
            </Text>
          </Col>
          <Text className="stats">$ {money && millify(money)}</Text>
        </Col>
      ))}
    </div>
  );
};

export default LeaderBoard;
