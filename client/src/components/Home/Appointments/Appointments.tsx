import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./Appointments.module.css";
import userLogo from "../userLogo.png";
import { BsCalendarFill } from "react-icons/bs";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";
import { Link } from "react-router-dom";

const Appointments: FunctionComponent = () => {
  const userActive = useSelector((state: any) => state.userInfo);
  const appoinments: any[] = useSelector((state: any) => state.appointments);
  console.log(userActive);

  function stateColor(state: string): any {
    let color =
      state.toLowerCase() === "active" ? style.active : style.complete;
    return color;
  }
  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <span className={style.userNameText}>{userActive.firstName}</span>
          <img className={style.userLogo} src={userLogo} alt="" />
        </div>
        <h1 className={style.title}>Appointments</h1>

        <Link to="/home/appointments/new">
          <button className={style.btnAppointment}>New appointment</button>
        </Link>
        <div>
          <div className={style.shiftCard}>
            <div className={style.subtitlesContainer}>
              <span>Time</span>
              <span>Date</span>
              <span>Medic</span>
              <span>Speciality</span>
              <span>Status</span>
            </div>
            <div className={style.dataContainer}>
              {appoinments.length > 0 ? (
                appoinments.map((data) => (
                  <div className={style.appointment} key={data.id}>
                    <span className={style.time}>{data.time}</span>
                    <span className={style.date}>{data.date}</span>
                    <span className={style.medic}>
                      {data.MedicalStaff.firstName}
                    </span>
                    <span className={style.specialitie}>Rompe aca</span>
                    <span className={stateColor(data.state)}>
                      {data.state.toLowerCase()}
                    </span>
                    <button className={style.appointmentButton} type="button">
                      <icons.BiChevronRight />
                    </button>
                  </div>
                ))
              ) : (
                <div className={style.noAppointments}>
                  <BsCalendarFill />
                  <p>No appointments available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
