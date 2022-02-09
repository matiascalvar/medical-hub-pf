import axios from "axios";
import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./CardSpec.module.css";
import { useHistory } from "react-router-dom";
import { getAppointments, URL_DEPLOY } from "../../../actions/index";

interface CardProps {
  mailSent: any,
  setMailSent: any,
  date: any;
  hours: any;
  medicInfo: any;
}

export const CardSpec = ({mailSent, setMailSent, date, hours, medicInfo }: CardProps): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userActive = useSelector((state: any) => state.patientInfo);

  const [selected, setSelected] = React.useState({
    hour: "",
  });

  const handleSelect = function (e: any) {
    e.preventDefault();
    setSelected({ hour: hours });
  };

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    setMailSent(true)
    try {
      const response = await axios.post(`${URL_DEPLOY}/appointments`, {
        date: date,
        time: selected.hour,
        PatientId: userActive.id,
        MedicalStaffId: medicInfo.MedicalStaffId,
      });
      dispatch(getAppointments(userActive.id));
      setMailSent(false)
      history.push("/home/appointments");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className={style.cardContainer}>
      <label>
        <input
          onClick={handleSelect}
          type="button"
          value={`Dr. ${medicInfo.medic}`}
        />
      </label>
      </div>
      {(selected.hour && mailSent === false) ? (
          <div className={style.appConfirm}>
          <h3>
            Confirm appointment with Dr. {medicInfo.medic} at {hours}hs.
          </h3>
          <button className={style.btn} onClick={handleSubmit}>
            Accept
          </button>
          <button
            className={style.btn}
            onClick={() => setSelected({ hour: "" })}
          >
            Cancel
          </button>
          </div>
      ) : null}
    </>
  );
};

export default CardSpec;
