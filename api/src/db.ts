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

const { User, UserType } = sequelize.models;

User.belongsToMany(UserType, { through: 'Users_UserTypes' })
UserType.belongsToMany(User, { through: 'Users_UserTypes' })

//console.log(User)