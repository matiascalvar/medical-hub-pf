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
	logging: false,
});


const { MedicalStaff, Specialitie,User , Studie, studyType} = sequelize.models;


MedicalStaff.belongsToMany(Specialitie, { through: "MedicalStaff_Specialities" });
Specialitie.belongsToMany(MedicalStaff, { through: "MedicalStaff_Specialities" });


MedicalStaff.belongsTo(User);


// Stduies retaltions 
studyType.hasOne(Studie);
studyType.belongsTo(MedicalStaff);