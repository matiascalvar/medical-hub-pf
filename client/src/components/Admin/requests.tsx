import axios from "axios";
import { URL_DEPLOY } from "../../actions";

// const URL = "https://medicalhubpf.herokuapp.com";

// --------------------------------------------- MEDICS ---------------------------------------------

export const addMedic = async (input: any) => {
    try {
        const response = await axios.post(URL_DEPLOY + "/medicalstaff", input)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getMedics = async () => {
    try {
        const response = await axios.get(URL_DEPLOY + "/medicalstaff")
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getMedicDetail = async (id: number) => {
    try {
        const response = await axios.get(URL_DEPLOY + "/medicalstaff/" + id)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateMedic = async (id: number, data: any) => {
    try {
        const response = await axios.post(URL_DEPLOY + "/medicalstaff/" + id, data);
        return response
      } catch (error) {
        console.log(error);
      }
}

export const getSpecialities = async () => {
    try {
        const response = await axios.get(URL_DEPLOY + "/specialities", )
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

// --------------------------------------------- PATIENTS ---------------------------------------------

export const addPatient = async (input: any) => {
    try {
        const response = await axios.post(URL_DEPLOY + "/patients", input)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getPatients = async () => {
    try {
        const response = await axios.get(URL_DEPLOY + "/patients")
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getPatientDetails = async (id: number) => {
    try {
        const response = await axios.get(URL_DEPLOY + "/patients/" + id)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updatePatient = async (id: number, data: any) => {
    try {
        const response = await axios.post(URL_DEPLOY + "/patients/" + id, data);
        return response
      } catch (error) {
        console.log(error);
      }
}

export const updatePermissions = async (id: number, data: any) => {
    try {
        const response = await axios.post(URL_DEPLOY + "/updateUser/permissions/" + id, data);
        return response
      } catch (error) {
        console.log(error);
      }
}

export const getPlans = async () => {
    try {
        const response = await axios.get(URL_DEPLOY + "/plans")
        return response
    } catch (error) {
        console.log(error)
    }
}

// --------------------------------------------- APPOINTMENTS ---------------------------------------------

export const addAppointment = async (input: any) => {
    try {
        console.log(input)
        const response = await axios.post(URL_DEPLOY + "/appointments", input)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAppointments = async () => {
    try {
        const response = await axios.get(URL_DEPLOY + "/appointments")
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAppointmentDetail = async (id: number) => {
    try {
        const response = await axios.get(URL_DEPLOY + "/appointments/details/" + id)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const removeAppointment = async (id: number) => {
    try {
        const response = await axios.delete(URL_DEPLOY + "/appointments/" + id)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateAppointment = async (id: number, data: any) => {
    try {
        const response = await axios.put(URL_DEPLOY + "/appointments/update/" + id, data)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAvailability = async (data: any) => {
    try {
        const response = await axios.put(URL_DEPLOY + "/appointments/avb/bymedic", data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
