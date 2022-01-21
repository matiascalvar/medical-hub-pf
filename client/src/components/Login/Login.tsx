import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FaAt, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom"
import axios from 'axios';
import BackImg from "../../assets/img/back_login.jpeg";
import Logo from "../../assets/img/logo.svg";
import "../../styles/LoginPage/Login.css";

axios.defaults.withCredentials = true

const LoginPage: FunctionComponent = () => {
    const history = useHistory()

    const logUser = async function(newUser: any) {
        const options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        try {
            const response = await axios.post('http://localhost:3001/login',
                `email=${newUser.email}&password=${newUser.password}`,
                options)
            const user = {
                email: newUser.email,
                token: `${response.data.token_type} ${response.data.access_token}`
            }
            setErrors({err: ""})
            return user
        } catch(error: any) {
            if (error.response.status === 401) {
                setErrors({err: error.response.data.error})
            }
        }
    }

    const emptyInput = {
        email: '',
        password: '',
    }

    const [ errors, setErrors ] = React.useState({err: ""})

    const [ input, setInput ] = React.useState(emptyInput)

    const handleInputChange = function(e: any) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async function(e: any) {
        e.preventDefault()
        if (input.email && input.password) {
            const user: any = await logUser(input)
            if (user) {
                // agregar action para guardar token y email en store
                console.log(user)
            }
            setInput(emptyInput)
        } else {
            setErrors({err: "Completar usuario y contrasea"})
        }
    }
  
  return (
    <div className="loginContainer">
      <img src={BackImg} alt="fondo" className="imgFondo" />
      <div className="loginContainer__container">
        <form onSubmit={handleSubmit} className="container__form">
          <div className="form__logo">
            <h2>Log in</h2>
            <p className="login__text">
              Welcome back! Please login to your account!
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
          </div>
          <div className="form__password">
            <label className="password__title">Password</label>
            <div className="password__input">
              <input
                type="password"
                placeholder="at least 8 characters"
                className="loginInput__item"
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form__register">
            <div className="register__isMedic">
              <input type="checkbox" className="isMedic__check" />
              <label className="isMedic__title">I am Medic</label>
            </div>
          </div>
          <button type="submit" className="form__btn">Log in</button>
          <Link to="/register" className="btn__register">
            You are not registered yet?
          </Link>
        </form>
        {errors.err ? <p>{errors.err}</p> : null}
      </div>
    </div>
  );
};

export default LoginPage;
