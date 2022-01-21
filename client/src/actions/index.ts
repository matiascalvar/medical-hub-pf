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


 export const getUserInfo = (activeUser:any) => async(dispatch : any) => {
    const headers = {
        headers: {
            Authorization: activeUser.token,
            Accept: 'aplication/json'
        },
    }
    const authAxios = axios.create(headers)
    try {
        const response = await authAxios.get('http://localhost:3001/users');
        if (response) {
            dispatch({
                type: ActionTypes.getUserInfo, payload:response.data});
            
        }
    } catch(error) {
        console.log(error)
    }
}


export const getAppointments = (id:number) => async(dispatch : any) => {
   /*  const headers = {
        headers: {
            Accept: 'aplication/json'
        },
    }
    const authAxios = axios.create(headers); */
    try {
        const response = await axios.get(`http://localhost:3001/appointments/${id}`);
        if (response) {
            dispatch({
                type: ActionTypes.getAppointments, payload:response.data});
            
        }
    } catch(error) {
        console.log(error)
    }
}
