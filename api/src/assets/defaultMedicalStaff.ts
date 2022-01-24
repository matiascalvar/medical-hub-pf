const medicalList = require('./medicalStafList.json')
import { User } from '../models/User'
import { Patient } from '../models/Patient'
import { MedicalStaff } from '../models/MedicalStaff'
import populateDB from './populate'
import jsonSpecialities from './specialitiesJSON';
// import populatePlans from './populatePlans'

const hashedPass = '$2b$10$tmnj1HpZkixb7B2.2J7pAeP8.w.Wg2hgC1uPtL9UM9M8hZUQ8ZLYm'
// Resultado de hashear "123456789"
const defaultMedicalStaff = async () => {
    
    const specialities = await populateDB(jsonSpecialities)
    //const plans = await populatePlans()
    
    let specQuantity: number[] = [];
    let i=1;
    specialities?.map(s => {specQuantity.push(i++)})
    
    // let plansQuantity: number[] = [];
    // let x=1;
    // plans?.map(s => {plansQuantity.push(x++)})
  
    const usersFromDB = await User.findAll();
    if (usersFromDB.length === 0) { 
        medicalList.map( async (e:any) =>
        
        {
            const newUser = {
                email: e.email,
                hashedPass: hashedPass,
                isStaff: true
            }
            const user = await User.create(newUser)

            const newPatient = {
                firstName: e.firstName,
                lastName: e.lastName,
                phone: e.phone,
                dni: e.dni,
                UserId: user.id,
                //PlanId: plansQuantity ? plansQuantity[Math.floor(Math.random() * plansQuantity?.length)] : null
            }
            const patient = await Patient.create(newPatient)

            const newMedic = {
                UserId: user.id,
                firstName: e.firstName,
                lastName: e.lastName,
                idNumber: e.dni,
                SpecialitieId: specQuantity ? specQuantity[Math.floor(Math.random() * specQuantity?.length)] : null
            }
            const medic = await MedicalStaff.create(newMedic)

        }
        )

    }
}

export default defaultMedicalStaff;
