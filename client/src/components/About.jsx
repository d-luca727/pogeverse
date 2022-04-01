import React from "react";

import { Row, Col, Typography } from "antd";
import "../styles/About.css";
const { Title, Text } = Typography;
const About = () => {
  const items = [
    {
      key: "1",
      icon: <i className="fas fa-chart-pie"></i>,
      title: "Crypto News",
      content: "Stay always tuned on the cryptoverse thanks to our news feed.",
    },
    {
      key: "2",
      icon: <i className="fas fa-desktop"></i>,
      title: "Trade",
      content: "Register and start to practice trading for free!",
    },
    {
      key: "3",
      icon: <i className="fas fa-database"></i>,
      title: "up-to-date Live Trading Charts",
      content:
        "Thanks to trading view you can make the plans that best suit your trading strategy.",
    },
  ];
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>About PogeVerse</h2>
          <p>The Best Free Crypto Trading Website</p>
        </div>
        <div className="contentHolder">
          <p>
            CryptoVerse is a website that provides a free Trading platform to
            cryptocurrencies enthusiasts to practice and test their Trading
            skills, helping them navigate the cryptoverse with all the newest
            informations available!
          </p>
        </div>
        <Title>Features</Title>
        <Row gutter={[16, 16]}>
          {items.map((item) => {
            return (
              <Col md={{ span: 8 }} key={item.key}>
                <div className="content">
                  <div className="icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
        <Title>About Us</Title>
        This website is made entirely by Daniele Luca, reach me through github
        or linkedin. --bottone github--bottone linkedin
      </div>
    </div>
  );
};

export default About;
