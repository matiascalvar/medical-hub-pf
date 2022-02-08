import axios from "axios";
import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./Card.module.css";
import { useHistory } from "react-router-dom";
import { getAppointments } from "../../../actions/index";

interface CardProps {
  date: any;
  hours: any;
  medicInfo: any;
}

export const Card = ({ date, hours, medicInfo }: CardProps): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userActive = useSelector((state: any) => state.patientInfo);

  const [selected, setSelected] = React.useState({
    hour: "",
  });

  const handleSelect = function (e: any) {
    e.preventDefault();
    setSelected({ hour: e.target.value });
  };

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/appointments", {
        date: date,
        time: selected.hour,
        PatientId: userActive.id,
        MedicalStaffId: medicInfo.MedicalStaffId,
      });
      dispatch(getAppointments(userActive.id));
      history.push("/home/appointments");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.cardContainer}>
      <p>{date}</p>
      <div className={style.hoursContainer}>
        {hours &&
          hours.map((hour: any, index: any) => {
            return (
              <label>
                <input
                  onClick={handleSelect}
                  type="button"
                  value={hour.slice(0, -3)}
                  key={index}
                ></input>
              </label>
            );
          })}
      </div>
      {selected.hour ? (
        <div className={style.appConfirm}>
          <h3>
            Confirm appointment with Dr. {medicInfo.medic} at {selected.hour}hs.
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
    </div>
  );
};

export default Card;
