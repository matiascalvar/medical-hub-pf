import { useState, useEffect } from "react";
import { SignatureHelpTriggerReason } from "typescript";
import { getAppointmentDetail, updateAppointment, removeAppointment  } from "../requests";

export default function AppointmentsDetail(props: any) : JSX.Element {
    
    class Prop {
        key: string;
        value: any;
        
        constructor (key: string, value: any) {
            this.key = key;
            this.value = value;
        };
    }

    const getDetails = async (id: number) => {
        try {
            const response: any = await getAppointmentDetail(id)
            let appointment: any[] = []
            appointment.push(new Prop("id",response.data.id))
            appointment.push(new Prop("patient",`${response.data.Patient.firstName}, ${response.data.Patient.lastName}`))
            appointment.push(new Prop("medic",`${response.data.MedicalStaff.firstName}, ${response.data.MedicalStaff.lastName}`))
            appointment.push(new Prop("date",response.data.date))
            appointment.push(new Prop("time",response.data.time))
            appointment.push(new Prop("state",response.data.state))
            appointment.push(new Prop("pay",response.data.pay))
            appointment.push(new Prop("speciality",response.data.MedicalStaff.Specialitie.name))
            appointment.push(new Prop("AppointmentDetail",response.AppointmentDetail || "No details available" ))
            setAppointment(appointment)
        } catch (error) {
            console.log(error)
        }
    }
    const [ appointment , setAppointment] = useState<any>([])
    const [ newState, setNewState ] = useState("")
    const [ error, setError ] = useState("")

    const changeState = (e: any) => {
        e.preventDefault()
        setNewState(e.target.value)
    }
    const acceptChanges = async (e: any) => {
        if (newState && newState != appointment.find((a:any) => a.key === "state").value) {
            await updateAppointment(appointment.find((a:any) => a.key === "id").value, {state: newState})
        }
        props.reolad()
    }

    const removeApp = async (e: any) => {
        if (appointment.find((a:any) => a.key === "state").value === "ACTIVE") {
            await removeAppointment(appointment.find((a:any) => a.key === "id").value)
            props.reolad()
        } else {
            setError(`Can't remove ${appointment.find((a:any) => a.key === "state").value } appointments.`)
        }

    }

    useEffect(() => {
        getDetails(props.id)
    },[])

    return(
        <div>
            <h2>Details:</h2>
            {appointment.map((a:any) => 
                <div>
                    <h3>{a.key}: </h3> 
                    <h2>{a.value}</h2>
                </div>
            )}
            <label htmlFor="state">Change state to: </label>
            <select onChange={changeState} name="state" id="state">
                <option></option>
                <option>ACTIVE</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
            </select>
            <button onClick={acceptChanges}>ACCEPT</button>
            <button onClick={removeApp}>REMOVE APPOINTMENT</button>
            <button onClick={() => props.return()}>BACK</button>
            {error? <h4>{error}</h4> : null}
        </div>
    )
}