import {Sequelize} from 'sequelize-typescript';
import config from '../lib/config';
config;
export const sequelize = new Sequelize({
	dialect: 'postgres',
	database: config.dbName,
	password: config.dbPassword,
	username: config.dbUser,
	storage: ':memory:',
	models: [__dirname + '/models'],
	logging: false
});


const { User, Patient, Plan, Appointment, AppointmentDetail, MedicalStaff, Specialitie, Studie, StudyType} = sequelize.models;


Patient.belongsTo(User, { targetKey: "id" } )
User.hasOne(Patient, { sourceKey: "id" })

Plan.hasOne(Patient, { sourceKey: "id" })
Patient.belongsTo(Plan, { targetKey: "id" })

Patient.hasMany(Appointment, {
	sourceKey: "id",
  	foreignKey: "PatientId"
})

// Appointment.belongsTo(Patient)

Specialitie.hasMany(MedicalStaff, {
	sourceKey: "id",
  	foreignKey: "SpecialitieId"
})

// MedicalStaff.belongsTo(Specialitie, { targetKey: "id" });
// Specialitie.hasMany(MedicalStaff, { sourceKey: "id" });

// MedicalStaff.belongsToMany(Specialitie, { through: "MedicalStaff_Specialities" });
// Specialitie.belongsToMany(MedicalStaff, { through: "MedicalStaff_Specialities" });

MedicalStaff.belongsTo(User, { targetKey: "id" });
User.hasOne(MedicalStaff, { sourceKey: "id" });

// Studies retaltions 
StudyType.hasOne(Studie);
Studie.belongsTo(MedicalStaff);

Studie.belongsTo(Appointment);
Studie.belongsTo(Patient)

Appointment.hasOne(AppointmentDetail)

