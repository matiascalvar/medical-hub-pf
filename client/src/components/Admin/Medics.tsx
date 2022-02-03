import { useState, useEffect } from "react";
import { RiH2 } from "react-icons/ri";
import { getMedics } from "./requests";
import MedicsDetail from "./MedicsDetail";

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
    const [ filtered, setFiltered ]= useState<any> ();
    const [ toDisplay, setToDisplay ] = useState<any> ();
    const [ specialties, setSpecialties] = useState<any> ();
    const [ searchInput, setSearchInput ] = useState("");
    const [ detailed, setDetailed] = useState<number> ();

    const createList = async () => {
        const response: any = await getMedics()
        if (response) {
            const medicList: any[] = []
            response.data.forEach((medic: any) => medicList.push(new Medic(
                medic.id,
                `${medic.lastName}, ${medic.firstName}`,
                medic.idNumber,
                medic.Specialitie.name
            )))
            createSpecialties(response.data)
            setMedicList(medicList)
            setFiltered(medicList)
            setToDisplay(medicList)
        }
    }

    const createSpecialties = (medics: any) => {
        const specialtiesList: any[] = []
        medics.forEach((medic: any) => specialtiesList.push(medic.Specialitie.name))
        const uniqueSpecialities = specialtiesList.filter((item,pos) => {
            return specialtiesList.indexOf(item) === pos;
        })
        setSpecialties(uniqueSpecialities)
    }

    const handleSearch = (e: any) => {
        setSearchInput(e.target.value)
        updateDisplay(e.target.value)
    }
  
    const updateFilter = (e: any) => {
        let filtered = []
        if (e.target.value === "All") {
            filtered = medicList
        } else {
            filtered = medicList.filter((medic: any) => medic.speciality === e.target.value)
        }
        setFiltered(filtered)
        updateDisplay(searchInput, filtered)
    }

    const updateDisplay = (input: string, array = filtered) => {
        setToDisplay(array.filter((medic: any) => medic.name.includes(input)))
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
            <h2>Medics:</h2>
            {detailed? <MedicsDetail id={detailed} return={() => setDetailed(undefined)} reolad={() => reload()}/> : 
                <div>
                    <div>
                        <label>Speciality:</label>
                        <select onChange={updateFilter} name="sepecialities">
                            <option>All</option>  
                            {specialties? specialties.map((sp: string) => <option>{sp}</option>) : null}                  
                        </select> 
                        <input 
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by name..."
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
                                <th>idNumber</th>
                                <th>Speciality</th>
                            </tr>
                            {toDisplay.map((medic: any)=>
                                <tr>
                                    <td>{medic.id}</td>
                                    <td>{medic.name}</td>
                                    <td>{medic.idNumber}</td>
                                    <td>{medic.speciality}</td>
                                    <td onClick={() => setDetailed(medic.id) }>Details</td>
                                </tr>
                            )}
                        </tbody>
                    </table> :
                    <h3>No hay medicos para mostrar</h3>
                    }
                </div>
            }
        </div>    
    ) 
}