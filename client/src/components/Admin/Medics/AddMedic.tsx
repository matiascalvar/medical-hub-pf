import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMedic } from "../requests"
import { } from "../../../actions/index";


export default function AddMedic() : JSX.Element {

    const emptyInput = {
        email: "",
        firstName: "",
        lastName: "",
        idNumber: "",
        avbFrom: "",
        avbTo: "",
        appointmentDuration: "",
        specialitieId: "",
    }

    const [input, setInput] = React.useState(emptyInput);

    function handleInputChange(e: any) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        addMedic(input)
        setInput(emptyInput)
    }

    return(
        <div>
            <h2>New medic:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">EMAIL:</label>
                    <input
                        type="text" 
                        name="email" 
                        value={input.email}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">FIRST NAME:</label>
                    <input
                        type="text" 
                        name="firstName" 
                        value={input.firstName}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">LAST NAME:</label>
                    <input
                        type="text" 
                        name="lastName" 
                        value={input.lastName}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="idNumber">ID NUMBER:</label>
                    <input
                        type="text" 
                        name="idNumber" 
                        value={input.idNumber}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="avbFrom">AVB FROM:</label>
                    <input
                        type="text" 
                        name="avbFrom" 
                        value={input.avbFrom}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="avbTo">AVB TO:</label>
                    <input
                        type="text" 
                        name="avbTo" 
                        value={input.avbTo}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div >
                    <label htmlFor="appointmentDuration">APP DURATION:</label>
                    <input
                        type="text" 
                        name="appointmentDuration" 
                        value={input.appointmentDuration}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="specialitieId">SPECIALITY:</label>
                    <input
                        type="text" 
                        name="specialitieId" 
                        value={input.specialitieId}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}