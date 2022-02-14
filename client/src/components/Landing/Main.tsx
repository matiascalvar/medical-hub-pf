import React, { FunctionComponent } from "react";
import style from "./Main.module.css";

const Main: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h1>
          Watch <br></br>
          <span className={style.blue}>your Health</span>
        </h1>
        <p>
          Welcome to Medical Hub! A web platform where you can search amongst
          many medical specialties and get an appointment with just one click!
          On top of that you can see all your medical studies and records all in
          one place. Isn’t it great?
        </p>
      </div>
      <div className={style.homeImg}>
        <img src="https://i.imgur.com/7XYdKPb.png" alt="Home" />
      </div>
    </div>
  );
};

export default Main;
