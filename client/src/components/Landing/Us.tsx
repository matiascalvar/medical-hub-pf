import React, { FunctionComponent } from "react";
import style from "./Us.module.css";
import { BiPlusMedical } from "react-icons/bi";

const Us: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <h1>Why us?</h1>
      <div className={style.text}>
        <div className={style.column}>
          <span className={style.icons}>
            <BiPlusMedical />
          </span>
          <div>
            <h2>Lorem Ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
              labore a laboriosam omnis esse nostrum fuga. Nisi tempora a,
              officia animi, inventore ducimus in, assumenda doloribus
              blanditiis at repellat maiores!
            </p>
          </div>
        </div>
        <div className={style.column}>
          <span className={style.icons}>
            <BiPlusMedical />
          </span>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            labore a laboriosam omnis esse nostrum fuga. Nisi tempora a, officia
            animi, inventore ducimus in, assumenda doloribus blanditiis at
            repellat maiores!
          </p>
        </div>
        <div className={style.column}>
          <span className={style.icons}>
            <BiPlusMedical />
          </span>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            labore a laboriosam omnis esse nostrum fuga. Nisi tempora a, officia
            animi, inventore ducimus in, assumenda doloribus blanditiis at
            repellat maiores!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Us;
