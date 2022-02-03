import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { displayPartsToString } from "typescript";
import { } from "../../actions/index";
import AddMedic from "./AddMedic";
import MedicsTable from "./MedicsTable";
import { getMedics } from "./requests"


export default function Admin() : JSX.Element {

    const [ display, setDisplay ] : any = React.useState({
        component: "",
        data: []
    })

    async function showMedicsTable() {
        const reponse: any = await getMedics()
        setDisplay({
            component: "MedicsTable",
            data: reponse.data
        })
    }

    return(
        <div>
            <h2>Admin page:</h2>
            <button onClick={()=> setDisplay({component: "AddMedic", data: []})}>Add Medic</button>
            <button onClick={()=> showMedicsTable()}>Medic list</button>
            <>{display.component === "AddMedic"? <AddMedic/> : null}</>
            <>{display.component === "MedicsTable"? <MedicsTable medics={display.data}/> : null}</>
        </div>
    )
}
