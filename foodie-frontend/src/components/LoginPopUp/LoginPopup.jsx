import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { AUTHENTICATION, BASE_URL } from "../../constants/API";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onLoginHandler = async (event) => {
    event.preventDefault();
    let newUrl = BASE_URL;

    // Check if the current state is Login or Sign Up
    if (currentState === "Login") {
      newUrl += AUTHENTICATION.LOGIN;
    } else {
      newUrl += AUTHENTICATION.REGISTRATION;
    }

    console.log(newUrl);
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLoginHandler}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I accept the Terms of Use & Privacy Policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a New Account ?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Cleck here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
