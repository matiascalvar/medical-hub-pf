
import { useState, useEffect } from "react";
import { addMedic, getSpecialities } from "../requests"

export default function AddMedic() : JSX.Element {

    const emptyInput = {
        email: "",
        firstName: "",
        lastName: "",
        idNumber: "",
        avbFrom: "",
        avbTo: "",
        appointmentDuration: "",
        speciality: "",
    }

    const [ specialities, setSpecialities ] = useState<any>()
    const [ input, setInput] = useState(emptyInput);
    const [ error, setError ] = useState<string>()

    async function loadSpecialites () {
        const response: any = await getSpecialities()
        if (response) setSpecialities(response.data)
    }

    function handleInputChange(e: any) {
        setInput({
            ...input,
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
        addMedic(input)
        setInput(emptyInput)
    }

    useEffect( () => {
        loadSpecialites()
    },[])

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
                    <label htmlFor="speciality">SPECIALITY:</label>
                    <input name="speciality" list="speciality" onChange={handleInputChange} autoComplete="off"/>
                    <datalist id="speciality">
                        {specialities? specialities.map((s: any) => <option value={s.name}>{s.name}</option> ): <option></option>}
                    </datalist>
                </div>
                {error? <h5>{error}</h5> : null}
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}