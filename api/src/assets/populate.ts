import { Specialitie } from "../models/Specialitie"

export default async function populateDB(params: []) {

    let arrParsed: Array<object> = []
    params.map(e => arrParsed.push(JSON.parse(e)))
    Specialitie.bulkCreate(arrParsed)
    return arrParsed;
}
