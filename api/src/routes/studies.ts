import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import { Studie } from '../models/Studie';
import { StudyType } from '../models/StudyType';
import { generateUploadUrl } from '../../lib/s3'
const upload = require('../../lib/storage')
const uploadS3 = require('../../lib/storageS3')
const router = Router();


router.get('/', (req, res) => {
    //Nestor, tendrías que trabajar acá
    //traer todos los estudios de todos los pacientes para el usuario admin 
    res.send('STUDIES')
});

router.get('/types', async (req, res) => {
    
    try {

        const studyTypes = await StudyType.findAll()
    
        res.send(studyTypes)
        
    } catch (error) {
        res.send(error)
        
    }
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

router.get('/s3/Url', async (req, res) => {
    const url = await generateUploadUrl()
    res.send(url)
})

router.post('/:id', uploadS3.single('studyPDF'), async function(req:any, res:any, next:any) {
    //console.log(req.file)
    try {
        const { id } = req.params;
        const { location } = req.file
        //console.log (res)
    
        const study = await Studie.update(
            {
                  studyPDF: location,
                  state: 'COMPLETED'
              },
              {where:{
                  id: id
              }        
        })
        //console.log(location)
        study && res.send('Successfully uploaded file!')
    } catch (error) {
        res.send(error)
    }
  })
   
  

export default router;