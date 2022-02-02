"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// QUITAR FORCE: TRUE SI SE QUIERE CONSERVAR LAS TABLAS DE LA DB
const populateStudyTypes_1 = __importDefault(require("./src/assets/populateStudyTypes"));
const studiesList_1 = __importDefault(require("./src/assets/studiesList"));
const defaultMedicalStaff_1 = __importDefault(require("./src/assets/defaultMedicalStaff"));
const db_1 = require("./src/db");
const app_1 = __importDefault(require("./src/app"));
const clearDB_1 = __importDefault(require("./src/assets/clearDB"));
const cron = require("node-cron");
db_1.sequelize
    .sync({ force: true, logging: false })
    .then(() => {
    console.log("You're now connected to the database.");
    app_1.default.listen(process.env.PORT || 3001, function () {
        console.log("App is listening on port 3001!");
    });
    //populateDB(jsonSpecialities);
    (0, defaultMedicalStaff_1.default)();
    (0, populateStudyTypes_1.default)(studiesList_1.default);
})
    .catch((err) => console.error(err));
cron.schedule("0 0 * * *", () => {
    (0, clearDB_1.default)();
});
