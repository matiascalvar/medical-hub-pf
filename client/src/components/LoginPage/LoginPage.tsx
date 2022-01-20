import { Link } from 'react-router-dom';
import {FaAt, FaLock} from 'react-icons/fa';
import BackImg from '../../assets/LoginPage/back.jpg';
import Logo from '../../assets/LoginPage/logo_sin.png';
import "../../styles/LoginPage/LoginPage.css";

const LoginPage = () => {
  return (
    <div className='divContainer'>
      <img src={BackImg} alt="fondo" className="imgFondo"/>
      <div className="container">
        <div className="container__logo">
          <img src={Logo} className="logo__medicalHub" />
        </div>
        <div className="container__form">
          <form className="form">
            <div className='form__title'>
              <img src={Logo} className="formLogo__item" />
              <h2 className="formTitle__item">LOGIN</h2>
            </div>
            <div className="form__user">
              <label className="user__title">EMAIL</label>
              <div className="user__input">
                <input type="text" className="input__item" />
                <FaAt className='input__icons'/>
              </div>
            </div>
            <div className="form__password">
              <label className="password__title">PASSWORD</label>
              <div className="password__input">
                <input type="password" className="input__item"/>
                <FaLock className='input__icons'/>
              </div>
            </div>
            <div className="form__register">
              <Link 
                to="/register" 
                className="btn__register"
              >You are not registered yet?</Link>
            </div>
            <button className="form__btn">GET INTO</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;