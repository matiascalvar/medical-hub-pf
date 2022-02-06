import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import { Studie } from '../models/Studie';
import { StudyType } from '../models/StudyType';
const upload = require('../../lib/storage')
const router = Router();


router.get('/', (req, res) => {
    //Nestor, tendrías que trabajar acá
    //traer todos los estudios de todos los pacientes para el usuario admin 
    res.send('STUDIES')
});

router.post('/', async (req, res) => {
   
    try {
        const newStudy = {
            diagnosis: req.body.diagnosis,
            studyPDF: req.body.studyPDF,
            StudyTypeId: req.body.studyTypeId,
            MedicalStaffId: req.body.MedicalStaffId,
            AppointmentId: req.body.appointmentId,
            PatientId: req.body.PatientId,
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
        const studies = await Studie.findAll({
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
        
        studies.length > 0 ? res.send(studies) : res.send({message: 'El paciente no tiene estudios agendados.'})
        
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: "No existe el Estudio."})
    }
    
});

router.post('/:id', upload.single('studyPDF'), (req,res) => {
    res.send({message: 'Study file updated successfuly!'})
})

export default router;