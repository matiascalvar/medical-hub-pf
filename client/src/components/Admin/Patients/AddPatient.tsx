import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPatient } from "../requests"


export default function AddPatient() : JSX.Element {

    const emptyInput = {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        dni: "",
        planId: "",
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
        addPatient(input)
        setInput(emptyInput)
    }

    return(
        <div>
            <h2>New patient:</h2>
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
                    <label htmlFor="idNumber">PHONE:</label>
                    <input
                        type="text" 
                        name="phone" 
                        value={input.phone}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="dni">DNI: </label>
                    <input
                        type="text" 
                        name="dni" 
                        value={input.dni}
                        autoComplete='off'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="planId">PLAN: </label>
                    <input
                        type="text" 
                        name="planId" 
                        value={input.planId}
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