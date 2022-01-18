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


const { MedicalStaff, Specialitie} = sequelize.models;


MedicalStaff.belongsToMany(Specialitie, { through: "MedicalStaff_Specialities" });
Specialitie.belongsToMany(MedicalStaff, { through: "MedicalStaff_Specialities" });