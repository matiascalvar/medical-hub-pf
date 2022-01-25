import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./NewAppointment.module.css";
import userLogo from "../userLogo.png";
import { Link } from "react-router-dom";

const NewAppointment: FunctionComponent = () => {
  const userActive = useSelector((state: any) => state.userInfo);
  useEffect(() => {}, []);
  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <span className={style.userNameText}>{userActive.firstName}</span>
          <img className={style.userLogo} src={userLogo} alt="" />
        </div>
        <h1 className={style.title}>Appointments</h1>
      </div>
    </div>
  );
};

export default NewAppointment;
