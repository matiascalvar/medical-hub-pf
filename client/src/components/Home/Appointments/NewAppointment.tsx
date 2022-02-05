import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav";
import style from "./NewAppointment.module.css";
import addDays from '../../../assets/addDays'

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
    const [ pagination, setPagination ] = useState({offset:0, pag:1})

    const handleChange = (e: any) => {
        if (e.target.value == "selectSpeciality") return;
        dispatch(getMedicSpeciality(e.target.value));
        setSpecId(e.target.value)
        setPagination({offset:0, pag:1})
    };

    const handleChangeAvailable = (e: any) => {
        if (e.target.value === "selectMedic") return;
        if (e.target.value === "all") return dispatch(getSpecAvailableTime(specId));
        return dispatch(getMedicAvailableTime(e.target.value));
    };

    useEffect(() => {
        dispatch(getSpecialities());
    }, []);

    let horariosDisponibles: any[] = [];


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
                  {(medics.length && medics.length > 1) && <option value="all">All</option>}
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
                  }) : 
                  
                  <div>
                    
                  {specAvb.length > 0 ?
                  
                  specAvb.slice(pagination.offset,pagination.pag).map((day: any) => {        
                    let totalPages = specAvb.length;  
                    
                    return (
                      <div>
                      <div className={style.paginationBtns}>
                   {(pagination.offset !== 0) && <button title={addDays(day.fecha, 0)} onClick={() => setPagination({offset:pagination.offset-1, pag:pagination.pag-1})}> {'<<'} </button>}
                   <h3>{day.fecha}</h3>
                   {(pagination.pag < totalPages) && <button title={addDays(day.fecha, 2)} onClick={() => setPagination({offset:pagination.offset+1, pag:pagination.pag+1})}> {'>>'} </button>}
                   </div>
                   {Object.getOwnPropertyNames(day.avb).map((hour: any) => { 
                      
                     if(day.avb[hour].length){ 
                      
                      let now = new Date();
                      const today = addDays(now,0);
                      let timeToMinutes = (Number(hour.slice(0, -6)*60) + Number(hour.slice(3, -3)))
                      let nowToMinutes = ((now.getHours()*60) + now.getMinutes())
                      //let nowToMinutes = (16*60); //ahora en la hora actual
                      if(day.fecha === today){//de HOY solo mostramos los turnos desde la hora actual en adelante
                        
                        if(timeToMinutes > nowToMinutes){             
                          horariosDisponibles.push(1)         
                          return (
                            <div>
                              <div className={style.hoursContainer}>
                              <label>
                                  <input
                                    type="button"
                                    value={hour.slice(0, -3)}
                                  ></input>
                                </label>   
                              </div>
                              <div className={style.cardSpecContainer}>
                               {day.avb[hour].map((m:any) => {
                                 return  <CardSpec date={day.fecha} hours={hour.toString()} medicInfo={{medic: m.firstName + ' ' + m.lastName, MedicalStaffId: m.id}} />;
                               })}
                             </div>
                             
                            </div>
                          )  
                         }               
                                          
                      }else{//desde MAÑANA mostramos todos los horarios
                        horariosDisponibles.push(1)
                        return (
                         <div>
                           <div className={style.hoursContainer}>
                           <label>
                               <input
                                 type="button"
                                 value={hour.slice(0, -3)}
                               ></input>
                             </label>
                             <div className={style.cardSpecContainer}>
                               {day.avb[hour].map((m:any) => {
                                 return  <CardSpec date={day.fecha} hours={hour.toString()} medicInfo={{medic: m.firstName + ' ' + m.lastName, MedicalStaffId: m.id}} />;
                               })}
                             </div>  
 
                           </div>
                         </div>
                       )
                      }
                     }else{
                       horariosDisponibles.push(0)
                     }

                    // {console.log(horariosDisponibles)}                 
                     
                  })}

                    {(!horariosDisponibles.includes(1) && (document.getElementById("medic") as HTMLInputElement)?.value === "all" ) && // && (document.getElementById("medic") as HTMLInputElement)?.value === "all" ) 
                    <h2>There isn't appointments available.</h2>                  
                    }
                  
                    </div>
                  )

                  }) : null
                  
                  }                  

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
