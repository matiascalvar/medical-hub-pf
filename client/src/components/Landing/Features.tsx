import React, { FunctionComponent } from "react";
import style from "./Features.module.css";
import { BiPlusMedical } from "react-icons/bi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { ImHistory } from "react-icons/im";

const Features: FunctionComponent = () => {
  return (
    <div className={style.contaier}>
      <h1>Features</h1>
      <div className={style.text}>
        <div className={style.colLeft}>
          <div className={style.colImg}>
            <img src="https://i.imgur.com/7Aveqv8.png" alt="Personal Account" />
          </div>
          <div className={style.colText}>
            <span className={style.icons}>
              <RiAccountPinCircleFill />
            </span>
            <div className={style.textInside}>
              <h2>
                Personal<br></br>Account
              </h2>
              <ul>
                <li>Create your own personal profile</li>
                <li>Edit your personal information</li>
                <li>
                  Have access to a preview of appointments, medical records, and
                  payments
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.colRight}>
          <div className={style.colImg}>
            <img src="https://i.imgur.com/EWsLVMw.png" alt="Appointments" />
          </div>
          <div className={style.colText}>
            <span className={style.icons}>
              <BsFillCalendarCheckFill />
            </span>
            <div className={style.textInside}>
              <h2>
                Make an<br></br>Appointment
              </h2>
              <ul>
                <li>Filter by medical specialty</li>
                <li>Choose a date and an hour for your appointment</li>
                <li>Pay it with our integrate system</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.colLeft}>
          <div className={style.colImg}>
            <img src="https://i.imgur.com/yApR71T.png" alt="Studies" />
          </div>
          <div className={style.colText}>
            <span className={style.icons}>
              <ImHistory />
            </span>
            <div className={style.textInside}>
              <h2>
                Medical<br></br>Records
              </h2>
              <ul>
                <li>See your medical records with detail</li>
                <li>Upload your studies results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
