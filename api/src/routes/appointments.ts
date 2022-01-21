import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
const router = Router();


router.get('/', (req, res) => {
    res.send('APPOINTMENTS')
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id, {
            attributes: {include:  ['date', 'time', 'state'], exclude: ['PatientId', 'MedicalStaffId', 'createdAt','updatedAt']}
        });

       if(appointment){
        const dataStaffMedical = await MedicalStaff.findOne({
            where: {id: appointment.id},
            attributes:{include:  ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'SpecialitieId', 'UserId', 'createdAt','updatedAt']}
        })
        
        const result = {
            appointmentData: appointment,
            medicalStaffData: dataStaffMedical
        }       
 
         res.send(result)

       }        
        
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: "No existe el Appointment."})
    }
    
});

router.post('/', async (req, res) => {
   
    try {

        const newAppointment = {
            date: req.body.date,
            time: req.body.time,
            PatientId: req.body.patientId,
            MedicalStaffId: req.body.medicalStaffId
        }

        const appointment = await Appointment.create(newAppointment)

        return res.status(201).send(appointment) //{message: 'Médico creado con éxito'}
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

export default router;