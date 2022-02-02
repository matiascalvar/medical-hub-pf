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
const Patient_1 = require("../models/Patient");
const User_1 = require("../models/User");
const middelwares_1 = require("./middelwares");
const bcrypt = require('bcrypt');
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield User_1.User.findOne({ where: { email: req.body.email } });
    if (response) {
        return res.status(403).send({ "Error:": "El email ya esta registrado" });
    }
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        const newUser = {
            email: req.body.email,
            hashedPass: hashedPassword
        };
        const user = yield User_1.User.create(newUser);
        const newPatient = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            dni: req.body.dni,
            UserId: user.id,
            PlanId: req.body.planId
        };
        const patient = yield Patient_1.Patient.create(newPatient);
        return res.status(201).send({ message: 'Usuario creado con éxito' });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}));
router.post('/password', middelwares_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.email.email;
    const hashedPassword = yield bcrypt.hash(req.body.password, 10);
    try {
        let user = yield User_1.User.findOne({ where: { email: email } });
        const response = yield user.update({ hashedPass: hashedPassword });
        return res.status(201).send({ message: 'Pass modificada con éxito' });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}));
exports.default = router;
