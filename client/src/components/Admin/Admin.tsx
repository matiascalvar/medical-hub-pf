import { useState, useEffect } from "react";
import AddMedic from "./Medics/AddMedic";
import Medics from "./Medics/Medics";
import AddPatient from "./Patients/AddPatient";
import Patients from "./Patients/Patients";
import AddAppointment from "./Appointments/AddAppointment";
import Appointments from "./Appointments/Appointments";




export default function Admin() : JSX.Element {

    const [ component, setComponent ] : any = useState("")

    return(
        <div>
            <h2>Admin page:</h2>
            <div >
                <button onClick={()=> setComponent("AddMedic")}>Add Medic</button>
                <button onClick={()=> setComponent("Medics")}>Medic list</button>
                <button onClick={()=> setComponent("addPatient")}>Add Patient</button>
                <button onClick={()=> setComponent("Patients")}>Patient list</button>
                <button onClick={()=> setComponent("addAppointment")}>Add Appointment</button>
                <button onClick={()=> setComponent("Appointments")}>Appointment list</button>
            </div>
            <>{component === "AddMedic"? <AddMedic/> : null}</>
            <>{component === "Medics"? <Medics/> : null}</>
            <>{component === "addPatient"? <AddPatient/> : null}</>
            <>{component === "Patients"? <Patients/> : null}</>
            <>{component === "addAppointment"? <AddAppointment/> : null}</>
            <>{component === "Appointments"? <Appointments/> : null}</>
        </div>
    )
}
