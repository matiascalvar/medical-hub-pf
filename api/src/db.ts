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

const { User, UserType, Patient, Plan, Appointment, AppointmentDetail, MedicalStaff, Specialitie, Studie, StudyType} = sequelize.models;


User.belongsToMany(UserType, { through: 'Users_UserTypes' })
UserType.belongsToMany(User, { through: 'Users_UserTypes' })

Patient.belongsTo(User)

Plan.hasOne(Patient)

Appointment.belongsTo(Patient)

Appointment.hasOne(AppointmentDetail)


MedicalStaff.belongsToMany(Specialitie, { through: "MedicalStaff_Specialities" });
Specialitie.belongsToMany(MedicalStaff, { through: "MedicalStaff_Specialities" });


MedicalStaff.belongsTo(User);




// Studies retaltions 
StudyType.hasOne(Studie);
Studie.belongsTo(MedicalStaff);

//console.log(User)
Studie.belongsTo(Appointment);
Studie.belongsTo(Patient)