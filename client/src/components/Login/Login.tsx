import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FaAt, FaLock } from "react-icons/fa";
import BackImg from "../../assets/img/back_login.jpeg";
import Logo from "../../assets/img/logo.svg";
import "../../styles/LoginPage/Login.css";

const LoginPage: FunctionComponent = () => {
  return (
    <div className="loginContainer">
      <img src={BackImg} alt="fondo" className="imgFondo" />
      <div className="loginContainer__container">
        <form className="container__form">
          <div className="form__logo">
            <h2>Log in</h2>
            <p className="login__text">
              Welcome back! Please login to your account!
            </p>
          </div>
          <div className="form__user">
            <label className="user__title">Email</label>
            <div className="user__input">
              <input
                type="email"
                placeholder="email@domain.com"
                className="loginInput__item"
              />
            </div>
          </div>
          <div className="form__password">
            <label className="password__title">Password</label>
            <div className="password__input">
              <input
                type="password"
                placeholder="at least 8 characters"
                className="loginInput__item"
              />
            </div>
          </div>
          <div className="form__register">
            <div className="register__isMedic">
              <input type="checkbox" className="isMedic__check" />
              <label className="isMedic__title">I am Medic</label>
            </div>
          </div>
          <button className="form__btn">Log in</button>
          <Link to="/register" className="btn__register">
            You are not registered yet?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
