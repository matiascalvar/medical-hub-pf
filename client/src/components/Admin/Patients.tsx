import { useState, useEffect } from "react";
import { getPatients } from "./requests";
import PatientsDetail from "./PatientsDetail";

export default function Patients() : JSX.Element {

    class Patient {
        id: number;
        name: string;
        phone: number;
        dni: number;

        constructor (id: number, name: string, phone: number, dni: number) {
            this.id = id;
            this.name = name;
            this.phone = phone;
            this.dni = dni;
        };
    }
    const [ patientList, setPatientList ] = useState<any> ();
    const [ toDisplay, setToDisplay ] = useState<any> ();
    const [ searchInput, setSearchInput ] = useState("");
    const [ detailed, setDetailed] = useState<number> ();

    const createList = async () => {
        const response: any = await getPatients()
        if (response) {
            const patientList: any[] = []
            response.data.forEach((patient: any) => patientList.push(new Patient(
                patient.id,
                `${patient.lastName}, ${patient.firstName}`,
                patient.phone,
                patient.dni
            )))
            setPatientList(patientList)
            setToDisplay(patientList)
        }
    }

    const handleSearch = (e: any) => {
        setSearchInput(e.target.value)
        if (parseInt(e.target.value)) {
            updateDisplay(e.target.value, "dni")
        } else {
            updateDisplay(e.target.value, "name")
        }
    }
  
    const updateDisplay = (input: string, parameter: string) => {
        setToDisplay(patientList.filter((patient: any) => patient[parameter].includes(input)))
    }

    const reload = () => {
        createList()
        setDetailed(undefined)
    }

    useEffect(()=>{
        createList()
    },[])

    return (
        <div>
            <h2>Patients:</h2>
            {detailed? <PatientsDetail id={detailed} return={() => setDetailed(undefined)} reolad={() => reload()}/> : 
                <div>
                    <div>
                        <input 
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by name or dni..."
                            name="search"
                            value={searchInput}
                        />
                    </div>
                    {toDisplay && toDisplay.length > 0 ? 
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>DNI</th>
                            </tr>
                            {toDisplay.map((patient: any)=>
                                <tr>
                                    <td>{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.dni}</td>
                                    <td onClick={() => setDetailed(patient.id) }>Details</td>
                                </tr>
                            )}
                        </tbody>
                    </table> :
                    <h3>No hay pacientes para mostrar</h3>
                    }
                </div>
            }
        </div>    
    ) 
}