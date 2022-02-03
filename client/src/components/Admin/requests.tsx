import axios from "axios";

const URL = "http://localhost:3001"


export const addMedic = async (input: any) => {
    try {
        const response = await axios.post(URL + "/medicalstaff", input)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getMedics = async () => {
    try {
        const response = await axios.get(URL + "/medicalstaff")
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}