import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { } from "../../actions/index";
import AddMedic from "./AddMedic";


export default function Admin() : JSX.Element {


    return(
        <div>
            <h2>Admin page:</h2>
            <AddMedic />
        </div>
    )
}
