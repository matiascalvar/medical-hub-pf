import axios from "axios";

export const addMedic = async (input: any) => {
    try {
        const response = await axios.post("http://localhost:3001/medicalstaff", input);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}