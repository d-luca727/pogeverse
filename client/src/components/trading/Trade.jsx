import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../../services/crypto-api";

import Loader from "../Loader";

const Trade = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);

    const filteredData = cryptoList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  console.log(cryptoList);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {!simplified ? (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : (
        <></>
      )}

      <Row gutter={[24, 24]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto-trading/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}$</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                {console.log(currency)}

                <p>
                  Change:{" "}
                  <div
                    style={{ color: currency.change >= 0 ? "green" : "red" }}
                  >
                    {currency.change}%
                  </div>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Trade;
