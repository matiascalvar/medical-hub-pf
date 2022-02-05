import axios from "axios";

const URL = "http://localhost:3001"

// --------------------------------------------- MEDICS ---------------------------------------------

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

export const getMedicDetail = async (id: number) => {
    try {
        const response = await axios.get(URL + "/medicalstaff/" + id)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateMedic = async (id: number, data: any) => {
    try {
        const response = await axios.post(URL + "/medicalstaff/" + id, data);
        return response
      } catch (error) {
        console.log(error);
      }
}

export const getSpecialities = async () => {
    try {
        const response = await axios.get(URL + "/specialities", )
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

// --------------------------------------------- PATIENTS ---------------------------------------------

export const addPatient = async (input: any) => {
    try {
        const response = await axios.post(URL + "/patients", input)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getPatients = async () => {
    try {
        const response = await axios.get(URL + "/patients")
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getPatientDetails = async (id: number) => {
    try {
        const response = await axios.get(URL + "/patients/" + id)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}
export const updatePatient = async (id: number, data: any) => {
    try {
        const response = await axios.post(URL + "/patients/" + id, data);
        return response
      } catch (error) {
        console.log(error);
      }
}


// --------------------------------------------- APPOINTMENTS ---------------------------------------------

export const addAppointment = async (input: any) => {
    try {
        console.log(input)
        const response = await axios.post(URL + "/appointments", input)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAppointments = async () => {
    try {
        const response = await axios.get(URL + "/appointments")
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAppointmentDetail = async (id: number) => {
    try {
        const response = await axios.get(URL + "/appointments/details/" + id)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const removeAppointment = async (id: number) => {
    try {
        const response = await axios.delete(URL + "/appointments/" + id)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateAppointment = async (id: number, data: any) => {
    try {
        const response = await axios.put(URL + "/appointments/update/" + id, data)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAvailability = async (data: any) => {
    try {
        const response = await axios.put(URL + "/appointments/avb/bymedic", data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
