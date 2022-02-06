import { logout } from "../../../actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import s from "./Nav.module.css";
import Logo from "../../../assets/img/minimalLogo.png";
import * as icons from "react-icons/bi";
import * as iconsb from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import Coverage from "../Coverage/Coverage";
import { useState } from "react";

export default function Nav(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  // state para abrir el modal
  const [isOpen, setIsOpen] = useState(false);
  const handleBtn = () => {
    setIsOpen(true)
  }

  const handleClick = function (e: any) {
    dispatch(logout());
    history.push("/");
  };
  return (
    <nav className={s.nav}>
      <Coverage open={isOpen} onClose={() => setIsOpen(false)} />
      <img className={s.logo} src={Logo} alt="" />
      <div className={s.buttonsContainer}>
        <div className={s.navButton}>
          <Link className={s.link} to="/home">
            <icons.BiHome className={s.icon} />
          </Link>
          <div className={s.tooltip}>Home</div>
        </div>
        <div className={s.navButton}>
          <Link className={s.link} to="/home/userProfile">
            <icons.BiUser className={s.icon} />
          </Link>
          <div className={s.tooltip}>My Account</div>
        </div>
        <div className={s.navButton}>
          <Link className={s.link} to="/home/appointments">
            <iconsb.MdComputer className={s.icon} />
            <div className={s.tooltip}>Appointments</div>
          </Link>
        </div>
        <div onClick={() => handleBtn()} className={s.navButton}>
          <TiTick className={s.icon} />
          <div className={s.tooltip}>Coverage</div>
        </div>
        <div className={s.navButton}>
          <Link className={s.link} to="/home/history">
            <icons.BiMoney className={s.icon} />
            <div className={s.tooltip}>History</div>
          </Link>
        </div>
        <button className={s.logout} onClick={handleClick}>
          Logout
        </button>
      </div>
    </nav>
  );
}
