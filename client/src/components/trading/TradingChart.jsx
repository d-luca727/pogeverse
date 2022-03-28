import React, { useEffect, useRef, useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingChart = ({ symbol }) => {
  const tradingRef = useRef(null);
  const [symbolState, setSymbolState] = useState(symbol);

  useEffect(() => {}, []);

  return (
    <TradingViewWidget
      symbol={`${symbolState}USD`}
      theme={Themes.LIGHT}
      locale="en"
      ref={tradingRef}
    />
  );
};
export default TradingChart;
