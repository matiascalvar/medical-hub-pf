import BackImg from '../../assets/LoginPage/back.jpg';
import Logo from '../../assets/LoginPage/logo_sin.png';
import "../../styles/LoginPage/CreatePage.css";

const CreatePage = () => {
  return(
    <div className='containerCreate'>
      <img src={BackImg} className='containerCreate__img'/>
      <div className="containerCreate__register">
        <img src={Logo} className='register__logo'/>
        <div className="register__item">
          <label className="item__title">EMAIL</label>
          <div className="item__input">
            <input type="text" className="input" />
          </div>
        </div>
        <div className="register__item">
          <label className="item__title">USERNAME</label>
          <div className="item__input">
            <input type="text" className="input" />
          </div>
        </div>
        <div className="register__item">
          <label className="item__title">LAST NAME</label>
          <div className="item__input">
            <input type="text" className="input" />
          </div>
        </div>
        <div className="register__item">
          <label className="item__title">NAME</label>
          <div className="item__input">
            <input type="text" className="input" />
          </div>
        </div>
        <div className="register__item">
          <label className="item__title">DNI</label>
          <div className="item__input">
            <input type="number" className="input" />
          </div>
        </div>
        <div className="register__item">
          <label className="item__title">CELLPHONE</label>
          <div className="item__input">
            <input type="number" className="input" />
          </div>
        </div>
        <button className="register__button">REGISTER</button>
      </div>
    </div>
  )
}

export default CreatePage;