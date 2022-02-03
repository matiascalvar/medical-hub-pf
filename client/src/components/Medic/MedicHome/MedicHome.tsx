import Header from "../../Home/UserHome/Header/Header"
import Nav from "./Nav/Nav";
import s from "./MedicHome.module.css";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";
import {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, getHistory } from "../../../actions/index";

interface UserHomeProps {
  userName: string;
  id: number;
}

export default function ({ userName, id }: UserHomeProps): JSX.Element {

  const appoinments: any[] = useSelector((state: any) => state.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (appoinments && appoinments.length === 0) {
      dispatch(getAppointments(id));
    }

  }, [appoinments]);

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

  return (
    <div className={s.mainContainer}>
      <div>
        <Nav/>
      </div>
      <div className={s.header}>
        <Header userName={userName} title="Home" />
        <div>
          <div className={s.shiftCard}>
            <span className={s.cardTitle}>
              <iconsb.MdComputer className={s.icon} />
              Appointments
            </span>
            <div className={s.subtitlesContainer}>
              <span className={s.appointmentBox}>Time</span>
              <span className={s.appointmentBox}>Date</span>
              <span className={s.appointmentBox}>Medic</span>
              <span className={s.appointmentBox}>Specialitie</span>
              <span className={s.appointmentBox}>Pay</span>
              <span className={s.appointmentBox}>State</span>
            </div>
            <div className={s.dataContainer}>
            {appoinments && appoinments.length > 0
                ? appoinments.map((data) => (
                    <div className={s.appointment} key={data.id}>
                      <span className={s.appointmentBox}>{data.time}</span>
                      <span className={s.appointmentBox}>{data.date}</span>
                      <span className={s.appointmentBox}>
                        {data.MedicalStaff.firstName +
                          " " +
                          data.MedicalStaff.lastName}
                      </span>
                      <span className={s.appointmentBox}>
                        {data.MedicalStaff.Specialitie
                          ? data.MedicalStaff.Specialitie.name
                          : "None"}
                      </span>
                      <div className={s.appointmentBox}>
                       <span className={payState(data.pay).style}>{payState(data.pay).text}</span> 
                      </div>
                      <div className={s.appointmentBox}>
                        <span className={stateColor(data.state)}>{data.state.toLowerCase()}</span>
                        <button className={s.appointmentButton} type="button">
                          <icons.BiChevronRight />
                        </button>
                      </div>
                    </div>
                  ))
                : "There are no appoiments"}
            </div>
          </div>
        </div>
      </div>
    </div>
      )


}