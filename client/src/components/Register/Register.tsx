import React, { FunctionComponent } from "react";
import "../../styles/LoginPage/Register.css";
import {
  FaAt,
  FaLock,
  FaUserAlt,
  FaUserCircle,
  FaRegIdCard,
  FaPhoneSquareAlt,
  FaGoogle,
} from "react-icons/fa";

const CreatePage: FunctionComponent = () => {
  return (
    <div className="containerCreate">
      <div className="containerCreate__register">
        <h2 className="register__title">Create Account</h2>
        <div className="createRegister__redes">
          <div className="redes">
            <FaGoogle className="redes__item" />
          </div>
          <p className="redes__title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="container__register">
          <div className="register__item">
            <input
              type="text"
              className="register__input"
              placeholder="Email"
            />
            <FaAt className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="password"
              className="register__input"
              placeholder="Password"
            />
            <FaLock className="register__icons" />
          </div>
          <div className="register__item">
            <input type="text" className="register__input" placeholder="Name" />
            <FaUserAlt className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="text"
              className="register__input"
              placeholder="Last Name"
            />
            <FaUserCircle className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="number"
              className="register__input"
              placeholder="DNI"
            />
            <FaRegIdCard className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="number"
              className="register__input"
              placeholder="Phone"
            />
            <FaPhoneSquareAlt className="register__icons" />
          </div>
          <div className="register__item register__select">
            <label className="plan__title">Plans:</label>
            <select name="plan" className="register__plan">
              <option value="particular" className="plan__option">
                Particular
              </option>
              <option value="planA" className="plan__option">
                Plan A
              </option>
              <option value="planB" className="plan__option">
                Plan B
              </option>
            </select>
          </div>
          <button className="register__button">REGISTER</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
