import { useState, useEffect } from "react";
import { getMedicDetail, updateMedic, getSpecialities  } from "../requests";

export default function MedicsDetail(props: any) : JSX.Element {

    const loadSpecialites = async () => {
        const response: any = await getSpecialities()
        if (response) setSpecialities(response.data)
    }

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
                speciality: response.data.Specialitie.name,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const [ editable, setEditable] = useState("")
    const [ error, setError ] = useState<string>()
    const [ specialities, setSpecialities ] = useState<any>()
    const [ medic, setMedic ] = useState({
        firstName: "",
        lastName: "",
        idNumber: "",
        availability: "",
        avbFrom: "",
        avbTo: "",
        appointmentDuration: "",
        createdAt: "",
        speciality: "",        
    })

    function handleInputChange(e: any) {
        setMedic({
            ...medic,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "speciality") verifySpeciality(e.target.value)
    }

    function verifySpeciality (input: string) {
        if(!specialities.find((s: any) => s.name === input) && input != "") {
            setError("New Speciality")
        } else {
            setError("")
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
    }

    async function acceptChanges (e: any) {
        e.preventDefault()
        await updateMedic(props.id, medic)
        props.reolad()
    }

    useEffect(() => {
        getDetails(props.id)
        loadSpecialites()
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
                    <label htmlFor="speciality">SPECIALITY: </label>
                    {editable === "speciality" ?
                    <>
                        <input name="speciality" list="speciality" onChange={handleInputChange} autoComplete="off" />
                        <datalist id="speciality">
                            {specialities? specialities.map((s: any) => <option value={s.name}>{s.name}</option> ): <option></option>}
                        </datalist>
                        {error? <h5>{error}</h5> : null}
                        <button onClick={() => setEditable("")}>ACCEPT</button>
                    </> :
                    <div>
                        <span>{medic.speciality}</span>
                        <button onClick={() => setEditable("speciality")}>EDIT</button>
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