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
