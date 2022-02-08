import { useState, useEffect } from "react";
import style from "./AppointmentsDetail.module.css";
import { SignatureHelpTriggerReason } from "typescript";
import {
  getAppointmentDetail,
  updateAppointment,
  removeAppointment,
} from "../requests";

export default function AppointmentsDetail(props: any): JSX.Element {
  class Prop {
    key: string;
    value: any;

    constructor(key: string, value: any) {
      this.key = key;
      this.value = value;
    }
  }

  const getDetails = async (id: number) => {
    try {
      const response: any = await getAppointmentDetail(id);
      let appointment: any[] = [];
      appointment.push(new Prop("id", response.data.id));
      appointment.push(new Prop("patient",`${response.data.Patient.firstName}, ${response.data.Patient.lastName}`));
      appointment.push(new Prop("medic",`${response.data.MedicalStaff.firstName}, ${response.data.MedicalStaff.lastName}`));
      appointment.push(new Prop("date", response.data.date));
      appointment.push(new Prop("time", response.data.time));
      appointment.push(new Prop("state", response.data.state));
      appointment.push(new Prop("pay", response.data.pay? "True" : "False"));
      appointment.push(new Prop("speciality", response.data.MedicalStaff.Specialitie.name));
      appointment.push(new Prop("AppointmentDetail", response.data.AppointmentDetail? response.data.AppointmentDetail.details : "No details available"));
      setAppointment(appointment);
    } catch (error) {
      console.log(error);
    }
  };
  const [appointment, setAppointment] = useState<any>([]);
  const [newState, setNewState] = useState("");
  const [error, setError] = useState("");

  const changeState = (e: any) => {
    e.preventDefault();
    setNewState(e.target.value);
  };
  const acceptChanges = async (e: any) => {
    if (
      newState &&
      newState != appointment.find((a: any) => a.key === "state").value
    ) {
      await updateAppointment(
        appointment.find((a: any) => a.key === "id").value,
        { state: newState }
      );
    }
    props.reolad();
  };

  const removeApp = async (e: any) => {
    if (appointment.find((a: any) => a.key === "state").value === "ACTIVE") {
      await removeAppointment(
        appointment.find((a: any) => a.key === "id").value
      );
      props.reolad();
    } else {
      setError(
        `Can't remove ${
          appointment.find((a: any) => a.key === "state").value
        } appointments.`
      );
    }
  };

  useEffect(() => {
    getDetails(props.id);
  }, []);

  return (
    <div>
      <h2>Details</h2>
      {appointment.map((a: any) => (
        <div className={style.text}>
          <p className={style.textBlue}>{a.key} </p>
          <p>{a.value}</p>
        </div>
      ))}
      <label htmlFor="state">Change state to: </label>
      <select onChange={changeState} name="state" id="state">
        <option></option>
        <option>Active</option>
        <option>Completed</option>
        <option>Canceled</option>
      </select>
      <div className={style.buttons}>
        <button onClick={() => props.return()}>Go back</button>
        <button onClick={removeApp}>Delete appointment</button>
        <button onClick={acceptChanges}>Accept</button>
      </div>
      {error ? <h4>{error}</h4> : null}
    </div>
  );
}
