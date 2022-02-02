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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedicalStaff_1 = require("../models/MedicalStaff");
const User_1 = require("../models/User");
const bcrypt = require('bcrypt');
const router = (0, express_1.Router)();
//Ruta que crea en primer lugar un User para un medico y luego completa la tabla medicalStaff para ese profesional
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield User_1.User.findOne({ where: { email: req.body.email } });
    if (response) {
        return res.status(403).send({ "Error:": "El email ya esta registrado" });
    }
    try {
        console.log(req.body);
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        const newUser = {
            email: req.body.email,
            hashedPass: hashedPassword,
            isStaff: true
        };
        const user = yield User_1.User.create(newUser);
        const newMedicalStaff = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            idNumber: req.body.idNumber,
            availability: req.body.availability,
            avbFrom: req.body.avbFrom,
            avbTo: req.body.avbTo,
            appointmentDuration: req.body.appointmentDuration,
            SpecialitieId: req.body.specialitieId,
            UserId: user.id
        };
        const medicalStaff = yield MedicalStaff_1.MedicalStaff.create(newMedicalStaff);
        return res.status(201).send(medicalStaff); //{message: 'Médico creado con éxito'}
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}));
exports.default = router;
