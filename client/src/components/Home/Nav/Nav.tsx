import s from "./Nav.module.css";
import Logo from "../../../assets/img/minimalLogo.png";
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
                    <div className={s.tooltip}>Home</div> 
                </div>
                <div className={s.navButton}>
                    <icons.BiUser className={s.icon}/>
                    <div className={s.tooltip}>My Account</div> 
                </div>
                <div className={s.navButton}>
                    <iconsb.MdComputer className={s.icon}/>  
                    <div className={s.tooltip}>Appointments</div> 
                </div>
                <div className={s.navButton}>
                    <TiTick className={s.icon}/>
                    <div className={s.tooltip}>Coverage</div> 
                </div>
                <div className={s.navButton}>
                    <icons.BiMoney className={s.icon}/>
                    <div className={s.tooltip}>Services</div> 
                </div>
            </div>
        </nav>
    )

}