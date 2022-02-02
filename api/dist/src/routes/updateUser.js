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
const router = (0, express_1.Router)();
router.post('/', middelwares_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.email.email;
    try {
        let user = yield User_1.User.findOne({ where: { email: email } });
        let patient = yield Patient_1.Patient.findOne({ where: { UserId: user.id } });
        const response = yield patient.update(req.body);
        return res.status(201).send({ message: 'Datos actualizados con exito' });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}));
exports.default = router;
