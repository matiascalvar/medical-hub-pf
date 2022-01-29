import { Sequelize } from "sequelize-typescript";
import config from "../lib/config";
config;

export const sequelize = new Sequelize(
  `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`,
  {
    models: [__dirname + "/models"],
    logging: false,
  }
);

const {
  User,
  Patient,
  Plan,
  Appointment,
  AppointmentDetail,
  MedicalStaff,
  Specialitie,
  Studie,
  StudyType,
} = sequelize.models;

Patient.belongsTo(User, { targetKey: "id" });
User.hasOne(Patient, { sourceKey: "id" });

Plan.hasOne(Patient, { sourceKey: "id" });
Patient.belongsTo(Plan, { targetKey: "id" });

Patient.hasMany(Appointment, {
  sourceKey: "id",
  foreignKey: "PatientId",
});

Specialitie.hasMany(MedicalStaff, {
  sourceKey: "id",
  foreignKey: "SpecialitieId",
});
MedicalStaff.belongsTo(Specialitie);

MedicalStaff.belongsTo(User, { targetKey: "id" });
User.hasOne(MedicalStaff, { sourceKey: "id" });

MedicalStaff.hasMany(Appointment, {
  sourceKey: "id",
  foreignKey: "MedicalStaffId",
});
Appointment.belongsTo(MedicalStaff);

// Studies retaltions
StudyType.hasOne(Studie, { sourceKey: "id" });
Studie.belongsTo(StudyType, { targetKey: "id" });

MedicalStaff.hasMany(Studie, {
  sourceKey: "id",
  foreignKey: "MedicalStaffId",
});
Studie.belongsTo(MedicalStaff);

Appointment.hasMany(Studie, {
  sourceKey: "id",
  foreignKey: "AppointmentId",
});
Studie.belongsTo(Appointment);

Patient.hasOne(Studie, { sourceKey: "id" });
Studie.belongsTo(Patient, { targetKey: "id" });

Appointment.hasOne(AppointmentDetail, { sourceKey: "id" });
AppointmentDetail.belongsTo(Appointment, { targetKey: "id" });
