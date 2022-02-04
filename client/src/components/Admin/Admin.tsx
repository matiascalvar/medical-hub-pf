import { useState, useEffect } from "react";
import AddMedic from "./Medics/AddMedic";
import Medics from "./Medics/Medics";
import AddPatient from "./Patients/AddPatient";
import Patients from "./Patients/Patients";




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
            </div>
            <>{component === "AddMedic"? <AddMedic/> : null}</>
            <>{component === "Medics"? <Medics/> : null}</>
            <>{component === "addPatient"? <AddPatient/> : null}</>
            <>{component === "Patients"? <Patients/> : null}</>
        </div>
    )
}
