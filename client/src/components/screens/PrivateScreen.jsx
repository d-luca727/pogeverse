import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import "../../styles/PrivateScreen.css";
import "../../styles/style.css";

import Trade from "../trading/Trade";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: {},
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return error ? (
    <>
      <span className="error-message">{error}</span>
      <div className="btn-login">
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  ) : (
    <>
      <div>
        <Trade />
      </div>
    </>
  );
};

export default PrivateScreen;
