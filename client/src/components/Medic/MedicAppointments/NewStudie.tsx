import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./NewStudie.module.css";
import { Link, useParams } from "react-router-dom";
import {
  getStudyTypes,
  addStudy,
  clearSubmitForm,
  getAppointmentsPatients
} from "../../../actions/index";
import Nav from "../MedicHome/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const NewStudie: FunctionComponent<{closeStudyModal: any}> = ({closeStudyModal}) => {
  let dispatch = useDispatch();
  const medicInfo = useSelector((state: any) => state.medicInfo);
  const study = useSelector((state: any) => state.postStudy);
  const types = useSelector((state: any) => state.studyTypes);

  const { id, name } = useParams<IUserPublicProfileRouteParams>();

  const [input, setInput] = useState<any>({
    diagnosis: "",
    studyPDF: "",
    studyTypeId: "",
    MedicalStaffId: medicInfo.id,
    appointmentId: id,
    PatientId: 1,
  });

  const getIDPatient = async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/appointments/details/${id}`
      );
      const data = response.data.Patient.id;
      setInput({
        ...input,
        PatientId: response.data.Patient.id
      })
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getStudyTypes());
    getIDPatient(id);
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
    dispatch(addStudy(input));
    dispatch(getAppointmentsPatients(medicInfo.id))
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
    }, 1000);

    closeStudyModal()
  };

  return (
    <div className={style.bigContainer}>
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
            <div className={style.formBtn}>
              <button type="submit">Submit </button>
            </div>
          </form>
          <button onClick={closeStudyModal}>Close</button>
          {study && <p className={style.textSubmit}>Your study was send</p>}
        </div>
        </div>
  );
};

export default NewStudie;
