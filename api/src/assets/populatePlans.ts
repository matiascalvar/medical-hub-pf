import { Plan } from "../models/Plan";

export default async function populatePlans() {
    
    const dataFromDB = await Plan.findAll();
    if (dataFromDB.length === 0) {
        
        let arrParsed: Array<object> = [
            {name: 'Particular', coveragePercentage: 0},
            {name: 'PLAN A', coveragePercentage: 50},
            {name: 'PLAN B', coveragePercentage: 100}
        ]
        
        Plan.bulkCreate(arrParsed)
        return arrParsed
    }
   
}
