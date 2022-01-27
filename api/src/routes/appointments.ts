import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
const router = Router();


router.get('/', (req, res) => {
    res.send('APPOINTMENTS')
});

router.get('/:id', async (req, res) => {
    try {
        const idPatient = req.params.id;
        const appointments = await Appointment.findAll({
            include: [{
                model: MedicalStaff,
                attributes: {include:  ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'createdAt','updatedAt', 'UserId', 'SpecialitieId']},
                include:[{
                    model: Specialitie,
                    attributes: {include:['name'], exclude:['id', 'createdAt','updatedAt']}
                }]
              }],
            where: {PatientId: idPatient},
            attributes: {include:  ['date', 'time', 'state'], exclude: ['PatientId', 'MedicalStaffId', 'createdAt','updatedAt']},
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ]
        });         

        appointments.length > 0 ? res.send(appointments) : res.send({message: "El paciente no tiene turnos agendados."})
        
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

        return res.status(201).send(appointment) 
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

function addDays(date: any, days: number) {
    const dates = new Date(date);
    dates.setDate(dates.getDate() + days);
    const array = dates.toLocaleDateString().toString().split('/');
    let day: string ='';
    array[1].length < 2 ? day = '0' + array[1] : day = array[1]
    const formatedDate = array[2] + '-' + (array[0].length<2 && '0'+array[0]) + '-' + day;
    return formatedDate.toString();
}

router.get('/avb/:idMedicalStaff', async (req, res) => {        
    try {
        const { idMedicalStaff } = req.params;

        const date = new Date();
        const totalDays: number = 1;

        let result: any[] = [];

        for(let i=0; i< totalDays; i++){
            const today = addDays(date,i);
            const appointments = await Appointment.findAll({
                where: {
                    MedicalStaffId: idMedicalStaff,
                    date: today
                }
            })

            let availability: any = {
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
            }
            //devuelve un objeto con 2 propiedades fecha y avb que es un objeto SOLO CON LOS TURNOS DISPONIBLES
            appointments.map(a => {
                let objProp: string = a.time.toString();
                    var index = availability.avb.indexOf(objProp);
                        if (index !== -1) {
                        availability.avb.splice(index, 1);
                        }     
            })

            result.push(availability)
        }

        res.send(result)
           
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: "No existe el Appointment."})
    }
    
});

export default router;