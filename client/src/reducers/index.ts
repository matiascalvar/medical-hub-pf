import { actionI, stateI } from "./interfaces";
import { ActionTypes } from "../actions/types";

const initialState: any = {
    user: {},
    userInfo :{},
    appointments:[]
};


export default function reducer(state:stateI = initialState, action: actionI) {
	switch (action.type) {
		case ActionTypes.logUser:
            return {
                ...state,
                user: action.payload
            }
        case ActionTypes.getUserInfo:
            return {
                ...state,
                userInfo: action.payload
            }
        case ActionTypes.getAppointments:
            return {
                ...state,
                appointments: action.payload
            }
		default:
			return state;
	}
}
