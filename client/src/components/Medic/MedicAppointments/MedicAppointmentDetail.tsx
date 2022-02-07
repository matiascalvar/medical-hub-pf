import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./MedicAppointmentDetail.module.css";
import { Link, useParams } from "react-router-dom";
import {
  getPreferenceId,
  getAppointmentsPatients,
} from "../../../actions/index";
import Nav from "../../Home/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";
import { idText } from "typescript";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const MedicAppointmentDetail: FunctionComponent = () => {
  let dispatch = useDispatch();
  const userActive = useSelector((state: any) => state.userInfo);
  const activeUser = useSelector((state: any) => state.user);
  const appointments: any[] = useSelector(
    (state: any) => state.appointmentsPatients
  );
  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [appointmentDetail, setAppointmentDetail] = useState<any>("");

  useEffect(() => {
    if (!appointments.length) dispatch(getAppointmentsPatients(48)); // Cambiar ID sin hardcodear cuando podamos sacar la ID de la info del medico
    setAppointmentDetail(
      appointments.find((a) => {
        return a.id == id;
      })
    );
    console.log(appointments);
    console.log("app", appointmentDetail);
  }, [appointments]);

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName="Asd" title="Appointment Detail" />
        </div>
        {appointmentDetail ? (
          <div className={style.detailContainer}>
            <div className={style.detailRow}>
              <div className={style.shiftCard}>
                <h3>Patient Information</h3>
                <p>
                  Name:{" "}
                  <span className={style.pBlack}>
                    {appointmentDetail &&
                      appointmentDetail.Patient.firstName +
                        " " +
                        appointmentDetail.Patient.lastName}
                  </span>
                </p>
                <p>
                  Plan:{" "}
                  {appointmentDetail && appointmentDetail.Patient.PlanId ? (
                    <span className={style.pBlack}>
                      appointmentDetail.Patient.PlanId
                    </span>
                  ) : (
                    <span className={style.pBlack}>Normal</span>
                  )}
                </p>
                <p>
                  Date:{" "}
                  <span className={style.pBlack}>
                    {appointmentDetail && appointmentDetail.date}
                  </span>
                </p>
                <p>
                  Time:
                  <span className={style.pBlack}>
                    {appointmentDetail && appointmentDetail.time.slice(0, -3)}
                  </span>
                </p>
                <p>
                  Phone:
                  <span className={style.pBlack}>
                    {appointmentDetail && appointmentDetail.Patient.phone}
                  </span>
                </p>
              </div>
              <div className={style.reviewContainer}>
                <h3>Review</h3>
                {appointmentDetail.AppointmentDetail ? (
                  <p>{appointmentDetail.AppointmentDetail.details} </p>
                ) : (
                  <div className={style.reviewP}>
                    <p>
                      No review avaialable.
                      <Link to={`/home/medic/appointments/review/${id}`}>
                        Add review
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className={style.studiesContainer}>
              <h3>Studies</h3>
              <div className={style.text}>
                {appointmentDetail.Studies.length ? (
                  appointmentDetail.Studies.map((s: any, i: any) => {
                    return <p>Studie {i}</p>;
                  })
                ) : (
                  <p>No studies were found</p>
                )}
              </div>
              <Link to={`/home/medic/appointments/studies/${id}`}>
                Add Studie
              </Link>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default MedicAppointmentDetail;
