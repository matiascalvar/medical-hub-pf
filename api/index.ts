// QUITAR FORCE: TRUE SI SE QUIERE CONSERVAR LAS TABLAS DE LA DB
import populateDB from './src/assets/populate';
import jsonSpecialities from '../api/src/assets/specialitiesJSON';

import {sequelize} from './src/db';
import app from './src/app';
import defaultMedicalStaff from './src/assets/defaultMedicalStaff';
sequelize
	.sync({force: true, logging: false})
	.then(() => {
		console.log("You're now connected to the database.");
		app.listen(3001, function () {
			console.log('App is listening on port 3001!');
		});
		//populateDB(jsonSpecialities);
		defaultMedicalStaff()
        

	})
	.catch((err) => console.error(err));