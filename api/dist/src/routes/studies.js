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
const Appointment_1 = require("../models/Appointment");
const MedicalStaff_1 = require("../models/MedicalStaff");
const Studie_1 = require("../models/Studie");
const StudyType_1 = require("../models/StudyType");
const upload = require('../../lib/storage');
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    //Nestor, tendrías que trabajar acá
    //traer todos los estudios de todos los pacientes para el usuario admin 
    res.send('STUDIES');
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudy = {
            diagnosis: req.body.diagnosis,
            studyPDF: req.body.studyPDF,
            StudyTypeId: req.body.studyTypeId,
            MedicalStaffId: req.body.medicalStaffId,
            AppointmentId: req.body.appointmentId,
            PatientId: req.body.patientId,
        };
        const study = yield Studie_1.Studie.create(newStudy);
        return res.status(201).send(study); //{message: 'Médico creado con éxito'}
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idPatient = req.params.id;
        const studies = yield Studie_1.Studie.findAll({
            include: [{
                    model: StudyType_1.StudyType,
                    attributes: { include: ['name', 'neededPreparation'], exclude: ['id', 'createdAt', 'updatedAt'] }
                },
                {
                    model: MedicalStaff_1.MedicalStaff,
                    attributes: { include: ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'createdAt', 'updatedAt', 'UserId', 'SpecialitieId'] }
                },
                {
                    model: Appointment_1.Appointment,
                    attributes: { include: ['id', 'date', 'time'], exclude: ['state', 'createdAt', 'updatedAt', 'PatientId', 'MedicalStaffId'] }
                }
            ],
            where: { PatientId: idPatient },
            attributes: { include: ['id', 'state', 'diagnosis', 'studyPDF'], exclude: ['createdAt', 'updatedAt', 'StudyTypeId', 'AppointmentId', 'PatientId', 'MedicalStaffId'] }
        });
        studies.length > 0 ? res.send(studies) : res.send({ message: 'El paciente no tiene estudios agendados.' });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ Error: "No existe el Estudio." });
    }
}));
router.put('/:id', upload.single('studyPDF'), (req, res) => {
    res.send({ message: 'Study file updated successfuly!' });
});
exports.default = router;
