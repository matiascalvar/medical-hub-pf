import React, { FunctionComponent } from "react";
import Home from "../../assets/img/screen_home.jpeg";
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
          MedicalHub is rerum obcaecati officia reprehenderit sed molestias ea
          quae quod, eligendi rem pariatur repudiandae delectus labore natus
          minus at voluptates facilis
        </p>
      </div>
      <div className={style.homeImg}>
        <img src={Home} alt="Home" />
      </div>
    </div>
  );
};

export default Main;
