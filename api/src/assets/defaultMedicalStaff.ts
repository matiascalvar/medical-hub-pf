import medicalStafList from "./Lists/medicalStafList";
import { User } from "../models/User";
import { Patient } from "../models/Patient";
import { MedicalStaff } from "../models/MedicalStaff";
import populateSpecialities from "./populateSpecialities";
import specialitiesList from "./Lists/specialitiesList";

const hashedPass =
  "$2b$10$JRLczMb2BmdDqgG/bDM0xu0QOtnDG1/1BFEQPt6WI.O8jWBBxd2Em";
// Resultado de hashear "123456789"

const defaultMedicalStaff = async () => {
  // lleno especialidades con una funcion y un json
  const specialities = await populateSpecialities(specialitiesList);

  // Esto está raro (specialities.length?)
  let specQuantity: number[] = [];
  let i = 1;
  specialities?.map((s) => {
    specQuantity.push(i++);
  });

  const hoursFrom = [9,10,11,12]
  const hoursTo = [13,14,15,16,17]
  const minutes = [0,30]

  const usersFromDB = await User.findAll();
  //  Si no hay users en la db la populo
  if (usersFromDB.length === 0) {
    // Admin
    const newAdmin = {
      email: "admin@email.com",
      hashedPass:
        "$2b$10$EqKKUxxCsvVu00WJBNGScOYJRUUlOyi3KzVTkBBYJk1AgUCTKXF6e",
      isAdmin: true,
    };
    const admin = await User.create(newAdmin);
    // Lo voy a agregar como Patient porque la ruta /users sino causa conflictos. Hay que arreglarlo
    const newPatientAdmin = {
      firstName: "Admin",
      lastName: "Admin",
      phone: "00000000",
      dni: "00000000",
      UserId: admin.id,
      PlanId: null,
    };
    const patientAdmin = await Patient.create(newPatientAdmin);
    //
    medicalStafList.map(async (e: any) => {
      // Creo un nuevo usuario
      const newUser = {
        email: e.email,
        hashedPass: hashedPass,
        isStaff: true,
      };
      const user = await User.create(newUser);
      // Creo un nuevo paciente
      const newPatient = {
        firstName: e.firstName,
        lastName: e.lastName,
        phone: e.phone,
        dni: e.dni,
        UserId: user.id,
        PlanId: null,
      };
      const patient = await Patient.create(newPatient);
      // Creo un nuevo medico
      const newMedic = {
        UserId: user.id,
        firstName: e.firstName,
        lastName: e.lastName,
        idNumber: e.dni,
        avbFrom: `${hoursFrom[Math.floor((Math.random() * hoursFrom?.length))]}:${minutes[Math.floor((Math.random() * minutes.length))]}:00"`,
        avbTo: `${hoursTo[Math.floor((Math.random() * hoursTo?.length))]}:${minutes[Math.floor((Math.random() * minutes.length))]}:00"`,
        SpecialitieId: specQuantity
          ? specQuantity[Math.floor(Math.random() * specQuantity?.length)]
          : null,
      };
      const medic = await MedicalStaff.create(newMedic);
    });
  }
};

export default defaultMedicalStaff;
