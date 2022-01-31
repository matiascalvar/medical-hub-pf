import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./Appointments.module.css";
import { BsCalendarFill, BsCashStack } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getPreferenceId } from "../../../actions/index";
import Header from "../UserHome/Header/Header";

const Appointments: FunctionComponent = () => {
  const userActive = useSelector((state: any) => state.userInfo);
  const appoinments: any[] = useSelector((state: any) => state.appointments);
  console.log(appoinments);

  function stateColor(state: string): any {
    let color =
      state.toLowerCase() === "active" ? style.active : style.complete;
    return color;
  }
  // Una funcion que use el boton, obtenga datos del appointment y redirija al pago
  let dispatch = useDispatch();
  function handleBtnPay(data: any) {
    console.log("data", data);
    dispatch(getPreferenceId("1", "500", data));
  }
  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={userActive.firstName} title="Appointments" />
        </div>
        <div className={style.btnContainer}>
          <Link to="/home/appointments/new">
            <button className={style.btnAppointment}>New appointment</button>
          </Link>
        </div>
        <div>
          <div className={style.shiftCard}>
            <div className={style.subtitlesContainer}>
              <span>Time</span>
              <span>Date</span>
              <span>Medic</span>
              <span>Speciality</span>
              <span>Status</span>
              <span>Pay</span>
            </div>
            <div className={style.dataContainer}>
              {appoinments.length > 0 ? (
                appoinments.map((data) => (
                  <div className={style.appointment} key={data.id}>
                    <span className={style.box}>{data.time}</span>
                    <span className={style.box}>{data.date}</span>
                    <span className={style.box}>
                      {data.MedicalStaff.firstName + " " + data.MedicalStaff.lastName}
                    </span>
                    <span className={style.box}>{data.MedicalStaff.Specialitie.name ? data.MedicalStaff.Specialitie.name : "None"}</span>
                    <div className={style.box}>
                    <span className={stateColor(data.state)}>
                      {data.state.toLowerCase()}
                    </span>
                    </div>
                    <Link className={style.linkBox} to="/mercadopago">
                      <button
                        onClick={() => handleBtnPay(data)}
                        className={style.appointmentButton}
                        type="button"
                      >
                        <span>&nbsp;Pay</span>

                        <BsCashStack className={style.cashIcon}/>
                      </button>
                    </Link>
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
