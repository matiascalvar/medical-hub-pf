import { StudyType } from "../models/StudyType";

export default async function populateStudyTypes(params: []) {
  const dataFromDB = await StudyType.findAll();
  if (dataFromDB.length === 0) {
    let arrParsed: any = [];
    params.map((e) => arrParsed.push(JSON.parse(e)));
    StudyType.bulkCreate(arrParsed);
    return arrParsed;
  }
}
