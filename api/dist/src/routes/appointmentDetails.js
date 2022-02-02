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
const AppointmentDetail_1 = require("../models/AppointmentDetail");
const router = (0, express_1.Router)();
router.post('/:idAppointment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAppointment } = req.params;
    try {
        const newAppointmentDetail = {
            details: req.body.details,
            AppointmentId: idAppointment
        };
        const appointmentDetail = yield AppointmentDetail_1.AppointmentDetail.create(newAppointmentDetail);
        return res.status(201).send({ message: "Appointment Detail creado con éxito" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}));
exports.default = router;
