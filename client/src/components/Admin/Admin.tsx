import { useState, useEffect } from "react";
import style from "./Admin.module.css";
import AddMedic from "./Medics/AddMedic";
import Medics from "./Medics/Medics";
import AddPatient from "./Patients/AddPatient";
import Patients from "./Patients/Patients";
import AddAppointment from "./Appointments/AddAppointment";
import Appointments from "./Appointments/Appointments";
import Logo from "./../../assets/img/logo.svg";

export default function Admin(): JSX.Element {
  const [component, setComponent]: any = useState("");

  return (
    <div className={style.bigContainer}>
      <div className={style.header}>
        <img src={Logo} alt="Admin Logo" />
        <h3>Admin Panel</h3>
      </div>
      <div className={style.buttons}>
        <button
          onClick={() => setComponent("AddMedic")}
          className={component === "AddMedic" ? style.btnActive : style.btn}
        >
          Add Medic
        </button>
        <button
          onClick={() => setComponent("Medics")}
          className={component === "Medics" ? style.btnActive : style.btn}
        >
          List of medics
        </button>
        <button
          onClick={() => setComponent("addPatient")}
          className={component === "addPatient" ? style.btnActive : style.btn}
        >
          Add Patient
        </button>
        <button
          onClick={() => setComponent("Patients")}
          className={component === "Patients" ? style.btnActive : style.btn}
        >
          List of patients
        </button>
        <button
          onClick={() => setComponent("addAppointment")}
          className={
            component === "addAppointment" ? style.btnActive : style.btn
          }
        >
          Add Appointment
        </button>
        <button
          onClick={() => setComponent("Appointments")}
          className={component === "Appointments" ? style.btnActive : style.btn}
        >
          Appointment list
        </button>
      </div>
      <>{component === "AddMedic" ? <AddMedic /> : null}</>
      <>{component === "Medics" ? <Medics /> : null}</>
      <>{component === "addPatient" ? <AddPatient /> : null}</>
      <>{component === "Patients" ? <Patients /> : null}</>
      <>{component === "addAppointment" ? <AddAppointment /> : null}</>
      <>{component === "Appointments" ? <Appointments /> : null}</>
    </div>
  );
}
