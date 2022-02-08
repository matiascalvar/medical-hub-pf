import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./NewStudie.module.css";
import { Link, useParams } from "react-router-dom";
import {
  getStudyTypes,
  addStudy,
  clearSubmitForm,
} from "../../../actions/index";
import Nav from "../MedicHome/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const NewStudie: FunctionComponent = () => {
  let dispatch = useDispatch();
  const medicInfo = useSelector((state: any) => state.medicInfo);
  const study = useSelector((state: any) => state.postStudy);
  const types = useSelector((state: any) => state.studyTypes);
  const [idPatient, setIdPatient] = useState<any>(1);

  const { id, name } = useParams<IUserPublicProfileRouteParams>();

  const [input, setInput] = useState<any>({
    diagnosis: "",
    studyPDF: "",
    studyTypeId: "",
    MedicalStaffId: medicInfo.id,
    appointmentId: id,
    PatientId: idPatient,
  });

  const getIDPatient = async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/appointments/details/${id}`
      );
      const data = response.data.Patient.id;
      return data;
    } catch (error) {
      console.log(error);
    }
  }; // No anda bien ver

  useEffect(() => {
    dispatch(getStudyTypes());
    setIdPatient(getIDPatient(id));
    console.log("id", idPatient);
  }, []);

  useEffect(() => {}, []);

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
    setInput({
      diagnosis: "",
      studyPDF: "",
      studyTypeId: "",
      MedicalStaffId: medicInfo.id,
      appointmentId: id,
      PatientId: 1,
    });
    setTimeout(() => {
      dispatch(clearSubmitForm());
    }, 5000);
  };

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={medicInfo.firstName} title="Add Study" />
        </div>
        <div className={style.studyContainer}>
          <form onSubmit={handleSubmit}>
            <select id="type" name="studyTypeId" onChange={handleChange}>
              <option value="studyType">Select a study type</option>
              {types &&
                types.map((t: any, i: number) => {
                  return (
                    <option value={t.id} key={t.id}>
                      {t.name}
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
          {study && <p className={style.textSubmit}>Your study was send</p>}
        </div>
      </div>
    </div>
  );
};

export default NewStudie;
