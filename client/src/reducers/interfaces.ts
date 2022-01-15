import { ActionTypes } from "../actions/types";

export interface actionI {
	type: ActionTypes,
	payload: any
}

// Esto es solo un ejemplo, seguramente el initialState sea un objeto y hay que definir el tipo correcto
export interface stateI {
	counter: number;
}