// Si esta interface genera problemas, creo que migrando a redux 3.9 se soluciona
export interface S {
    type: number,
    payload: any
}

// Esta interface depende de la respuesta de nuestro Axios. 
export interface User {
	id: number;
	name: string;
	lastName: string;
}