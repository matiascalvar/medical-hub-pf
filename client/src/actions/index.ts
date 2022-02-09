import axios from "axios";
import { Dispatch } from "react";
import { User } from "./interfaces";
import { ActionTypes } from "./types";

export const URL_DEPLOY = "http://localhost:3001"; // https://medicalhubpf.herokuapp.com

function createHeaders(token: string) {
  return {
    headers: {
      Authorization: token,
      Accept: "aplication/json",
    },
  };
}

export const logUser = (activeUser: User) => async (dispatch: any) => {
  dispatch({ type: ActionTypes.logUser, payload: activeUser });
  const headers = createHeaders(activeUser.token);
  const authAxios = axios.create(headers);
  if (activeUser.role === "patient") {
    try {
      const response = await authAxios.get(`${URL_DEPLOY}/users`);
      if (response) {
        dispatch({
          type: ActionTypes.getPatientInfo,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else if (activeUser.role === "medic") {
    try {
      const response = await authAxios.get(`${URL_DEPLOY}/users/medic`);
      if (response) {
        dispatch({
          type: ActionTypes.getMedicInfo,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    const response = await axios.delete(`${URL_DEPLOY}/login/remove`); 
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: ActionTypes.logout });
};

export const getPatientInfo = (activeUser: any) => async (dispatch: any) => {
  const headers = createHeaders(activeUser.token);
  const authAxios = axios.create(headers);
  try {
    const response = await authAxios.get(`${URL_DEPLOY}/users`);
    if (response) {
      dispatch({
        type: ActionTypes.getPatientInfo,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPatientById = (id:any) => async(dispatch:any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/patients/${id}`);
    if(response){
      dispatch({
        type: ActionTypes.getPatientById,
        payload: response.data
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const getAppointments = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/appointments/${id}`);
    if (response) {
      dispatch({
        type: ActionTypes.getAppointments,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpecialities = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/specialities`);
    dispatch({
      type: ActionTypes.getSpecialities,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMedicSpeciality = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/specialities/${id}`);
    dispatch({
      type: ActionTypes.getMedicSpeciality,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAppointmentsAvailable = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/appointments/avb/${id}`);
    dispatch({
      type: ActionTypes.getMedicSpeciality,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getHistory = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/studies/${id}`);
    if (response) {
      dispatch({
        type: ActionTypes.getHistory,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePatientInfo =
  (activeUser: any, data: any) => async (dispatch: any) => {
    const headers = createHeaders(activeUser.token);
    const authAxios = axios.create(headers);
    try {
      const response = await authAxios.post(`${URL_DEPLOY}/updateUser`, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dni: data.dni,
      });
      if (response) {
        dispatch({
          type: ActionTypes.updatePatientInfo,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const changePassword =
  (activeUser: any, data: any) => async (dispatch: any) => {
    const headers = createHeaders(activeUser.token);
    const authAxios = axios.create(headers);
    try {
      const response = await authAxios.post(
        `${URL_DEPLOY}/password`,
        {
          password: data.password,
        }
      );
      if (response) {
        dispatch({
          type: ActionTypes.changePassResponse,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getMedicAvailableTime = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `${URL_DEPLOY}/appointmentsAvb?idMedicalStaff=${id}&weekDays=7`
    );
    dispatch({
      type: ActionTypes.medicAppointments,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSpecAvailableTime = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `${URL_DEPLOY}/appointments/avbspeciality/${id}`
    );
    dispatch({
      type: ActionTypes.specAppointments,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPreferenceId =
  (quantity: string, unit_price: string, data: any) =>
  async (dispatch: any) => {
    let medic = `Dr. ${data.MedicalStaff.firstName} ${data.MedicalStaff.lastName}`;
    try {
      const response = await axios.get(
        `${URL_DEPLOY}/mercadopago?appointmentId=${data.id}&unit_price=${unit_price}&title=${medic}`
      );
      if (response) {
        dispatch({
          type: ActionTypes.getPreferenceId,
          payload: {
            preferenceId: response.data.preferenceId,
            appointmentId: data.id,
            medic,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const filterHistoryStatus = (payload: any) => {
  return {
    type: ActionTypes.filterHistoryStatus,
    payload,
  };
};

// Conseguir los turnos de los pacientes como medicos
export const getAppointmentsPatients =
  (id: number) => async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${URL_DEPLOY}/appointments/medic/${id}`
      );

      dispatch({
        type: ActionTypes.getAppointmentsPatients,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateMedicInfo =
  (activeUser: any, data: any, id: any) => async (dispatch: any) => {
    try {
      const response = await axios.post(`${URL_DEPLOY}/updateMedic/${id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        idNumber: data.dni,
        availability: data.availability,
        speciality: data.specialitie,
      });
      if (response) {
        dispatch({
          type: ActionTypes.updateMedicInfo,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getPlans = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/plans`);

    dispatch({
      type: ActionTypes.getPlans,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addReview = (id: any, payload: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      `${URL_DEPLOY}/appointmentsDetails/${id}`,
      payload
    );
    dispatch({
      type: ActionTypes.addReview,
      payload: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ActionTypes.addReview,
      payload: false,
    });
  }
};

export const addStudy = (payload: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${URL_DEPLOY}/studies`, payload);
    console.log(response);
    dispatch({
      type: ActionTypes.addStudy,
      payload: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ActionTypes.addStudy,
      payload: false,
    });
  }
};

export const getStudyTypes = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${URL_DEPLOY}/studies/types`);
    dispatch({
      type: ActionTypes.studyTypes,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearSubmitForm = () => {
  console.log("Entra");
  return {
    type: ActionTypes.addStudy,
    payload: false,
  };
};
