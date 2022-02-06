import { Plan } from "../models/Plan";


export default async function defaultPlans(params: []) {
  const dataFromDB = await Plan.findAll();
  if (dataFromDB.length === 0) {
    let arrParsed: Array<any> = [];
      
    params.map((e) => arrParsed.push(e));
    Plan.bulkCreate(arrParsed);
    return arrParsed;
  }
}


