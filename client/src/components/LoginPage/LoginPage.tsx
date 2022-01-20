import { Link } from 'react-router-dom';
import {FaAt, FaLock} from 'react-icons/fa';
import BackImg from '../../assets/img/back.jpg';
import Logo from '../../assets/img/logo.svg';
import "../../styles/LoginPage/LoginPage.css";

const LoginPage = () => {
  return (
    <div className='loginContainer'>
      <img src={BackImg} alt="fondo" className="imgFondo"/>
      <div className="loginContainer__container">
        <form className="container__form">
          <div className='form__logo'>
            <img src={Logo} className="logo__img" />
            <p className='login__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, fugit.</p>
          </div>
          <div className="form__user">
            <label className="user__title">Email</label>
            <div className="user__input">
              <input type="text" className="loginInput__item" />
              <FaAt className='loginInput__icons'/>
            </div>
          </div>
          <div className="form__password">
            <label className="password__title">Password</label>
            <div className="password__input">
              <input type="password" className="loginInput__item"/>
              <FaLock className='loginInput__icons'/>
            </div>
          </div>
          <div className="form__register">
            <Link 
              to="/register" 
              className="btn__register"
            >You are not registered yet?</Link>
            <div className="register__isMedic">
              <input type="checkbox" className='isMedic__check'/>
              <label className='isMedic__title'>I am Medic</label>
            </div>
          </div>
          <button className="form__btn">LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;