import { actionI } from "./interfaces";
import { ActionTypes } from "../actions/types";

const initialState: any = {
  user: {},
  userInfo: {},
  appointments: [],
  specialities: [],
  medicSpeciality: [],
  history: [],
  updateResponse: {},
  changePassResponse: {},
  medicAppointments: [],
  specAppointments: [],
  preferenceId: "",
};

export default function reducer(state = initialState, action: actionI) {
  switch (action.type) {
    case ActionTypes.logUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.logout:
      return {
        initialState,
      };
    case ActionTypes.getUserInfo:
      return {
        ...state,
        userInfo: action.payload,
      };
    case ActionTypes.getAppointments:
      return {
        ...state,
        appointments: action.payload,
        medicAppointments: {},
        specAppointments: []
      };
    case ActionTypes.getSpecialities:
      return {
        ...state,
        specialities: action.payload,
      };
    case ActionTypes.getMedicSpeciality:
      return {
        ...state,
        medicSpeciality: action.payload,
        medicAppointments: {},
        specAppointments: []
      };
    case ActionTypes.getHistory:
      return {
        ...state,
        history: action.payload,
      };
    case ActionTypes.updateUserInfo:
      return {
        ...state,
        updateResponse: action.payload,
      };
    case ActionTypes.changePassResponse:
      return {
        ...state,
        changePassResponse: action.payload,
      };
    case ActionTypes.medicAppointments:
      return {
        ...state,
        medicAppointments: action.payload,
        specAppointments: []
      };
      case ActionTypes.specAppointments:
        return {
          ...state,
          specAppointments: action.payload,
        };  
    case ActionTypes.getPreferenceId:
      return {
        ...state,
        preferenceId: action.payload,
      };

    default:
      return state;
  }
}
