import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logout } from "../../actions/index";
import s from "./ResetPasword.module.css";
import Logo from "../../assets/img/minimalLogo.svg";

export default function ResetPassword(): JSX.Element {
  const activeUser = useSelector((state: any) => state.user);
  const response = useSelector((state: any) => state.changePassResponse);
  const dispatch = useDispatch();

  const [error, setError] = React.useState("");
  const [input, setInput] = React.useState({
    password_1: "",
    password_2: "",
  });

  const handleInputChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.password_1 !== input.password_2) {
      setError("Password's dont match.");
    } else if (input.password_1.length === 0 || input.password_2.length === 0) {
      setError("Both fields are required.");
    } else {
      submitPassword(input);
    }
  };

  const submitPassword = async (input: any) => {
    const data = {
      password: input.password_1,
    };
    dispatch(changePassword(activeUser, data));
  };

  return (
    <div className={s.container}>
      <div className={s.main}>
        <img className={s.logo} src={Logo} alt="logo" />
        <h1 className={s.title}>Welcome!</h1>
        <h4 className={s.subtitle}>Change Password</h4>
        <form className={s.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              name="password_1"
              value={input.password_1}
              autoComplete="off"
              onChange={handleInputChange}
              placeholder="New Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="password_2"
              value={input.password_2}
              autoComplete="off"
              onChange={handleInputChange}
              placeholder="Repeat Password"
            />
          </div>
          {error.length > 0 ? <span className={s.error}>{error}</span> : ""}
          <button className={s.submitButton} type="submit">
            Send Changes
          </button>
        </form>
        {response.message ? (
          <div className={s.messageContainer}>
            <span className={s.message}>Successfully modified password</span>
            <button
              className={s.returnButton}
              onClick={() => dispatch(logout())}
            >
              Return
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
