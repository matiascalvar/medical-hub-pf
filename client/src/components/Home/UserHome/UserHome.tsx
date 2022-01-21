import userLogo from "../userLogo.png";
import s from "./UserHome.module.css";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";
import {appoinments, payments, history} from "./data";


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
                        <div className={s.subtitlesContainer}>
                                <span>Time</span>
                                <span>Date</span>
                                <span>Medic</span>
                        </div>
                        <div className={s.dataContainer}>
                            {
                                appoinments.map(data => (
                                    <div className={s.appointment} key={data.time}>
                                        <span className={s.time}>{data.time}</span>
                                        <span className={s.date}>{data.date}</span>
                                        <span className={s.medic}>{data.medic}</span>
                                        <button className={s.appointmentButton} type="button"><icons.BiChevronRight/></button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={s.historyCard}>
                        <span className={s.cardTitle}>
                            <icons.BiHistory className={s.icon}/>
                            Study History
                        </span>
                        <div className={s.subtitlesContainer}>
                                <span>Date</span>
                                <span>Study</span>
                                <span>Medic</span>
                        </div>
                        <div className={s.dataContainer}>
                            {
                                history.map(data =>(
                                    <div className={s.appointment} key={data.time}>
                                        <span className={s.pay}>{data.date}</span>
                                        <span className={s.amount}>{data.type}</span>
                                        <span className={s.medicName}>{data.medic}</span>
                                        <icons.BiHistory className={s.detailIcon}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={s.paymentsCard}>
                    <span className={s.cardTitle}>
                        <icons.BiMoney className={s.icon}/>
                        Payments
                    </span>
                    <div className={s.subtitlesContainer}>
                                <span>Study</span>
                                <span>Amount</span>
                                <span>State</span>
                        </div>
                    <div className={s.dataContainer}>
                       {
                           payments.map(data =>(
                               <div key={data.amount} className={s.payments}>
                                   <span className={s.pay}>{data.pay}</span>
                                   <span className={s.amount}>${data.amount}</span>
                                   <span className={s.check}>{data.pending? "Pending" : <span>paid out<icons.BiCheck/></span>}</span>
                                   <icons.BiDetail className={s.detailIcon}/>
                               </div>
                           ))
                       }

                    </div>
                </div>

            </div>

        </div>
    )



}