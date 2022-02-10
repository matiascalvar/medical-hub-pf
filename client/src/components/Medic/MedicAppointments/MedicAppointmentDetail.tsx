import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./MedicAppointmentDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { BiDownload } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import {
  getPreferenceId,
  getAppointmentsPatients,
  URL_DEPLOY,
} from "../../../actions/index";
import Nav from "../MedicHome/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";
import { idText } from "typescript";
import NewStudie from "./NewStudie";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const MedicAppointmentDetail: FunctionComponent = () => {
  const [studyModal, setStudyModal] = useState<any>(false);
  const closeStudyModal = () => {
    return setStudyModal(false);
  };

  const planChange = (number: number) => {
    if (number === 1) return "Particular";
    if (number === 2) return "Silver";
    if (number === 3) return "Gold";
    if (number === 4) return "Platinium";
  };

  let dispatch = useDispatch();
  const postStudy = useSelector((state: any) => state.postStudy);
  const medicInfo = useSelector((state: any) => state.medicInfo);
  const appointments = useSelector((state: any) => state.appointmentsPatients);
  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [appointmentDetail, setAppointmentDetail] = useState<any>("");

  console.log("ApointmentDetail", appointmentDetail);
  const getStudyData = async () => {
    try {
      const response = await axios.get(
        `${URL_DEPLOY}/appointments/medic/${medicInfo.id}`
      );
      console.log(response.data);
      setAppointmentDetail(
        response.data.find((a: any) => {
          return a.id == id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAppointmentsPatients(medicInfo.id));
    getStudyData();
  }, [postStudy]);

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      {studyModal && (
        <NewStudie
          update={() => getStudyData()}
          closeStudyModal={closeStudyModal}
        />
      )}
      <div className={style.aside}>
        <div>
          <Header userName={medicInfo.firstName} title="Appointment Detail" />
        </div>
        <div className={style.goBackContainer}>
          <Link
            to="/home/medic/appointments"
            className={style.goBackButton}
            type="button"
          >
            <FaArrowLeft className={style.iconBack} />
            <span className={style.goBackText}>Go back</span>
          </Link>
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
                <button className={style.btnHistory}>
                  <Link
                    to={`/home/medic/patientHistory/${appointments[0].Patient.id}`}
                  >
                    View History
                  </Link>
                </button>
              </div>
              <div className={style.reviewContainer}>
                <h3>Review</h3>
                {appointmentDetail.AppointmentDetail ? (
                  <p>{appointmentDetail.AppointmentDetail.details} </p>
                ) : (
                  <div className={style.reviewP}>
                    <span className={style.noStudies}>
                      No review available.
                      <Link to={`/home/medic/appointments/review/${id}`}>
                        <span className={style.link}>Add review</span>
                      </Link>
                    </span>
                  </div>
                )}
              </div>
              <div className={style.studiesContainer}>
                <div className={style.headerStudies}>
                  <h3>Studies</h3>
                  <span
                    onClick={() => setStudyModal(true)}
                    className={style.studyNewText}
                  >
                    New Study
                  </span>
                </div>
                <div className={style.dataContainer}>
                  <div className={style.titles}>
                    <span className={style.titleBox}>Name</span>
                    <span className={style.titleBox}>PDF</span>
                  </div>
                  {appointmentDetail.Studies.length ? (
                    appointmentDetail.Studies.map((s: any, i: any) => {
                      if (s.state === "COMPLETED") {
                        return (
                          <div className={style.history} key={i}>
                            <span className={style.hBox}>
                              {s.StudyType.name}
                            </span>
                            <span className={style.hBox}>
                              <a
                                title="Download Study"
                                href={`/storage/${s.studyPDF}`}
                                target="_blank"
                              >
                                <BiDownload />
                              </a>
                            </span>
                          </div>
                        );
                      } else if (s.state === "ACTIVE") {
                        return (
                          <div className={style.history} key={i}>
                            <span className={style.hBox}>
                              {s.StudyType.name}
                            </span>
                            <span className={style.hBox}>
                              Study not available yet.
                            </span>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <span className={style.noStudies}>
                      No studies were found
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
};

export default MedicAppointmentDetail;
