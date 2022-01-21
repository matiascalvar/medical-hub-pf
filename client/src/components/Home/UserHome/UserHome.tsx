import userLogo from "../userLogo.png";
import s from "./UserHome.module.css";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";
import { payments, history} from "./data";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAppointments} from "../../../actions/index";


interface UserHomeProps{
    userName : string,
    id: number
}

export default function UserHome({userName, id}:UserHomeProps) : JSX.Element {

    const appoinments: any[] = useSelector((state:any) => state.appointments);
    const dispatch = useDispatch();

    useEffect ( () => {
        if(appoinments.length === 0){
            dispatch(getAppointments(id));
        }
    }, [appoinments]);

    function stateColor(state : string) : any{
        let color = state.toLowerCase() === "active" ? s.active : s.complete;
        return color;
    } 

    return (
        <div className={s.mainContainer}>
            <div className={s.userName}>
                  <span className={s.userNameText}>{userName}</span>
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
                                <span>Specialitie</span>
                                <span>State</span>
                        </div>
                        <div className={s.dataContainer}>
                            {
                                appoinments.length > 0? appoinments.map(data => (
                                    <div className={s.appointment} key={data.time}>
                                        <span className={s.time}>{data.time}</span>
                                        <span className={s.date}>{data.date}</span>
                                        <span className={s.medic}>{data.MedicalStaff.firstName}</span>
                                        <span className={s.specialitie}>{data.MedicalStaff.Specialitie.name}</span>
                                        <span className={stateColor(data.state)}>{data.state.toLowerCase()}</span>
                                        <button className={s.appointmentButton} type="button"><icons.BiChevronRight/></button>
                                    </div> 
                                )) : "There are no appoiments" 
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
                                    <div className={s.appointment} key={data.id}>
                                        <span className={s.hDate}>{data.date}</span>
                                        <span className={s.hType}>{data.type}</span>
                                        <span className={s.hMedic}>{data.medic}</span>
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