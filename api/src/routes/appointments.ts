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

router.get('/avb/:idMedicalStaff', async (req, res) => {
    function addDays(date: any, days: number) {
        const dates = new Date(date);
        dates.setDate(dates.getDate() + days);
        const array = dates.toLocaleDateString().toString().split('/');
        let day: string ='';
        array[1].length < 2 ? day = '0' + array[1] : day = array[1]
        const formatedDate = array[2] + '-' + (array[0].length<2 && '0'+array[0]) + '-' + day;
        return formatedDate.toString();
    }     

    try {
        const { idMedicalStaff } = req.params;
        //const date = req.body.date;

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
                avb: {
                    '09:00:00': 'avb',
                    '09:30:00': 'avb',
                    '10:00:00': 'avb',
                    '10:30:00': 'avb',
                    '11:00:00': 'avb',
                    '11:30:00': 'avb',
                    '12:00:00': 'avb',
                    '12:30:00': 'avb',
                    '13:00:00': 'avb',
                    '13:30:00': 'avb',
                    '14:00:00': 'avb',
                    '14:30:00': 'avb',
                    '15:00:00': 'avb',
                    '15:30:00': 'avb',
                    '16:00:00': 'avb',
                    '16:30:00': 'avb',
                    '17:00:00': 'avb',
                    '17:30:00': 'avb'
                }               
            }
            //devuelve un objeto con 2 propiedades fecha y avb que es un objeto SOLO CON LOS TURNOS DISPONIBLES
            appointments.map(a => {
                let objProp: string = a.time.toString();
                availability.avb[objProp] ? delete availability.avb[objProp] : null      
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