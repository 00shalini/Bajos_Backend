import React, { useState } from "react";
import "./Login.css";
import { Row, Col } from "react-bootstrap";
import { Box, Button } from "@mui/material";
import Img1 from "../../assets/mobile.png";
import Img2 from "../../assets/shield.png";
import { fontWeight } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ authenticated, setauthenticated }) => {
  const bg = "#74C3AD";
  const text = "#219653";

  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const href = useNavigate();

  const navigateHome = async (e) => {
    e.preventDefault();
    const user = await axios.post(`http://localhost:8080/login`, {
      phone_number: phone,
      password: pass,
    });
     console.log(authenticated)
    if (user.data && user.data.authorised) {
      
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      href("/home");
    } else {
      localStorage.setItem("authenticated", false);
      setauthenticated(false);
    }
  };

  return (
    <>
      <Row style={{ height: "100vh" }}>
        <Col lg={4} style={{ background: bg }}>
          <Box className="logo-text">BAJO'S</Box>
          <Box
            className="text-center"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <div className="wb-text">Welcome Back</div>
              <div style={{ color: "#4F4F4F" }}>
                Lorem ipsum dolor sit amet,
                <br />
                consectetur adipiscing elit. Nec <br />
                diam iaculis egestas faucibus lectus.
              </div>
            </Box>
          </Box>
        </Col>
        <Col>
          <Box
            className="text-center"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <div
                className="my-4"
                style={{
                  color: text,
                  fontSize: 48,
                  fontWeight: 300,
                }}
              >
                Login
              </div>
              <div>
                <div className="input-con">
                  <img className="img-input" src={Img1} alt="" />
                  <input
                    className="global-input"
                    type="number"
                    placeholder="Phone Number"
                    style={{ width: 550 }}
                    onChange={(e) => {
                      e.preventDefault();
                      setPhone(e.target.value);
                    }}
                  />
                </div>
                <div className="input-con">
                  <img className="img-input" src={Img2} alt="" />
                  <input
                    className="global-input"
                    type="password"
                    placeholder="Password"
                    style={{ width: 550 }}
                    onChange={(e) => {
                      e.preventDefault();
                      setPass(e.target.value);
                    }}
                  />
                </div>
                <Box>
                  {phone.length == 10 && pass.length > 1 ? (
                    <button
                      className="btn my-4"
                      style={{
                        width: 200,
                        height: 55,
                        color: "#fff",
                        background: bg,
                        border: `1px solid ${bg}`,
                        fontWeight: 600,
                        fontSize: 21,
                      }}
                      onClick={navigateHome}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="btn my-4"
                      disabled
                      style={{
                        width: 200,
                        height: 55,
                        color: text,
                        border: `1px solid ${bg}`,
                        fontWeight: 600,
                        fontSize: 21,
                      }}
                    >
                      Login
                    </button>
                  )}
                </Box>
              </div>
            </Box>
          </Box>
        </Col>
      </Row>
    </>
  );
};

export default Login;
