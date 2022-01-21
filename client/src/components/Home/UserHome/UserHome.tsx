import userLogo from "../userLogo.png";
import s from "./UserHome.module.css";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";

export default function UserHome() : JSX.Element {


    return (
        <div className={s.mainContainer}>
            <div className={s.userName}>
                  <span className={s.userNameText}>UserName</span>
                  <img className={s.userLogo} src={userLogo} alt="" />
            </div>
            <h1 className={s.title}>Home</h1>
            <div className={s.cardsContainer}>
                <div>
                    <div className={s.shiftCard}>
                        <span className={s.cardTitle}>
                            <iconsb.MdComputer className={s.icon}/> 
                            Appointments
                        </span>
                        <div className={s.dataContainer}>
                            You have no pending shifts
                        </div>
                    </div>
                    <div className={s.historyCard}>
                        <span className={s.cardTitle}>
                            <icons.BiHistory className={s.icon}/>
                            Study History
                        </span>
                        <div className={s.dataContainer}>
                             you have no studies
                        </div>
                    </div>
                </div>
                <div className={s.paymentsCard}>
                    <span className={s.cardTitle}>
                        <icons.BiMoney className={s.icon}/>
                        Payments
                    </span>
                    <div className={s.dataContainer}>
                        You have no payments made or pending
                    </div>
                </div>

            </div>

        </div>
    )



}