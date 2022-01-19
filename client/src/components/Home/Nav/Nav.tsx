import s from "./Nav.module.css";
import Logo from "./logo.svg";
import * as icons from "react-icons/bi";
import * as iconsb from "react-icons/md";
import { TiTick } from "react-icons/ti";
export default function Nav() : JSX.Element{
 

    return (
        <nav className={s.nav}>
            <img className={s.logo} src={Logo} alt="" />
            <div className={s.buttonsContainer}>
                <div className={s.navButton}>
                    <icons.BiHome className={s.icon}/>
                    Home
                </div>
                <div className={s.navButton}>
                    <icons.BiUser className={s.icon}/>
                    My Account
                </div>
                <div className={s.navButton}>
                    <iconsb.MdComputer className={s.icon}/>  
                    Shifts
                </div>
                <div className={s.navButton}>
                    <TiTick className={s.icon}/>
                    Coverage
                </div>
                <div className={s.navButton}>
                    <icons.BiMoney className={s.icon}/>
                    Services
                </div>
            </div>
        </nav>
    )

}