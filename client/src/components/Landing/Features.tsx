import React, { FunctionComponent } from "react";
import style from "./Features.module.css";
import { BiPlusMedical } from "react-icons/bi";

const Features: FunctionComponent = () => {
  return (
    <div className={style.contaier}>
      <h1>Features</h1>
      <div className={style.text}>
        <div className={style.colLeft}>
          <div className={style.colImg}>
            <img src="https://i.imgur.com/CoRV60O.png" alt="Payments" />
          </div>
          <div className={style.colText}>
            <span className={style.icons}>
              <BiPlusMedical />
            </span>
            <div className={style.textInside}>
              <h2>
                Last <br></br>Studies
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                consectetur explicabo culpa eius aliquam dicta quis harum.
              </p>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.colRight}>
          <div className={style.colImg}>
            <img src="https://i.imgur.com/CoRV60O.png" alt="Payments" />
          </div>
          <div className={style.colText}>
            <span className={style.icons}>
              <BiPlusMedical />
            </span>
            <div className={style.textInside}>
              <h2>
                Last <br></br>Studies
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                consectetur explicabo culpa eius aliquam dicta quis harum.
              </p>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.colLeft}>
          <div className={style.colImg}>
            <img src="https://i.imgur.com/CoRV60O.png" alt="Payments" />
          </div>
          <div className={style.colText}>
            <span className={style.icons}>
              <BiPlusMedical />
            </span>
            <div className={style.textInside}>
              <h2>
                Last <br></br>Studies
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                consectetur explicabo culpa eius aliquam dicta quis harum.
              </p>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
