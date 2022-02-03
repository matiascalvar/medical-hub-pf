// QUITAR FORCE: TRUE SI SE QUIERE CONSERVAR LAS TABLAS DE LA DB
import populateStudyTypes from "./src/assets/populateStudyTypes";
import studiesList from "./src/assets/Lists/studiesList";
import defaultMedicalStaff from "./src/assets/defaultMedicalStaff";
import { sequelize } from "./src/db";
import app from "./src/app";
import clearDB from "./src/assets/clearDB";
const cron = require("node-cron");

sequelize
  .sync({ force: true, logging: false })
  .then(() => {
    console.log("You're now connected to the database.");
    app.listen(process.env.PORT || 3001, function () {
      console.log("App is listening on port 3001!");
    });

    defaultMedicalStaff();
    populateStudyTypes(studiesList);
  })
  .catch((err) => console.error(err));

cron.schedule("0 0 * * *", () => {
  clearDB();
});
