import { actionI } from "./interfaces";
import { ActionTypes } from "../actions/types";

const initialState: any = {
  user: {},
  patientInfo: {},
  patientById: {},
  medicInfo: {},
  appointments: [],
  specialities: [],
  medicSpeciality: [],
  history: [],
  updateResponse: {},
  changePassResponse: {},
  medicAppointments: [],
  specAppointments: [],
  preferenceId: "",
  paymentInfo: {},
  appointmentsPatients: [],
  plans: [],
  postReview: false,
  postStudy: false,
  studyTypes: [],
};

export default function reducer(state = initialState, action: actionI) {
  switch (action.type) {
    case ActionTypes.logUser:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.logout:
      return { ...initialState };
    case ActionTypes.getPatientInfo:
      return {
        ...state,
        patientInfo: action.payload,
      };
    case ActionTypes.getPatientById:
      return {
        ...state,
        patientById: action.payload
      }
    case ActionTypes.getMedicInfo:
      return {
        ...state,
        medicInfo: action.payload,
      };
    case ActionTypes.getAppointments:
      return {
        ...state,
        appointments: action.payload,
        medicAppointments: {},
        specAppointments: [],
      };
    case ActionTypes.getSpecialities:
      return {
        ...state,
        specialities: action.payload,
        medicSpeciality: [],
      };
    case ActionTypes.getMedicSpeciality:
      return {
        ...state,
        medicSpeciality: action.payload,
        medicAppointments: {},
        specAppointments: [],
      };
    case ActionTypes.getHistory:
      return {
        ...state,
        history: action.payload,
      };
    case ActionTypes.updatePatientInfo:
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
        specAppointments: [],
      };
    case ActionTypes.specAppointments:
      return {
        ...state,
        specAppointments: action.payload,
      };
    case ActionTypes.getPreferenceId:
      return {
        ...state,
        paymentInfo: action.payload,
      };
    case ActionTypes.filterHistoryStatus:
      const patientHistory = state.filterHistory;
      const resHistory =
        action.payload === "ALL"
          ? patientHistory
          : patientHistory.filter((h: any) => h.state === action.payload);
      return {
        ...state,
        filterHistory: resHistory,
      };
    case ActionTypes.getAppointmentsPatients:
      return {
        ...state,
        appointmentsPatients: action.payload,
      };
    case ActionTypes.getPlans:
      return {
        ...state,
        plans: action.payload,
      };

    case ActionTypes.addReview:
      if (action.payload) {
        return {
          ...state,
          postReview: true,
        };
      } else {
        return {
          ...state,
        };
      }
    case ActionTypes.updateMedicInfo:
      return {
        ...state,
        updateResponse: action.payload,
      };
    case ActionTypes.addStudy:
      if (action.payload) {
        return {
          ...state,
          postStudy: true,
        };
      } else {
        return {
          ...state,
          postStudy: false,
        };
      }

    case ActionTypes.studyTypes:
      return {
        ...state,
        studyTypes: action.payload,
      };

    default:
      return state;
  }
}
