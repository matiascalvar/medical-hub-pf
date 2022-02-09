import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./AppointmentDetail.module.css";
import { Link, useParams } from "react-router-dom";
import {
  getAppointments,
} from "../../../actions/index";
import Nav from "../Nav/Nav";
import Header from "../UserHome/Header/Header";
import { idText } from "typescript";
import Loading from "../../../assets/img/loading.gif"

export interface IUserPublicProfileRouteParams {
  id: any;
  name: string;
}

const AppointmentDetail: FunctionComponent = () => {
  let dispatch = useDispatch();
  const patient = useSelector((state: any) => state.patientInfo);
  const appointments: any[] = useSelector(
    (state: any) => state.appointments
  );
  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [appointmentDetail, setAppointmentDetail] = useState<any>(false);
  const [input, setInput] = useState<any>("");

  const  getPatientInfo = async (idPatient:any) =>  {
    const response = await axios.get(
      `http://localhost:3001/appointments/${idPatient}`
    );
    const app = response.data.find((a: any) => {
      return a.id == id;
    })
    console.log(app);
    setAppointmentDetail(app);
    return response.data;
  }

  useEffect(() => {
    getAppointments(id);
    getPatientInfo(patient.id);
    console.log("Patient", patient);
  }, []);


  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={patient.firstName} title="Appointment Detail" />
        </div>
        {appointmentDetail ? (
          <div className={style.detailContainer}>
            <div className={style.detailRow}>
              <div className={style.shiftCard}>
                <h3>Information</h3>
                <p>
                  Doctor Name:{" "}
                  <span className={style.pBlack}>
                    {appointmentDetail &&
                      appointmentDetail.MedicalStaff.firstName +
                        " " +
                        appointmentDetail.MedicalStaff.lastName}
                  </span>
                </p>
                <p>
                  Speciality:{" "}
                  
                    <span className={style.pBlack}>{appointmentDetail.MedicalStaff.Specialitie.name}</span>
                  
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
                  Status:
                  <span className={style.pBlack}>
                    {appointmentDetail && appointmentDetail.state.toLowerCase()}
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
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className={style.studiesContainer}>
              <div className={style.headerStudies}>
                <h3>Studies</h3>
              </div>
              <div className={style.dataContainer}>
                <div className={style.titles}>
                  <p>Name</p>
                  <p>PDF</p>
                </div>
                {appointmentDetail.Studies.length ? (
                  appointmentDetail.Studies.map((s: any, i: any) => {
                    return (
                      <div className={style.history} key={i}>
                        <span className={s.hBox}>{s.StudyType.name}</span>
                        <span className={s.hBox}>Download</span>
                      </div>
                    );
                  })
                ) : (
                  <p>No studies were found</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetail;
