import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./NewAppointment.module.css";
import userLogo from "../userLogo.png";
import { Link } from "react-router-dom";
import {
  getSpecialities,
  getMedicSpeciality,
  getAppointments,
  getAppointmentsAvailable,
} from "../../../actions/index";

const NewAppointment: FunctionComponent = () => {
  const dispatch = useDispatch();

  const userActive = useSelector((state: any) => state.userInfo);
  const medicalSpecialities = useSelector((state: any) => state.specialities);
  const medics = useSelector((state: any) => state.medicSpeciality);

  const handleChange = (e: any) => {
    if (e.target.value == "selectSpeciality") return;
    dispatch(getMedicSpeciality(e.target.value));
  };

  const handleChangeMedics = (e: any) => {
    if (e.target.value == "selectMedic") return;
    dispatch(getAppointmentsAvailable(e.target.value));
  };
  useEffect(() => {
    console.log("medics", medics);
  }, []);

  useEffect(() => {
    dispatch(getSpecialities());
    console.log("medicalSpeciality", medicalSpecialities);
  }, []);
  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <span className={style.userNameText}>{userActive.firstName}</span>
          <img className={style.userLogo} src={userLogo} alt="" />
        </div>
        <h1 className={style.title}>Appointments</h1>
        <div className={style.formContainer}>
          <form>
            <select name="speciality" onChange={handleChange}>
              <option value="selectSpeciality">
                Select a medical speciality
              </option>
              {medicalSpecialities &&
                medicalSpecialities.map((speciality: any) => {
                  return (
                    <option value={speciality.id} key={speciality.id}>
                      {speciality.name}
                    </option>
                  );
                })}
            </select>
            <select name="medic">
              <option value="selectMedic">Select a medic</option>
              <option value="all">All</option>
              {medics.length &&
                medics.map((medic: any) => {
                  return (
                    <option value={medic.id} key={medic.id}>
                      {medic.firstName} {medic.lastName}
                    </option>
                  );
                })}
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
