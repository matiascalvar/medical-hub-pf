import React, { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./Appointments.module.css";
import { BsCalendarFill, BsCashStack, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  getPreferenceId,
  getPatientInfo,
  getAppointments,
} from "../../../actions/index";
import Header from "../UserHome/Header/Header";

const Appointments: FunctionComponent = () => {
  const patient = useSelector((state: any) => state.patientInfo);
  const activeUser = useSelector((state: any) => state.user);
  const appoinments: any[] = useSelector((state: any) => state.appointments);
  let dispatch = useDispatch();

  async function deleteAppointment(id: any) {
    try {
      let response = await axios.delete(
        `http://localhost:3001/appointments/${id}`
      );
      dispatch(getAppointments(patient.id));
    } catch (error) {
      console.log(error);
    }
  }
  function payState(pay: boolean): any {
    if (!pay) return false;
    return true;
  }

  function stateColor(state: string): any {
    let color =
      state.toLowerCase() === "active" ? style.active : style.complete;
    return color;
  }
  // Una funcion que use el boton, obtenga datos del appointment y redirija al pago
  
  function handleBtnPay(data: any) {
    console.log("data", data);
    dispatch(getPreferenceId("1", "500", data));
  }

  useEffect(() => {
    if (patient.id) {
      dispatch(getAppointments(patient.id));
    }
  }, [patient]);

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={patient.firstName} title="Appointments" />
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
                      {data.MedicalStaff.firstName +
                        " " +
                        data.MedicalStaff.lastName}
                    </span>
                    <span className={style.box}>
                      {data.MedicalStaff.Specialitie.name
                        ? data.MedicalStaff.Specialitie.name
                        : "None"}
                    </span>
                    <div className={style.box}>
                      <span className={stateColor(data.state)}>
                        {data.state.toLowerCase()}
                      </span>
                    </div>
                    {!payState(data.pay) ? (
                      <Link className={style.linkBox} to="/mercadopago">
                        <button
                          onClick={() => handleBtnPay(data)}
                          className={style.appointmentButton}
                          type="button"
                        >
                          <span className={style.pending}>&nbsp;Pay</span>

                          <BsCashStack className={style.cashIcon} />
                        </button>
                      </Link>
                    ) : (
                      <span className={style.paidOut}>Payout</span>
                    )}
                    <span className={style.box}>
                      <button
                        className={style.btnDelete}
                        onClick={() => deleteAppointment(data.id)}
                      >
                        <BsTrash />
                      </button>
                    </span>
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
