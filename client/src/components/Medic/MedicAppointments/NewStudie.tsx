import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./NewStudie.module.css";
import { useParams } from "react-router-dom";
import {
  getStudyTypes,
  addStudy,
  clearSubmitForm,
  getAppointmentsPatients,
  URL_DEPLOY,
} from "../../../actions/index";


export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const NewStudie: FunctionComponent<{closeStudyModal: any, update: any}> = ({closeStudyModal, update}) => {
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
        `${URL_DEPLOY}/appointments/details/${id}`
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

  const handleChange = (e: any) => {
    if (e.target.value === "studyType") return;
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
    }, 1000);
    closeStudyModal()
    update()
  };

  return (
    <div className={style.bigContainer}>
      <div className={style.studyContainer}>
        <div className={style.header}>
          <h1 className={style.title}>New Study</h1>
          <button className={style.closeButton} onClick={closeStudyModal}>X</button>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.subtitle}>Selec a study type:</label>
          <div className={style.selectContainer}>
          <select className={style.select} id="type" name="studyTypeId"  onChange={handleChange}>
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
          </div>
        </form>
        {study && <p className={style.textSubmit}>Your study was send</p>}
      </div>
    </div>
  );
};

export default NewStudie;
