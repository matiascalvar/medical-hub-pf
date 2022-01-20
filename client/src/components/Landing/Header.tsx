import React, { FunctionComponent } from "react";
import style from "./Header.module.css";
import Logo from "../../assets/img/logo.svg";
import { Link } from "react-scroll";
import { Link as LinkRouter } from "react-router-dom";

const Header: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <img src={Logo} alt="Medical HUB" />
      <nav>
        <ul>
          <li>
            <Link to="us" smooth={true}>
              Why MedicalHUB?
            </Link>
          </li>
          <li>
            <Link to="features" smooth={true}>
              Features
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style.buttons}>
        <LinkRouter className={style.LinkRouter} to="/login">
          <button className={style.btnSignIn}>Sign in</button>
        </LinkRouter>
        <LinkRouter className={style.LinkRouter} to="/register">
          <button className={style.btnRegister}>Register</button>
        </LinkRouter>
      </div>
    </div>
  );
};

export default Header;
