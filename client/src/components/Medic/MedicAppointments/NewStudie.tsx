import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./NewStudie.module.css";
import { Link, useParams } from "react-router-dom";
import {
  getPreferenceId,
  getAppointmentsPatients,
  addReview,
  addStudy,
} from "../../../actions/index";
import Nav from "../../Home/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const NewStudie: FunctionComponent = () => {
  let dispatch = useDispatch();
  const medicInfo = useSelector((state: any) => state.medicInfo);
  const study = useSelector((state: any) => state.postStudy);
  const studiesTypes = ["Probando", "Asd"];

  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [input, setInput] = useState<any>({
    diagnosis: "",
    studyPDF: "",
    studyTypeId: "",
    MedicalStaffId: 48,
    appointmentId: id,
    PatientId: 1,
  });

  useEffect(() => {
    console.log(medicInfo);
  }, []);

  const handleChange = (e: any) => {
    if (e.target.value === "studyType") return;
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input.diagnosis) return;
    dispatch(addStudy(input));
  };

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName="Asd" title="Add Study" />
        </div>
        <div className={style.studyContainer}>
          <form onSubmit={handleSubmit}>
            <select id="type" name="studyTypeId" onChange={handleChange}>
              <option value="studyType">Select a study type</option>
              {studiesTypes &&
                studiesTypes.map((t: any, i: number) => {
                  return (
                    <option value={i} key={i}>
                      Test
                    </option>
                  );
                })}
            </select>
            <textarea
              name="diagnosis"
              value={input.email}
              autoComplete="off"
              placeholder="Write here the diagnosis of the patient..."
              onChange={handleChange}
            />
            <div className={style.formBtn}>
              <button type="submit">Submit </button>
            </div>
          </form>
          {study && <p>Your study was send</p>}
        </div>
      </div>
    </div>
  );
};

export default NewStudie;
