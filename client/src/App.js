
import React from 'react'
import { Routes as Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd'

import  { Navbar, Exchanges, Homepage, Cryptos, News, CryptoDetails } from './components';
import './App.css'

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
              <Route exact path="/" element={<Homepage />}>
              </Route>

              <Route exact path="/cryptocurrencies" element={<Cryptos />}>
              </Route>

              <Route exact path="/crypto/:coinId" element={<CryptoDetails />}>
              </Route>

              <Route exact path="/exchanges" element={<Exchanges />}>
              </Route>

              <Route exact path="/news" element={<News />}>
              </Route>

            </Switch>
          </div>
        </Layout>

      
        <div className="footer">
          <Typography.Title level={5} style={{color:'white', textAlign:'center' }}>
            PogeVerse<br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/Home">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App