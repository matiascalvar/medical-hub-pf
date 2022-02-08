import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../MedicHome/Nav/Nav";
import userLogo from "../../Home/userLogo.png";
import "../../../styles/Medic/MedicPatientHistory/MedicPatientHistory.css";
import { getAppointments, getPatientById } from "../../../actions";

const MedicPatientHistory: FunctionComponent = () => {
  const dispatch = useDispatch();

  const [pageInfo, setPageInfo] = React.useState({
    patientFirst: "",
    patientSecond: "",
    patientDNI: "",
    medicName: "",
    medicSecond: "",
  });

  useEffect(() => {
    dispatch(getPatientById(5));
    dispatch(getAppointments(5));
    if (medic) {
      setPageInfo({
        patientFirst: patient.firstName,
        patientSecond: patient.lastName,
        patientDNI: patient.dni,
        medicName: medic.firstName,
        medicSecond: medic.lastName,
      });
    }
    console.log(appointments);
  }, []);

  const medic = useSelector((state: any) => state.medicInfo);
  const patient = useSelector((state: any) => state.patientById);
  const appointments = useSelector((state: any) => state.appointments);

  return (
    <div className="containerPatientHistory">
      <div className="containerPatientHistory__nav">
        <Nav />
      </div>
      <div className="containerPatientHistory__container">
        <div className="patHst__header">
          <h3 className="contenedor__header--name">{`Dr. ${pageInfo.patientFirst}, ${pageInfo.medicSecond}`}</h3>
          <img
            src={userLogo}
            alt="user_logo"
            className="contenedor__header--logo"
          />
        </div>
        <div className="patHst__top">
          <h3 className="patHst__top--title">Patient History</h3>
          <button className="patHst__top--btn">RETURN</button>
        </div>
        <div className="patHst__section">
          <div className="patHst__section--patient">
            <h4 className="section__patient--title">Patient:</h4>
            <div className="section__patient--item">
              <p>First Name:</p>
              <span>{pageInfo.patientFirst}</span>
            </div>
            <div className="section__patient--item">
              <p>Last Name:</p>
              <span>{pageInfo.patientSecond}</span>
            </div>
            <div className="section__patient--item">
              <p>DNI:</p>
              <span>{pageInfo.patientDNI}</span>
            </div>
          </div>
          <div className="patHst__section--appoints">
            <h4 className="section__appoints--title">Appointments History:</h4>
            <div className="section__appoints--desc">
              <p className="appoints__desc--date">Date</p>
              <p className="appoints__desc--doc">Doctor</p>
              <p className="appoints__desc--special">Specialitie</p>
              <p className="appoints__desc--btn">Status</p>
            </div>
            <div className="appointmentContent">
              {appointments && appointments ? (
                appointments.map(({ date, MedicalStaff, state }: any) => {
                  const { firstName, lastName, Specialitie } = MedicalStaff;
                  const { name } = Specialitie;
                  return (
                    <div className="appointmentSection">
                      <span className="appointmentSection--box">{date}</span>
                      <span className="appointmentSection--box">{`${firstName} ${lastName}`}</span>
                      <span className="appointmentSection--box">{name}</span>
                      <span className="appointmentSection--box">{state}</span>
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
  );
};

export default MedicPatientHistory;
