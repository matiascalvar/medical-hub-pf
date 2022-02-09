import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./MedicAppointmentDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { BiDownload } from "react-icons/bi";
import {
  getPreferenceId,
  getAppointmentsPatients,
} from "../../../actions/index";
import Nav from "../MedicHome/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";
import { idText } from "typescript";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const MedicAppointmentDetail: FunctionComponent = () => {

  const planChange = (number: number) => {
    if (number === 0) return "Particular"
    if (number === 1) return "Silver"
    if (number === 2) return "Gold"
    if (number === 3) return "Platinium"
  }

  let dispatch = useDispatch();
  const medicInfo = useSelector((state: any) => state.medicInfo);
  const appointments: any[] = useSelector(
    (state: any) => state.appointmentsPatients
  );
  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [appointmentDetail, setAppointmentDetail] = useState<any>("");

  useEffect(() => {
    if (!appointments.length) dispatch(getAppointmentsPatients(medicInfo.id));
    setAppointmentDetail(
      appointments.find((a) => {
        return a.id == id;
      })
    );
    console.log("APPOINTMENTS", appointments);
  }, [appointments]);
  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={medicInfo.firstName} title="Appointment Detail" />
        </div>
        {appointmentDetail ? (
          <div className={style.detailContainer}>
            <div className={style.detailRow}>
              <div className={style.shiftCard}>
                <h3>Information</h3>
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
                      {planChange(appointmentDetail.Patient.PlanId)}
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
                <Link
                  to={`/home/medic/patientHistory/${appointments[0].Patient.id}`}
                >View History</Link>
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
              <div className={style.studiesContainer}>
              <div className={style.headerStudies}>
                <h3>Studies</h3>
                <Link className={style.link} to={`/home/medic/appointments/studies/${id}`}>
                  New Study
                </Link>
              </div>
              <div className={style.dataContainer}>
                <div className={style.titles}>
                  <span className={style.titleBox}>Name</span>
                  <span className={style.titleBox}>PDF</span>
                </div>
                {appointmentDetail.Studies.length ? (
                  appointmentDetail.Studies.map((s: any, i: any) => {
                    if(s.state === 'COMPLETED'){
                      return (
                        <div className={style.history} key={i}>
                          <span className={style.hBox}>{s.StudyType.name}</span>
                          <span className={style.hBox}><a title='Download Study'
                              href={`/storage/${s.studyPDF}`} 
                              target="_blank"
                            ><BiDownload/></a></span>
                          
                        </div>
                      );
                    }else if(s.state === 'ACTIVE'){
                      return (
                        <div className={style.history} key={i}>
                          <span className={style.hBox}>{s.StudyType.name}</span>
                      <span className={style.hBox}>Study not available yet.</span>
                      </div>
                      )
                      
                    }
                    
                  })
                ) : (
                  <p>No studies were found</p>
                )}
              </div>
            </div>
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