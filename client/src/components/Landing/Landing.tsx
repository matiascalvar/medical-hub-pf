import React, { FunctionComponent } from "react";
import style from "./Landing.module.css";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Us from "./Us";

const Landing: FunctionComponent = () => {
  return (
    <div className={style.bigContainer}>
      <Header />
      <Main />
      <section id="us">
        <Us />
      </section>
      <section id="features">
        <Features />
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
