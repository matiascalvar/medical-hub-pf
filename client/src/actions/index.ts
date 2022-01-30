import axios from "axios";
import { Dispatch } from "react";
import { User } from "./interfaces";
import { ActionTypes } from "./types";

export const logUser = (user: User) => {
  return { type: ActionTypes.logUser, payload: user };
};

export const logout = () => async (dispatch: any) => {
  try {
    const response = await axios.delete("http://localhost:3001/login/remove");
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: ActionTypes.logout });
};

export const getUserInfo = (activeUser: any) => async (dispatch: any) => {
  const headers = {
    headers: {
      Authorization: activeUser.token,
      Accept: "aplication/json",
    },
  };
  const authAxios = axios.create(headers);
  try {
    const response = await authAxios.get("http://localhost:3001/users");
    if (response) {
      dispatch({
        type: ActionTypes.getUserInfo,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/appointments/${id}`
    );
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
    const response = await axios.get(`http://localhost:3001/specialities`);
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
    const response = await axios.get(
      `http://localhost:3001/specialities/${id}`
    );
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
    const response = await axios.get(
      `http://localhost:3001/appointments/avb/${id}`
    );
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
    const response = await axios.get(`http://localhost:3001/studies/${id}`);
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

export const updateUserInfo =
  (activeUser: any, data: any) => async (dispatch: any) => {
    const headers = {
      headers: {
        Authorization: activeUser.token,
        Accept: "aplication/json",
      },
    };
    const authAxios = axios.create(headers);
    try {
      const response = await authAxios.post(
        "http://localhost:3001/updateUser",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          dni: data.dni,
        }
      );
      if (response) {
        dispatch({
          type: ActionTypes.updateUserInfo,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const changePassword =
  (activeUser: any, data: any) => async (dispatch: any) => {
    const headers = {
      headers: {
        Authorization: activeUser.token,
        Accept: "aplication/json",
      },
    };
    const authAxios = axios.create(headers);
    try {
      const response = await authAxios.post(
        "http://localhost:3001/register/password",
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
      `http://localhost:3001/appointments/avb/${id}`
    );
    dispatch({
      type: ActionTypes.medicAppointments,
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
        `http://localhost:3001/mercadopago?appointmentId=${data.id}&unit_price=${unit_price}&title=${medic}`
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

