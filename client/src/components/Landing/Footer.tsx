import React, { FunctionComponent } from "react";
import style from "./Footer.module.css";
import Logo from "../../assets/img/logo.svg";
import { animateScroll as scroll } from "react-scroll";

const Footer: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <img onClick={() => scroll.scrollToTop()} src={Logo} alt="Medical HUB" />
      <ul>
        <li>
          <a>Terms of service</a>
        </li>
        <li>
          <a>Privacy</a>
        </li>
        <li>
          <a>Legal</a>
        </li>
      </ul>
      <p>
        {" "}
        MedicalHub ~ This is a fictional project for the bootcamp Henry. All
        rights reserved. All trademarks, service marks and company names are the
        property of their respective owners.
      </p>
    </div>
  );
};

export default Footer;
