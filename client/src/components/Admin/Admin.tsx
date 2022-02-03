import { useState, useEffect } from "react";
import AddMedic from "./AddMedic";
import Medics from "./Medics";
import { getMedics } from "./requests"


export default function Admin() : JSX.Element {

    const [ component, setComponent ] : any = useState("")

    return(
        <div>
            <h2>Admin page:</h2>
            <button onClick={()=> setComponent("AddMedic")}>Add Medic</button>
            <button onClick={()=> setComponent("MedicsTable")}>Medic list</button>
            <>{component === "AddMedic"? <AddMedic/> : null}</>
            <>{component === "MedicsTable"? <Medics/> : null}</>
        </div>
    )
}
