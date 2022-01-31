import medicalStafList from "./medicalStafList";
import { User } from "../models/User";
import { Patient } from "../models/Patient";
import { MedicalStaff } from "../models/MedicalStaff";
import populateDB from "./populate";
import jsonSpecialities from "./specialitiesJSON";

const hashedPass =
  "$2b$10$RZzG/LFklcl/UazrmEKH2.gmoLLKLQ5U10XsYsA6afnRb5JH6ZlQ6";
// Resultado de hashear "12345"

const defaultMedicalStaff = async () => {
  // lleno especialidades con una funcion y un json
  const specialities = await populateDB(jsonSpecialities);

  // Esto está raro (specialities.length?)
  let specQuantity: number[] = [];
  let i = 1;
  specialities?.map((s) => {
    specQuantity.push(i++);
  });

  const usersFromDB = await User.findAll();
  if (usersFromDB.length === 0) {
    //  Si no hay users en la db mapeo la lista de medicos
    medicalStafList.map(async (e: any) => {
      // Creo un nuevo usuario
      const newUser = {
        email: e.email,
        hashedPass: hashedPass,
        isStaff: true,
      };
      const user = await User.create(newUser);
      // Creo un nuevo paciente
      //
      const newPatient = {
        firstName: e.firstName,
        lastName: e.lastName,
        phone: e.phone,
        dni: e.dni,
        UserId: user.id,
        PlanId: null,
      };
      // const patient = await Patient.create(newPatient);

      const newMedic = {
        UserId: user.id,
        firstName: e.firstName,
        lastName: e.lastName,
        idNumber: e.dni,
        SpecialitieId: specQuantity
          ? specQuantity[Math.floor(Math.random() * specQuantity?.length)]
          : null,
      };
      const medic = await MedicalStaff.create(newMedic);
    });
  }
};

export default defaultMedicalStaff;
