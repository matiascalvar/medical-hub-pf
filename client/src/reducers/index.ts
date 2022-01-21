import { actionI, stateI } from "./interfaces";
import { ActionTypes } from "../actions/types";

const initialState: any = {
    user: {}
};


export default function reducer(state:stateI = initialState, action: actionI) {
	switch (action.type) {
		case ActionTypes.logUser:
            return {
                ...state,
                user: action.payload
            }
		default:
			return state;
	}
}
