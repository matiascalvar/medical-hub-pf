import React, { FunctionComponent, useEffect, useState } from "react";
import Header from "../../Home/UserHome/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../MedicHome/Nav/Nav";
import userLogo from "../../Home/userLogo.png";
import style from "./MedicPatientHistory.module.css";
import { getAppointments, getPatientById } from "../../../actions";
import { Link, useParams, useHistory } from "react-router-dom";

interface MedicPatientHistoryParams {
  id: any;
}

const MedicPatientHistory: FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<MedicPatientHistoryParams>();
  const medicInfo = useSelector((state: any) => state.medicInfo);

  const [pageInfo, setPageInfo] = React.useState({
    patientFirst: "",
    patientSecond: "",
    patientDNI: "",
    medicName: "",
    medicSecond: "",
  });

  const medic = useSelector((state: any) => state.medicInfo);
  const patient = useSelector((state: any) => state.patientById);
  const appointments = useSelector((state: any) => state.appointments);

  useEffect(() => {
    dispatch(getPatientById(Number(id)));
    dispatch(getAppointments(Number(id)));
    if (medic) {
      setPageInfo({
        patientFirst: patient.firstName,
        patientSecond: patient.lastName,
        patientDNI: patient.dni,
        medicName: medic.firstName,
        medicSecond: medic.lastName,
      });
    }
  }, []);


  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={medicInfo.firstName} title="Patient History" />
          <div className={style.btnContainer}>
            <p className={style.btnReturn} onClick={() => history.goBack()}>
              Return
            </p>
          </div>
        </div>

        <div className={style.detailContainer}>
          <div className={style.detailRow}>
            <div className={style.shiftCard}>
              <h3>Information</h3>
              <p>
                Name:{" "}
                <span className={style.pBlack}>
                  {`${patient.firstName ? patient.firstName : pageInfo.patientFirst} ${patient.lastName ? patient.lastName : pageInfo.patientSecond}`}
                </span>
              </p>
              <p>
                DNI: <span className={style.pBlack}>{patient.dni ? patient.dni : pageInfo.patientDNI}</span>
              </p>
            </div>
            <div className={style.appContainer}>
              <div className={style.appCard}>
                <div className={style.subtitlesContainer}>
                  <span>Date</span>
                  <span>Doctor</span>
                  <span>Speciality</span>
                  <span>Status</span>
                </div>
                <div className={style.dataContainer}>
                  {appointments ? (
                    appointments.map(({ date, MedicalStaff, state }: any) => {
                      const { firstName, lastName, Specialitie } = MedicalStaff;
                      const { name } = Specialitie;
                      return (
                        <div className={style.appointment}>
                          <span className={style.box}>{date}</span>
                          <span
                            className={style.box}
                          >{`${firstName} ${lastName}`}</span>
                          <span className={style.box}>{name}</span>
                          <span className={style.box}>{state}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div>No hay</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicPatientHistory;
