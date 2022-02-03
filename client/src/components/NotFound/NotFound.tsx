import React, { FunctionComponent } from "react";
import style from "./NotFound.module.css";
import { Link } from "react-router-dom";
import Header from "../Landing/Header";
import Footer from "../Landing/Footer";

const notFound: FunctionComponent = () => {
  return (
    <div className={style.bigContainer}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.main}>
        <div>
          <h1>404</h1>
          <h2>We can't find the page you were looking for.</h2>
        </div>
        <Link to="/">
          <button>Go back</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default notFound;
