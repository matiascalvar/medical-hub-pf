import axios from "axios";
import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./CardSpec.module.css";
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
    const userActive = useSelector((state: any) => state.userInfo);

    const [selected, setSelected] = React.useState({
        hour: ""
    })    

    const handleSelect = function(e: any) {
        e.preventDefault()
        setSelected({hour: hours})
    }

    const handleSubmit = async function(e: any) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/appointments',
                {
                    date: date,
                    time: selected.hour,
                    patientId: userActive.UserId,
                    medicalStaffId: medicInfo.MedicalStaffId
                }
            )
            dispatch(getAppointments(userActive.UserId))
            history.push("/home/appointments")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={style.cardContainer}>
      <label>
         <input
            onClick={handleSelect}
             type="button"
              value= {`Dr. ${medicInfo.medic}`}
          />
      </label> 
      {selected.hour?
          <div>
            <h3>Confirm appointment with Dr. {medicInfo.medic} at {hours}hs.</h3>
            <button onClick={handleSubmit}>Accept</button>
            <button onClick={() => setSelected({hour: ""})}>Cancel</button>
          </div> : null}
    </div>
  );
};

export default Card;
