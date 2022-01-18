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
});


const { MedicalStaff, Specialities, MedicalStaff_Specialities} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
MedicalStaff.belongsToMany(Specialities, { through: MedicalStaff_Specialities });
Specialities.belongsToMany(MedicalStaff, { through: MedicalStaff_Specialities });