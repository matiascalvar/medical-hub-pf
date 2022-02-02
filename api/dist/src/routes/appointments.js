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
const express_1 = require("express");
const Appointment_1 = require("../models/Appointment");
const AppointmentDetail_1 = require("../models/AppointmentDetail");
const MedicalStaff_1 = require("../models/MedicalStaff");
const Specialitie_1 = require("../models/Specialitie");
const addDays_1 = __importDefault(require("../assets/addDays"));
const Patient_1 = require("../models/Patient");
const Studie_1 = require("../models/Studie");
const StudyType_1 = require("../models/StudyType");
const { Op } = require("sequelize");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('APPOINTMENTS');
});
router.get('/medic/:idMedic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idMedic } = req.params;
        const appointments = yield Appointment_1.Appointment.findAll({
            include: [{
                    model: Patient_1.Patient,
                    attributes: { include: ['id', 'firstName', 'lastName', 'phone', 'dni', 'PlanId'], exclude: ['createdAt', 'updatedAt', 'UserId'] },
                },
                {
                    model: Studie_1.Studie,
                    attributes: { include: ['id', 'state', 'diagnosis', 'studyPDF'], exclude: ['createdAt', 'updatedAt', 'StudyTypeId', 'MedicalStaffId', 'AppointmentId', 'PatientId'] },
                    include: [
                        {
                            model: StudyType_1.StudyType,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ]
                },
                {
                    model: AppointmentDetail_1.AppointmentDetail,
                    attributes: { include: ['details'], exclude: ['id', 'createdAt', 'updatedAt', 'AppointmentId'] }
                }
            ],
            where: {
                MedicalStaffId: idMedic
            },
            attributes: { include: ['id', 'date', 'time', 'state'], exclude: ['PatientId', 'MedicalStaffId', 'createdAt', 'updatedAt'] },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ]
        });
        appointments.length > 0 ? res.send(appointments) : res.send({ message: "Dr. doesn't have appointments yet." });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ Error: e });
    }
}));
router.get('/:idPatient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idPatient } = req.params;
        const appointments = yield Appointment_1.Appointment.findAll({
            include: [{
                    model: MedicalStaff_1.MedicalStaff,
                    attributes: { include: ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'createdAt', 'updatedAt', 'UserId', 'SpecialitieId'] },
                    include: [{
                            model: Specialitie_1.Specialitie,
                            attributes: { include: ['name'], exclude: ['id', 'createdAt', 'updatedAt'] }
                        }]
                },
                {
                    model: AppointmentDetail_1.AppointmentDetail,
                    attributes: { include: ['details'], exclude: ['id', 'createdAt', 'updatedAt', 'AppointmentId'] }
                },
                {
                    model: Studie_1.Studie,
                    attributes: { include: ['id', 'state', 'diagnosis', 'studyPDF'], exclude: ['createdAt', 'updatedAt', 'StudyTypeId', 'MedicalStaffId', 'AppointmentId', 'PatientId'] },
                    include: [
                        {
                            model: StudyType_1.StudyType,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        }
                    ]
                }
            ],
            where: { PatientId: idPatient },
            attributes: { include: ['date', 'time', 'state'], exclude: ['PatientId', 'MedicalStaffId', 'createdAt', 'updatedAt'] },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ]
        });
        appointments.length > 0 ? res.send(appointments) : res.send({ message: "El paciente no tiene turnos agendados." });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ Error: e });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = {
            date: req.body.date,
            time: req.body.time,
            PatientId: req.body.patientId,
            MedicalStaffId: req.body.medicalStaffId
        };
        console.log(newAppointment);
        const appointment = yield Appointment_1.Appointment.create(newAppointment);
        return res.status(201).send(appointment);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let appointment = yield Appointment_1.Appointment.findOne({ where: { id: req.params.id } });
        const response = yield appointment.update(req.body);
        return res.status(201).send({ message: 'Pago acreditado con exito' });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield Appointment_1.Appointment.destroy({ where: { id: req.params.id } });
        if (!response)
            return res.sendStatus(403);
        return res.status(200).send({ message: 'Appointment eliminada con exito' });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}));
router.get('/avb/:idMedicalStaff', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idMedicalStaff } = req.params;
        const medic = yield MedicalStaff_1.MedicalStaff.findOne({
            where: {
                id: idMedicalStaff
            }
        });
        const date = new Date();
        const totalDays = 1;
        let result = [];
        for (let i = 0; i < totalDays; i++) {
            const today = (0, addDays_1.default)(date, i);
            const appointments = yield Appointment_1.Appointment.findAll({
                where: {
                    MedicalStaffId: idMedicalStaff,
                    date: today
                }
            });
            let availability = {
                fecha: today,
                avb: [
                    '09:00:00',
                    '09:30:00',
                    '10:00:00',
                    '10:30:00',
                    '11:00:00',
                    '11:30:00',
                    '12:00:00',
                    '12:30:00',
                    '13:00:00',
                    '13:30:00',
                    '14:00:00',
                    '14:30:00',
                    '15:00:00',
                    '15:30:00',
                    '16:00:00',
                    '16:30:00',
                    '17:00:00',
                    '17:30:00',
                ]
            };
            //devuelve un objeto con 2 propiedades fecha y avb que es un objeto SOLO CON LOS TURNOS DISPONIBLES
            appointments.map(a => {
                let objProp = a.time.toString();
                var index = availability.avb.indexOf(objProp);
                if (index !== -1) {
                    availability.avb.splice(index, 1);
                }
            });
            result.push(availability);
        }
        res.send({
            MedicalStaffId: idMedicalStaff,
            medic: (medic === null || medic === void 0 ? void 0 : medic.firstName) + " " + (medic === null || medic === void 0 ? void 0 : medic.lastName),
            data: result
        });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ Error: "No existe el Appointment." });
    }
}));
router.get('/avbspeciality/:idSpeciality', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idSpeciality } = req.params;
        const date = new Date();
        const totalDays = 1; //modificar segun la cantidad de dias a mostrar
        let result = [];
        let resultToShow = [];
        const medicsOfThisSpeciality = yield MedicalStaff_1.MedicalStaff.findAll({
            where: {
                SpecialitieId: idSpeciality
            },
            attributes: { include: ['id', 'firstName', 'lastName', 'idNumber'], exclude: ['availability', 'avbTo', 'avbFrom', 'appointmentDuration', 'SpecialitieId', 'UserId', 'createdAt', 'updatedAt'] }
        });
        medicsOfThisSpeciality.map(m => result.push(m)); //lleno la cosntante result con los medicos de la especialidad
        for (let i = 0; i < totalDays; i++) {
            const today = (0, addDays_1.default)(date, i); // today se va a ir modificando segun la cant de dias que contenga totalDays
            const allAppointments = yield Appointment_1.Appointment.findAll({
                where: {
                    date: today
                },
                include: [
                    {
                        model: MedicalStaff_1.MedicalStaff
                    }
                ]
            });
            let availability = {
                fecha: today,
                avb: {
                    '09:00:00': [...result],
                    '09:30:00': [...result],
                    '10:00:00': [...result],
                    '10:30:00': [...result],
                    '11:00:00': [...result],
                    '11:30:00': [...result],
                    '12:00:00': [...result],
                    '12:30:00': [...result],
                    '13:00:00': [...result],
                    '13:30:00': [...result],
                    '14:00:00': [...result],
                    '14:30:00': [...result],
                    '15:00:00': [...result],
                    '15:30:00': [...result],
                    '16:00:00': [...result],
                    '16:30:00': [...result],
                    '17:00:00': [...result],
                    '17:30:00': [...result]
                }
            };
            allAppointments.map((a, i) => {
                let objProp = a.time.toString();
                if (availability.avb[objProp]) { // si encontramos un turno para este horaio...
                    if ((a === null || a === void 0 ? void 0 : a.toJSON().MedicalStaff.SpecialitieId) == idSpeciality && (a === null || a === void 0 ? void 0 : a.toJSON().date) == today) { //...para esta especialidad y dia ...
                        result.map(m => {
                            if (m.id == (a === null || a === void 0 ? void 0 : a.toJSON().MedicalStaff.id)) { //quitamos del calendario al medico que NO esta disponible
                                var index = availability.avb[objProp].indexOf(m);
                                if (index !== -1) {
                                    availability.avb[objProp].splice(index, 1);
                                }
                            }
                        });
                    }
                }
            });
            resultToShow.push(availability); //en la constante resultToSHow vamos guardando el calendario dia por dia
        }
        res.send(resultToShow);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = router;
