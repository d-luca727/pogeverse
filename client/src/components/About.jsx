import React from "react";

import { Row, Col } from "antd";
import "../styles/About.css";
const About = () => {
  const items = [
    {
      key: "1",
      icon: <i className="fas fa-chart-pie"></i>,
      title: "Crypto News",
      content:
        "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
    },
    {
      key: "2",
      icon: <i className="fas fa-desktop"></i>,
      title: "Trade",
      content:
        "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
    },
    {
      key: "3",
      icon: <i className="fas fa-database"></i>,
      title: "Charts",
      content:
        "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
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
        yada yada
      </div>
    </div>
  );
};

export default About;
