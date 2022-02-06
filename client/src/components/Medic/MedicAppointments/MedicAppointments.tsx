import React, { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./MedicAppointments.module.css";
import { Link } from "react-router-dom";
import {
  getPreferenceId,
  getPatientInfo,
  getAppointmentsPatients,
} from "../../../actions/index";
import Nav from "../../Home/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";

const MedicAppointments: FunctionComponent = () => {
  let dispatch = useDispatch();
  const userActive = useSelector((state: any) => state.userInfo);
  const activeUser = useSelector((state: any) => state.user);
  const appointments: any[] = useSelector(
    (state: any) => state.appointmentsPatients
  );

  useEffect(() => {
    dispatch(getAppointmentsPatients(48)); // Cambiar por ID de medico
    console.log(appointments);
  }, []);

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
          <Header userName="Asd" title="Appointments" />
        </div>
        <div>
          <div className={style.shiftCard}>
            <div className={style.subtitlesContainer}>
              <span>Time</span>
              <span>Date</span>
              <span>Patient</span>
              <span>Status</span>
              <span>Details</span>
            </div>
            <div className={style.dataContainer}>
              {appointments.length > 0 ? (
                appointments.map((data) => (
                  <div className={style.appointment} key={data.id}>
                    <span className={style.box}>{data.time.slice(0, -3)}</span>
                    <span className={style.box}>{data.date}</span>
                    <span className={style.box}>
                      {data.Patient.firstName + " " + data.Patient.lastName}
                    </span>
                    <div className={style.box}>
                      <span className={stateColor(data.state)}>
                        {data.state.toLowerCase()}
                      </span>
                    </div>
                    <Link to={`/home/medic/appointments/${data.id}`}>
                      <span>View more details</span>
                    </Link>
                  </div>
                ))
              ) : (
                <div className={style.noAppointments}>
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

export default MedicAppointments;
