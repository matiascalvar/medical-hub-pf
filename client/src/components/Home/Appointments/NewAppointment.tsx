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
  getMedicAvailableTime,
} from "../../../actions/index";
import { obj } from "./data";
import Card from "./Card";

const NewAppointment: FunctionComponent = () => {
    
    const dispatch = useDispatch();
    const medicInfo = useSelector((state: any) => state.medicAppointments);
    const userActive = useSelector((state: any) => state.userInfo);
    const medicalSpecialities = useSelector((state: any) => state.specialities);
    const medics = useSelector((state: any) => state.medicSpeciality);

    const handleChange = (e: any) => {
        if (e.target.value == "selectSpeciality") return;
        dispatch(getMedicSpeciality(e.target.value));
    };

    const handleChangeAvailable = (e: any) => {
        if (e.target.value == "selectMedic") return;
        dispatch(getMedicAvailableTime(e.target.value));
    };

    useEffect(() => {
        dispatch(getSpecialities());
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
            <select name="medic" onChange={handleChangeAvailable}>
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
        <div className={style.cardBigContainer}>
          <h2>{medicInfo.medic}</h2>
          <div className={style.cardsContainer}>
            {medicInfo.data &&
              medicInfo.data.map((day: any) => {
                console.log(medicInfo)
                return <Card date={day.fecha} hours={day.avb} medicInfo={medicInfo} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
