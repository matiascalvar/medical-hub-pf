import React, { FunctionComponent, useEffect, useState } from "react";
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
  getSpecAvailableTime,
} from "../../../actions/index";
import { obj } from "./data";
import Card from "./Card";
import CardSpec from "./CardSpec";
import Header from "../UserHome/Header/Header";

const NewAppointment: FunctionComponent = () => {
    
    const dispatch = useDispatch();
    const medicInfo = useSelector((state: any) => state.medicAppointments);
    const userActive = useSelector((state: any) => state.patientInfo);
    const medicalSpecialities = useSelector((state: any) => state.specialities);
    const medics = useSelector((state: any) => state.medicSpeciality);
    const specAvb = useSelector((state: any) => state.specAppointments);
    const [ specId, setSpecId ] = useState(0);

    const handleChange = (e: any) => {
        if (e.target.value == "selectSpeciality") return;
        dispatch(getMedicSpeciality(e.target.value));
        setSpecId(e.target.value)
    };

    const handleChangeAvailable = (e: any) => {
        if (e.target.value == "selectMedic") return;
        if (e.target.value == "all") dispatch(getSpecAvailableTime(specId));
        dispatch(getMedicAvailableTime(e.target.value));
    };

    useEffect(() => {
        dispatch(getSpecialities());
    }, []);

  return (
    <>
      {medics? 
        <div className={style.bigContainer}>
          <div className={style.navContainer}>
            <Nav />
          </div>
          <div className={style.aside}>
            <Header userName={userActive.firstName} title="New Appointment" />
            <div className={style.formContainer}>
              <form>
                <select id="speciality" name="speciality" onChange={(e) => {
                  handleChange(e);
                  (document.getElementById("medic") as HTMLInputElement).value = "selectMedic"
                }}>
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
                <select id="medic"name="medic" onChange={handleChangeAvailable}>
                  <option  value="selectMedic">Select a medic</option>
                  {medics.length && <option value="all">All</option>}
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
              {medics.message && <h2>{medics.message}</h2>}

              {(!medics.message && !specAvb.length) && <h2>{medicInfo.medic}</h2>}
              <div className={style.cardsContainer}>
                {(medicInfo.data && !medics.message && !specAvb.length) ?
                  medicInfo.data.map((day: any) => {
                    //console.log(medicInfo)
                    return <Card date={day.fecha} hours={day.avb} medicInfo={medicInfo} />;
                  }) : <div>
                  {specAvb.length > 0 &&
                  <div>
                  {/* <h2>{(document.getElementById("speciality") as HTMLFormElement).options[(document.getElementById("speciality") as HTMLFormElement).selectedIndex].text}</h2> */}
                  <h3>{specAvb[0].fecha}</h3>
                  </div>
                  }
                  {specAvb.length>0 &&
                  Object.getOwnPropertyNames(specAvb[0].avb).map((hour: any) => {
                    return <div>
                      <div className={style.hoursContainer}>
                          {( specAvb[0].avb[hour].length > 0) && 
                            <label>
                            <input
                              type="button"
                              value={hour.slice(0, -3)}
                            ></input>
                          </label>  
                          }
                            
                      </div>
                    <div className={style.cardSpecContainer}>
                      {specAvb[0].avb[hour].map((m:any) => {
                        //return m.firstName + ' ' + m.lastName + '\n'
                        return  <CardSpec date={specAvb[0].fecha} hours={hour.toString()} medicInfo={{medic: m.firstName + ' ' + m.lastName, MedicalStaffId: m.id}} />;
                      })}
                    </div>
                    
                    </div>
                  }) }
                  </div>              
                  }
              </div>

            </div> 
          </div>
        </div> :
      <h4>Loading....</h4>}
    </>
  );
};

export default NewAppointment;
