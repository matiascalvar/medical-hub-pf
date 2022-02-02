"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../lib/config"));
config_1.default;
exports.sequelize = new sequelize_typescript_1.Sequelize(`postgres://${config_1.default.dbUser}:${config_1.default.dbPassword}@${config_1.default.dbHost}/${config_1.default.dbName}`, {
    models: [__dirname + "/models"],
    logging: false,
});
const { User, Patient, Plan, Appointment, AppointmentDetail, MedicalStaff, Specialitie, Studie, StudyType, } = exports.sequelize.models;
Patient.belongsTo(User, { targetKey: "id" });
User.hasOne(Patient, { sourceKey: "id" });
Plan.hasOne(Patient, { sourceKey: "id" });
Patient.belongsTo(Plan, { targetKey: "id" });
Patient.hasMany(Appointment, {
    sourceKey: "id",
    foreignKey: "PatientId",
});
Appointment.belongsTo(Patient);
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
