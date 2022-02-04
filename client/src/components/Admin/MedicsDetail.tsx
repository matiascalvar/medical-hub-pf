import { useState, useEffect } from "react";
import { getMedicDetail, updateMedic  } from "./requests";

export default function MedicsDetail(props: any) : JSX.Element {

    const getDetails = async (id: number) => {
        try {
            const response: any = await getMedicDetail(id)
            setMedic({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                idNumber: response.data.idNumber,
                availability: response.data.availability,
                avbFrom: response.data.avbFrom,
                avbTo: response.data.avbTo,
                appointmentDuration: response.data.appointmentDuration,
                createdAt: response.data.createdAt,
                specialty: response.data.Specialitie.name,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [ editable, setEditable] = useState("")

    const [ medic, setMedic ] = useState({
        firstName: "",
        lastName: "",
        idNumber: "",
        availability: "",
        avbFrom: "",
        avbTo: "",
        appointmentDuration: "",
        createdAt: "",
        specialty: "",        
    })

    function handleInputChange(e: any) {
        setMedic({
            ...medic,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: any) {
        e.preventDefault()
    }

    async function acceptChanges (e: any) {
        e.preventDefault()
        let updatedMedic = {
            firstName: medic.firstName,
            lastName: medic.lastName,
            idNumber: medic.idNumber,
            availability: medic.availability,
            avbFrom:medic.avbFrom,
            avbTo: medic.avbTo,
            appointmentDuration: medic.appointmentDuration,
            createdAt: medic.createdAt,
            SpecialitieId: 1
        }
        await updateMedic(props.id, updatedMedic)
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
                            value={medic.firstName}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.firstName}</span>
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
                            value={medic.lastName}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.lastName}</span>
                        <button onClick={() => setEditable("lastName")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="idNumber">ID NUMBER: </label>
                    {editable === "idNumber" ?
                    <>
                        <input
                            type="text" 
                            name="idNumber" 
                            value={medic.idNumber}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.idNumber}</span>
                        <button onClick={() => setEditable("idNumber")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="availability">AVAILABILITY: </label>
                    {editable === "availability" ?
                    <>
                        <input
                            type="text" 
                            name="availability" 
                            value={medic.availability}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.availability}</span>
                        <button onClick={() => setEditable("availability")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="avbFrom">AVB FROM: </label>
                    {editable === "avbFrom" ?
                    <>
                        <input
                            type="text" 
                            name="avbFrom" 
                            value={medic.avbFrom}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.avbFrom}</span>
                        <button onClick={() => setEditable("avbFrom")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="avbTo">AVB TO: </label>
                    {editable === "avbTo" ?
                    <>
                        <input
                            type="text" 
                            name="avbTo" 
                            value={medic.avbTo}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.avbTo}</span>
                        <button onClick={() => setEditable("avbTo")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="appointmentDuration">APP DURATION: </label>
                    {editable === "appointmentDuration" ?
                    <>
                        <input
                            type="text" 
                            name="appointmentDuration" 
                            value={medic.appointmentDuration}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.appointmentDuration}</span>
                        <button onClick={() => setEditable("appointmentDuration")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label htmlFor="specialty">SPECIALITY: </label>
                    {editable === "specialty" ?
                    <>
                        <input
                            type="text" 
                            name="specialty" 
                            value={medic.specialty}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.specialty}</span>
                        <button onClick={() => setEditable("specialty")}>EDIT</button>
                    </div> }
                </div>
                <div>
                    <label >CREATED AT: </label>
                    <span>{medic.createdAt}</span>
                </div>
            </form>
            <button onClick={acceptChanges}>ACCEPT CHANGES</button>
            <button onClick={() => props.return()}>BACK</button>
        </div>
    )
}