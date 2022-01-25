import { logout } from "../../../actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import s from "./Nav.module.css";
import Logo from "../../../assets/img/minimalLogo.png";
import * as icons from "react-icons/bi";
import * as iconsb from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Nav(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = function (e: any) {
    dispatch(logout());
    history.push("/");
  };

  return (
    <nav className={s.nav}>
      <img className={s.logo} src={Logo} alt="" />
      <div className={s.buttonsContainer}>
        <div className={s.navButton}>
          <Link to="/home">
            <icons.BiHome className={s.icon} />
          </Link>
          <div className={s.tooltip}>Home</div>
        </div>
        <div className={s.navButton}>
          <icons.BiUser className={s.icon} />
          <div className={s.tooltip}>My Account</div>
        </div>
        <div className={s.navButton}>
          <Link to="/home/appointments">
            <iconsb.MdComputer className={s.icon} />
            <div className={s.tooltip}>Appointments</div>
          </Link>
        </div>
        <div className={s.navButton}>
          <TiTick className={s.icon} />
          <div className={s.tooltip}>Coverage</div>
        </div>
        <div className={s.navButton}>
          <icons.BiMoney className={s.icon} />
          <div className={s.tooltip}>Services</div>
        </div>
        <button onClick={handleClick}>LOGOUT</button>
      </div>
    </nav>
  );
}
