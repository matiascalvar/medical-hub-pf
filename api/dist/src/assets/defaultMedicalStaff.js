"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medicalStafList_1 = __importDefault(require("./medicalStafList"));
const User_1 = require("../models/User");
const MedicalStaff_1 = require("../models/MedicalStaff");
const populate_1 = __importDefault(require("./populate"));
const specialitiesJSON_1 = __importDefault(require("./specialitiesJSON"));
const hashedPass = "$2b$10$RZzG/LFklcl/UazrmEKH2.gmoLLKLQ5U10XsYsA6afnRb5JH6ZlQ6";
// Resultado de hashear "12345"
const defaultMedicalStaff = () => __awaiter(void 0, void 0, void 0, function* () {
    // lleno especialidades con una funcion y un json
    const specialities = yield (0, populate_1.default)(specialitiesJSON_1.default);
    // Esto está raro (specialities.length?)
    let specQuantity = [];
    let i = 1;
    specialities === null || specialities === void 0 ? void 0 : specialities.map((s) => {
        specQuantity.push(i++);
    });
    const usersFromDB = yield User_1.User.findAll();
    if (usersFromDB.length === 0) {
        //  Si no hay users en la db mapeo la lista de medicos
        medicalStafList_1.default.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            // Creo un nuevo usuario
            const newUser = {
                email: e.email,
                hashedPass: hashedPass,
                isStaff: true,
            };
            const user = yield User_1.User.create(newUser);
            // Creo un nuevo paciente
            //
            const newPatient = {
                firstName: e.firstName,
                lastName: e.lastName,
                phone: e.phone,
                dni: e.dni,
                UserId: user.id,
                PlanId: null,
            };
            // const patient = await Patient.create(newPatient);
            const newMedic = {
                UserId: user.id,
                firstName: e.firstName,
                lastName: e.lastName,
                idNumber: e.dni,
                SpecialitieId: specQuantity
                    ? specQuantity[Math.floor(Math.random() * (specQuantity === null || specQuantity === void 0 ? void 0 : specQuantity.length))]
                    : null,
            };
            const medic = yield MedicalStaff_1.MedicalStaff.create(newMedic);
        }));
    }
});
exports.default = defaultMedicalStaff;
