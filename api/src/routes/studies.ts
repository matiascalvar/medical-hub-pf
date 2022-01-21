import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
import { Studie } from '../models/Studie';
import { StudyType } from '../models/StudyType';
const router = Router();


router.get('/', (req, res) => {
    res.send('STUDIES')
});

router.post('/', async (req, res) => {
   
    try {
        const newStudy = {
            diagnosis: req.body.diagnosis,
            studyPDF: req.body.studyPDF,
            StudyTypeId: req.body.studyTypeId,
            MedicalStaffId: req.body.medicalStaffId,
            AppointmentId: req.body.appointmentId,
            PatientId: req.body.patientId,
        }

        const study = await Studie.create(newStudy)

        return res.status(201).send(study) //{message: 'Médico creado con éxito'}
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idPatient = req.params.id;
        const appointments = await Studie.findAll({
            include: [{
                model: StudyType,
                attributes: {include:['name','neededPreparation'], exclude:['id', 'createdAt','updatedAt']}
            },
            {
                model: MedicalStaff,
                attributes: {include:  ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'createdAt','updatedAt', 'UserId', 'SpecialitieId']}
            },
            {
                model: Appointment,
                attributes: {include:  ['id','date', 'time'], exclude: [ 'state', 'createdAt','updatedAt', 'PatientId', 'MedicalStaffId']}
            }
              
            ],
            where: {PatientId: idPatient},
            attributes: {include:  ['id', 'state', 'diagnosis', 'studyPDF'], exclude: ['createdAt','updatedAt', 'StudyTypeId', 'AppointmentId', 'PatientId', 'MedicalStaffId']}
        });         
 
        res.send(appointments)
        
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: "No existe el Appointment."})
    }
    
});

export default router;