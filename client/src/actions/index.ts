import axios from 'axios';
import { Dispatch } from 'react';
import { User } from './interfaces';
import { ActionTypes } from './types';

export const logUser = (user: User) => {
    return { type: ActionTypes.logUser, payload: user}
};


// url de ejemplo, cambiar a la correspondiente y actualizar la interface
// const url = 'https://localhost:3001/user';

// url de ejemplo, cambiar a la correspondiente y actualizar la interface
// const url = 'https://localhost:3001/user';


// export const fetchUsers = () => async(dispatch:Dispatch<S>) => {
// 	try{
// 		const response = (await axios.get<User[]>(url)).data;
// 		dispatch({
// 			type: ActionTypes.fetchUsers,
// 			payload: response
// 		})
// 	}catch(error){
// 		console.log(error, "function fetchUsers");
// 	}
// }
