import { useState, useEffect } from "react";

export default function AddMedic(medics: any) : JSX.Element {

    class Medic {
        id: number;
        name: string;
        idNumber: number;
        speciality: string;

        constructor (id: number, name: string, idNumber: number, speciality: string) {
            this.id = id;
            this.name = name;
            this.idNumber = idNumber;
            this.speciality = speciality;
        };
    }
    const [ medicList, setMedicList ] = useState<any> ();
    const [ toDisplay, setToDisplay ] = useState<any>();

    const createList = (medics: any) => {
        const medicList: any[] = []
        medics.forEach((medic: any) => medicList.push(new Medic(medic.id, `${medic.lastName}, ${medic.firstName}`, medic.idNumber, medic.Specialitie.name)))
        setMedicList(medicList)
        setToDisplay(medicList)
    }

    useEffect(()=>{
        createList(medics.medics)
    },[])

    return (
        <div>
            <h2>Medics:</h2>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>idNumber</th>
                        <th>Speciality</th>
                    </tr>
                    {toDisplay ? toDisplay.map((medic: any)=>
                        <tr>
                            <td>{medic.id}</td>
                            <td>{medic.name}</td>
                            <td>{medic.idNumber}</td>
                            <td>{medic.speciality}</td>
                        </tr>
                    ): null
                    }
                </tbody>
            </table>
        </div>    
    ) 
}