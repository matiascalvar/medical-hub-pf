import { useState, useEffect } from "react";
import style from "./AddAppointment.module.css";

import {
  getMedics,
  getPatients,
  getAvailability,
  addAppointment,
} from "../requests";

export default function AddPatient(): JSX.Element {
  class Medic {
    id: number;
    name: string;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  }
  class Patient {
    id: number;
    name: string;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  }

  const getMedicsList = async () => {
    const response: any = await getMedics();
    if (response) {
      const medicList: any[] = [];
      response.data.forEach((medic: any) =>
        medicList.push(
          new Medic(medic.id, `${medic.lastName}, ${medic.firstName}`)
        )
      );
      setMedics(medicList);
    }
  };

  const getPatientsList = async () => {
    const response: any = await getPatients();
    if (response) {
      const patientList: any[] = [];
      response.data.forEach((patient: any) =>
        patientList.push(
          new Patient(patient.id, `${patient.lastName}, ${patient.firstName}`)
        )
      );
      setPatients(patientList);
    }
  };

  const loadAvailability = async (id: number, date: string) => {
    const data = {
      MedicalStaffId: id,
      date: date,
    };
    const response: any = await getAvailability(data);
    if (response) setAvailability(response);
  };

  const [availability, setAvailability] = useState<string[]>();
  const [medics, setMedics] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [component, setComponent] = useState("patient");
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    patient: "",
    medic: "",
    date: "",
    time: "",
  });
  const [newAppointment, setNewAppointment] = useState({
    PatientId: 0,
    MedicalStaffId: 0,
    date: "",
    time: "",
  });

  const handleInputChange = (e: any) => {
    setError("");
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const nextPatient = () => {
    const index = patients.findIndex((p: any) => p.name === input.patient);
    if (index === -1) {
      setError("Not a patient.");
    } else {
      setNewAppointment({
        ...newAppointment,
        PatientId: patients[index].id,
      });
      setError("");
      setComponent("medic");
    }
  };

  const nextMedic = () => {
    const index = medics.findIndex((m: any) => m.name === input.medic);
    if (index === -1) {
      setError("Not a medic.");
    } else {
      setNewAppointment({
        ...newAppointment,
        MedicalStaffId: medics[index].id,
      });
      setError("");
      setComponent("date");
    }
  };

  const nextDate = () => {
    if (input.date) {
      setNewAppointment({
        ...newAppointment,
        date: input.date,
      });
      setError("");
      loadAvailability(newAppointment.MedicalStaffId, input.date);
      setComponent("time");
    } else {
      setError("Select a date.");
    }
  };

  const nextTime = () => {
    if (input.time) {
      setNewAppointment({
        ...newAppointment,
        time: input.time,
      });
      setError("");
      setComponent("confirm");
    } else {
      setError("Select time.");
    }
  };

  const confirmAppointment = async () => {
    const response: any = await addAppointment(newAppointment);
    if (response.status === 201) setError("Appointment confirmed");
    setTimeout(() => {
      setError("");
      setComponent("patient");
    }, 3000);
  };

  const reset = () => {
    setInput({
      patient: "",
      medic: "",
      date: "",
      time: "",
    });
    setNewAppointment({
      PatientId: 0,
      MedicalStaffId: 0,
      date: "",
      time: "",
    });
    setComponent("patient");
  };

  const getToday = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month: any = today.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let day: any = today.getDate();
    if (day < 10) day = "0" + day;
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getMedicsList();
    getPatientsList();
  }, []);

  return (
    <div className={style.formContainer}>
      {component === "patient" ? (
        <div className={style.container}>
          <h2>Add appointment</h2>
          <label htmlFor="patient">Patient</label>
          <input onChange={handleInputChange} name="patient" list="patient" />
          <datalist id="patient">
            {patients.map((p: any) => (
              <option value={p.name} />
            ))}
          </datalist>
          <button onClick={nextPatient} className={style.btnNext}>
            Next
          </button>
        </div>
      ) : null}
      {component === "medic" ? (
        <div className={style.container}>
          <h2>Add appointment</h2>
          <label htmlFor="medic">Medic</label>
          <input onChange={handleInputChange} name="medic" list="medic" />
          <datalist id="medic">
            {medics.map((m: any) => (
              <option value={m.name} />
            ))}
          </datalist>
          <button onClick={nextMedic} className={style.btnNext}>
            Next
          </button>
        </div>
      ) : null}
      {component === "date" ? (
        <div className={style.container}>
          <h2>Add appointment</h2>
          <label htmlFor="date">Date</label>
          <input
            onChange={handleInputChange}
            name="date"
            type="date"
            min={getToday()}
          />
          <button onClick={nextDate} className={style.btnNext}>
            Next
          </button>
        </div>
      ) : null}
      {component === "time" ? (
        <div className={style.container}>
          <h2>Add appointment</h2>
          <label htmlFor="time">Hour</label>
          <select onChange={handleInputChange} name="time" id="time">
            <option value=""></option>
            {availability?.map((t: string) => (
              <option value={t}>{t.slice(0, -3)}</option>
            ))}
          </select>
          <button onClick={nextTime} className={style.btnNext}>
            Next
          </button>
        </div>
      ) : null}
      {component === "confirm" ? (
        <div className={style.confirmContainer}>
          <p>Patient {input.patient}</p>
          <p>Medic {input.medic}</p>
          <p>Date {input.date}</p>
          <p>Time {input.time.slice(0, -3)}</p>
          <div className={style.btn}>
            <button onClick={reset} className={style.btnNext}>
              Cancel
            </button>
            <button onClick={confirmAppointment} className={style.btnNext}>
              Confirm
            </button>
          </div>
        </div>
      ) : null}
      {error ? <h4>{error}</h4> : null}
    </div>
  );
}
