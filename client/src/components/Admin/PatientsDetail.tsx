import { useState, useEffect } from "react";
import { getPatientDetails, updatePatient  } from "./requests";

export default function MedicsDetail(props: any) : JSX.Element {

    const getDetails = async (id: number) => {
        try {
            const response: any = await getPatientDetails(id)
            setPatient({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                phone: response.data.phone,
                dni: response.data.dni,
                createdAt: response.data.createdAt
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [ editable, setEditable] = useState("")

    const [ patient , setPatient ] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        dni: "",
        createdAt: ""
    })

    function handleInputChange(e: any) {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: any) {
        e.preventDefault()
    }

    async function acceptChanges (e: any) {
        e.preventDefault()
        await updatePatient(props.id, patient)
        props.reolad()
    }

    useEffect(() => {
        getDetails(props.id)
    },[])

    return(
        <div>
            <h2>Details:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">FIRST NAME: </label>
                    {editable === "firstName" ?
                    <>
                        <input
                            type="text" 
                            name="firstName" 
                            value={patient.firstName}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{patient.firstName}</span>
                        <button onClick={() => setEditable("firstName")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="lastName">LAST NAME: </label>
                    {editable === "lastName" ?
                    <>
                        <input
                            type="text" 
                            name="lastName" 
                            value={patient.lastName}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{patient.lastName}</span>
                        <button onClick={() => setEditable("lastName")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="phone">PHONE: </label>
                    {editable === "phone" ?
                    <>
                        <input
                            type="text" 
                            name="phone" 
                            value={patient.phone}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{patient.phone}</span>
                        <button onClick={() => setEditable("phone")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="dni">DNI: </label>
                    {editable === "dni" ?
                    <>
                        <input
                            type="text" 
                            name="dni" 
                            value={patient.dni}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{patient.dni}</span>
                        <button onClick={() => setEditable("dni")}>EDIT</button>
                    </div> }
                </div>


                <div>
                    <label >CREATED AT: </label>
                    <span>{patient.createdAt}</span>
                </div>
            </form>
            <button onClick={acceptChanges}>ACCEPT CHANGES</button>
            <button onClick={() => props.return()}>BACK</button>
        </div>
    )
}