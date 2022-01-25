
const data1 = JSON.parse(`{"time":"9:00", "date":"2022-02-10","medic":"Sebastian Ferrer"}`);
const data2 = JSON.parse(`{"time":"10:00", "date":"2022-03-20","medic":"Cano Nestor"}`);

const data3 = JSON.parse(`{"amount":1000, "pending":false, "pay": "dentist" }`);

const data4 = JSON.parse(`{"date":"2022-01-06", "medic":"Sebastian Ferrer", "type": "dentist", "id": 1}`);

export const appoinments = [data1,data2];

export const payments = [data3];

export const history = [data4];