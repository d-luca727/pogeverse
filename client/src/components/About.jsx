import {
  GithubOutlined,
  LinkedinOutlined,
  StockOutlined,
  ReadOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import "../styles/About.css";
const { Title, Text } = Typography;
const About = () => {
  const items = [
    {
      key: "1",
      icon: <ReadOutlined />,
      title: "Crypto News",
      content: "Stay always tuned on the cryptoverse thanks to our news feed",
    },
    {
      key: "2",
      icon: <StockOutlined />,
      title: "Trade",
      content: "Register and start trading for free!",
    },
    {
      key: "3",
      icon: <AreaChartOutlined />,
      title: "Up-To-Date Live Trading Charts",
      content: "Live TradingView Charts.",
    },
  ];
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <br />
        <div className="titleHolder">
          <Title>About PogeVerse</Title>
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

        <Title style={{ textAlign: "center" }}>Features</Title>
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

        <br></br>
        <Title className={"titleHolder"}>About Us</Title>
        <div style={{ textAlign: "center" }}>
          This website is made entirely by Daniele Luca, reach me through github
          or linkedin.
          <br></br>
          <br></br>
          <br></br>
          <Row gutter={[16, 16]}>
            <Col span={6}></Col>
            <Col span={6}>
              <a
                href="https://github.com/Proioxis4/crypto-trading-app"
                target={"_blank"}
              >
                <GithubOutlined className="social-icons" />
              </a>
            </Col>
            <Col span={6}>
              {" "}
              <a href="" target={"_blank"}>
                <LinkedinOutlined className="social-icons" />
              </a>
            </Col>
            <Col span={6}></Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default About;
