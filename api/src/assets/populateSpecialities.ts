import { Specialitie } from "../models/Specialitie";

export default async function populateSpecialities(params: []) {
  const dataFromDB = await Specialitie.findAll();
  if (dataFromDB.length === 0) {
    let arrParsed: Array<any> = [];
    params.map((e) => arrParsed.push(JSON.parse(e)));
    Specialitie.bulkCreate(arrParsed);
    return arrParsed;
  }
}
