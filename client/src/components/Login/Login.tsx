import React, { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAt, FaLock } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logUser } from "../../actions";
import axios from "axios";
import BackImg from "../../assets/img/back_login.jpeg";
import Logo from "../../assets/img/logo.svg";
import "../../styles/LoginPage/Login.css";

axios.defaults.withCredentials = true;

const LoginPage: FunctionComponent = () => {
  const activeUser = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser = async function (newUser: any) {
    const options = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        `email=${newUser.email}&password=${newUser.password}`,
        options
      );
      const user = {
        email: newUser.email,
        token: `${response.data.token_type} ${response.data.access_token}`,
      };
      console.log("response data", response);
      setErrors(emptyInput);
      return user;
    } catch (error: any) {
      setServer(true);
      return false;
    }
  };

  const emptyInput = {
    email: "",
    password: "",
  };

  const [errors, setErrors] = React.useState(emptyInput);

  const [input, setInput] = React.useState(emptyInput);

  const [server, setServer] = React.useState(false);

  useEffect(() => {
    console.log("input", input);
    console.log("pass", input.password.length);
    console.log("errors", errors);
  }, [input, errors]);

  const handleInputChange = function (e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validateForm();
  };

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    if (!errors.email && !errors.password) {
      const user: any = await loginUser(input);
      if (user) {
        dispatch(logUser(user));
        history.push("/home");
      }
      setInput(emptyInput);
    }
  };

  const validateForm = () => {
    let errors: any = {};
    if (!input.email) {
      errors.email = "Email is required";
    } else if (
      !/^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(input.email)
    ) {
      errors.email = "Must be a valid email";
    }
    if (!input.password) {
      errors.password = "Password is required";
    } else if (!/(?=.{7,})/.test(input.password)) {
      errors.password = "Password must be at least 8 characters";
    }
    setErrors(errors);
  };

  return (
    <div className="loginContainer">
      <img src={BackImg} alt="fondo" className="imgFondo" />
      <div className="loginContainer__container">
        <form onSubmit={handleSubmit} className="container__form">
          <div className="form__logo">
            <h2>Log in</h2>
            <p className="login__text">
              Welcome back! Please login to your account
            </p>
          </div>
          <div className="form__user">
            <label className="user__title">Email</label>
            <div className="user__input">
              <input
                type="email"
                placeholder="email@domain.com"
                className="loginInput__item"
                name="email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && <p className="loginErrors">{errors.email}</p>}
          </div>
          <div className="form__password">
            <label className="password__title">Password</label>
            <div className="password__input">
              <input
                type="password"
                placeholder="password..."
                className="loginInput__item"
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
            </div>
            {errors.password && (
              <p className="loginErrors">{errors.password}</p>
            )}
          </div>
          <div className="form__register">
            <input type="checkbox" className="isMedic__check" />
            <label className="isMedic__title">I am a Medic</label>
          </div>
          <div className="form__bottom">
            <button type="submit" className="form__btn">
              Log in
            </button>
            {server && <p className="loginErrors">Invalid email or password</p>}
            <Link to="/register" className="btn__register">
              <p>
                Don't have an account?{" "}
                <span className="blue_text">Sign up</span>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
