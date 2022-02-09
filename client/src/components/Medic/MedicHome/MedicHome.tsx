import Header from "../../Home/UserHome/Header/Header"
import Nav from "./Nav/Nav";
import s from "./MedicHome.module.css";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";
import {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointmentsPatients } from "../../../actions/index";
import { Link } from "react-router-dom";
import addDays from "../../../assets/addDays";

interface UserHomeProps {
  userName: string;
  id: number;
}

export default function ({ userName, id }: UserHomeProps): JSX.Element {

  const appoinments: any[] = useSelector((state: any) => state.appointmentsPatients);
  const dispatch = useDispatch();
  console.log(appoinments);
  useEffect(() => {
    if (appoinments && appoinments.length === 0 && id) {
      dispatch(getAppointmentsPatients(id));
    }

  }, [appoinments, id]);

  function payState (pay : boolean) : any {
    if(!pay){
      return {
        text :"Pending",
        style: s.pending
      }
    }
    return{
      text: "Paid out",
      style: s.paidOut
    } 
  }
  
  function stateColor(state: string): any {
    let color = state.toLowerCase() === "active" ? s.active : s.complete;
    return color;
  }

  let nextAppointments: any[] = [];
  let today = new Date();
  if(appoinments?.length){
    nextAppointments = appoinments.filter(a => a.date >= addDays(today,0))
  } 

  return (
    <div className={s.mainContainer}>
     
      <div className={s.header}>
        <Header userName={userName} title="Home" />
        <div>
          <div className={s.shiftCard}>
            <span className={s.cardTitle}>
              <iconsb.MdComputer className={s.icon} />
              Next Appointments
            </span>
            <div className={s.subtitlesContainer}>
              <span className={s.appointmentBox}>Time</span>
              <span className={s.appointmentBox}>Date</span>
              <span className={s.appointmentBox}>Patient</span>
              <span className={s.appointmentBox}>Pay</span>
              <span className={s.appointmentBox}>Details</span>
            </div>
            <div className={s.dataContainer}>
            { appoinments && appoinments.length > 0
                ? nextAppointments.map((data) => (
                    <div className={s.appointment} key={data.id}>
                      <span className={s.appointmentBox}>{data.time}</span>
                      <span className={s.appointmentBox}>{data.date}</span>
                      <span className={s.appointmentBox}>
                        {data.Patient.firstName +
                          " " +
                          data.Patient.lastName}
                      </span>
                      <div className={s.appointmentBox}>
                       <span className={payState(data.pay).style}>{payState(data.pay).text}</span> 
                      </div>
                      <div className={s.appointmentBoxe}>
                        <Link 
                          to={`/home/medic/appointments/${data.id}`}
                          className={s.LinkBtn}
                        >
                          <span className={s.btnRedirect} >View more</span>
                        </Link>
                      </div>
                    </div>
                  ))
                : "There are no appoiments" 
            }
            </div>
          </div>
        </div>
      </div>
    </div>
      )


}