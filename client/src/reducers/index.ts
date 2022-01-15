import { actionI, stateI } from "./interfaces";
import { ActionTypes } from "../actions/types";

const initialState: stateI = {
	counter: 1,
};

export default function reducer(state:stateI = initialState, action: actionI) {
	switch (action.type) {
		case ActionTypes.fetchUsers:
			return action.payload;
		default:
			return state;
	}
}