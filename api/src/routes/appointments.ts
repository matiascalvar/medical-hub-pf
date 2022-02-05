import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { AppointmentDetail } from '../models/AppointmentDetail';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
import addDays from '../assets/addDays'
import { Patient } from '../models/Patient';
import { Studie } from '../models/Studie';
import { StudyType } from '../models/StudyType';
const { Op } = require("sequelize");
const router = Router();


router.get('/', (req, res) => {
    console.log(req.query)
    res.send('APPOINTMENTS')
});

router.get('/details/:idAppointment', async (req, res) => { 
    try {
        const { idAppointment } = req.params;

        const appointment = await Appointment.findOne(
            {
                include: [{
                    model: MedicalStaff,
                    attributes: {include:  ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'createdAt','updatedAt', 'UserId', 'SpecialitieId']},
                    include:[{
                        model: Specialitie,
                        attributes: {include:['name'], exclude:['id', 'createdAt','updatedAt']}
                    }]
                  },
                {
                    model: AppointmentDetail,
                    attributes: {include:  ['details'], exclude: ['id', 'createdAt','updatedAt', 'AppointmentId']}
                },
                {
                    model: Studie,
                      attributes: {include:['id','state','diagnosis','studyPDF'], exclude:['createdAt','updatedAt','StudyTypeId','MedicalStaffId','AppointmentId','PatientId']},
                      include:[
                        {
                            model: StudyType,
                            attributes:{exclude:['createdAt','updatedAt']}
                        }
                    ]
                }
            ],
                where:{id: idAppointment},
                attributes: {include:  ['date', 'time', 'state'], exclude: ['PatientId', 'MedicalStaffId', 'createdAt','updatedAt']}
            })

        if(!appointment) res.send({message: "There is not an appointment with that ID."})
        res.send(appointment)        
    } catch (error) {
        res.send({Error: error})        
    }

})

router.get('/medic/:idMedic', async (req, res) => {
    try {
        const { idMedic } = req.params;
        const appointments = await Appointment.findAll({
            include: [{
                model: Patient,
                  attributes: {include:  ['id', 'firstName', 'lastName','phone','dni','PlanId'], exclude: ['createdAt','updatedAt', 'UserId']},
              },
              {
                model: Studie,
                  attributes: {include:['id','state','diagnosis','studyPDF'], exclude:['createdAt','updatedAt','StudyTypeId','MedicalStaffId','AppointmentId','PatientId']},
                  include:[
                    {
                        model: StudyType,
                        attributes:{exclude:['createdAt','updatedAt']}
                    }
                ]
            },
            {
                model: AppointmentDetail,
                attributes: {include:  ['details'], exclude: ['id', 'createdAt','updatedAt', 'AppointmentId']}
            }
        ],
            where: {
                MedicalStaffId: idMedic
            },
            attributes: {include:  ['id','date', 'time', 'state'], exclude: ['PatientId', 'MedicalStaffId', 'createdAt','updatedAt']},
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ]
        });         

        appointments.length > 0 ? res.send(appointments) : res.send({message: "Dr. doesn't have appointments yet."})
        
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: e})
    }
    
});

router.get('/:idPatient', async (req, res) => {
    try {
        const { idPatient } = req.params;
        const appointments = await Appointment.findAll({
            include: [{
                model: MedicalStaff,
                attributes: {include:  ['id', 'firstName', 'lastName'], exclude: ['idNumber', 'availability', 'avbFrom', 'avbTo', 'appointmentDuration', 'createdAt','updatedAt', 'UserId', 'SpecialitieId']},
                include:[{
                    model: Specialitie,
                    attributes: {include:['name'], exclude:['id', 'createdAt','updatedAt']}
                }]
              },
            {
                model: AppointmentDetail,
                attributes: {include:  ['details'], exclude: ['id', 'createdAt','updatedAt', 'AppointmentId']}
            },
            {
                model: Studie,
                  attributes: {include:['id','state','diagnosis','studyPDF'], exclude:['createdAt','updatedAt','StudyTypeId','MedicalStaffId','AppointmentId','PatientId']},
                  include:[
                    {
                        model: StudyType,
                        attributes:{exclude:['createdAt','updatedAt']}
                    }
                ]
            }
        ],
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
        return res.status(401).send({Error: e})
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
        //console.log(newAppointment)
        const appointment = await Appointment.create(newAppointment)

        return res.status(201).send(appointment) 
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

router.put('/:id', async (req, res) => {
    try {
        let appointment: any = await Appointment.findOne({ where: { id: req.params.id}});
        const response = await appointment.update(req.body)
        return res.status(201).send({message: 'Pago acreditado con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let response = await Appointment.destroy({ where: {id: req.params.id}})
        if (!response) return res.sendStatus(403)
        return res.status(200).send({message: 'Appointment eliminada con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})


router.get('/avbspeciality/:idSpeciality', async (req: Request, res: Response) => {
    try {
        const { idSpeciality } = req.params;

        const date = new Date();
        const totalDays: number = 15; //modificar segun la cantidad de dias a mostrar

        let result: any[] = [];
        let resultToShow: any[] = [];
        let now = new Date();
        let hour: string ='';
        let minutes: string='';
        (now.getHours().toString().length < 2) ? hour= '0' + now.getHours().toString() : hour= now.getHours().toString();
        (now.getMinutes().toString().length < 2) ? minutes= '0' + now.getMinutes().toString() : minutes= now.getMinutes().toString();
        
        let actualTime = "'" + (hour + ':' + minutes + ':00' + "'")
        //console.log(actualTime)

        const medicsOfThisSpeciality = await MedicalStaff.findAll({ //consulto los medicos de la esoecialidad
            where:{
                SpecialitieId: idSpeciality                
            },
            attributes: {include:  ['id', 'firstName', 'lastName','idNumber', 'avbTo', 'avbFrom'], exclude: ['availability', 'appointmentDuration', 'SpecialitieId', 'UserId', 'createdAt','updatedAt']}
        })

       medicsOfThisSpeciality.map(m => result.push(m)) //lleno la cosntante result con los medicos de la especialidad

       //console.log(result)

        for(let i=0; i< totalDays; i++){            

            const today = addDays(date,i); // today se va a ir modificando segun la cant de dias que contenga totalDays
            const day = new Date(today)
            const dayOfWeek = day.getDay();
            //console.log(dayOfWeek)
            const allAppointments = await Appointment.findAll({//consultamo todos los appointments     
                where:{
                    date: today
                },           
                include: [
                        {
                            model: MedicalStaff
                        }
                    ]
            }); 

            let avbDays: any;

            if(dayOfWeek < 5){ // si today es lunes a viernes
                avbDays = {
                    '09:00:00': [...result.filter(m => (m.avbFrom <= '09:00:00' && m.avbTo > '09:00:00'))],
                    '09:30:00': [...result.filter(m => (m.avbFrom <= '09:30:00' && m.avbTo > '09:30:00'))],
                    '10:00:00': [...result.filter(m => (m.avbFrom <= '10:00:00' && m.avbTo > '10:00:00'))],
                    '10:30:00': [...result.filter(m => (m.avbFrom <= '10:30:00' && m.avbTo > '10:30:00'))],
                    '11:00:00': [...result.filter(m => (m.avbFrom <= '11:00:00' && m.avbTo > '11:00:00'))],
                    '11:30:00': [...result.filter(m => (m.avbFrom <= '11:30:00' && m.avbTo > '11:30:00'))],
                    '12:00:00': [...result.filter(m => (m.avbFrom <= '12:00:00' && m.avbTo > '12:00:00'))],
                    '12:30:00': [...result.filter(m => (m.avbFrom <= '12:30:00' && m.avbTo > '12:30:00'))],
                    '13:00:00': [...result.filter(m => (m.avbFrom <= '13:00:00' && m.avbTo > '13:00:00'))],
                    '13:30:00': [...result.filter(m => (m.avbFrom <= '13:30:00' && m.avbTo > '13:30:00'))],
                    '14:00:00': [...result.filter(m => (m.avbFrom <= '14:00:00' && m.avbTo > '14:00:00'))],
                    '14:30:00': [...result.filter(m => (m.avbFrom <= '14:30:00' && m.avbTo > '14:30:00'))],
                    '15:00:00': [...result.filter(m => (m.avbFrom <= '15:00:00' && m.avbTo > '15:00:00'))],
                    '15:30:00': [...result.filter(m => (m.avbFrom <= '15:30:00' && m.avbTo > '15:30:00'))],
                    '16:00:00': [...result.filter(m => (m.avbFrom <= '16:00:00' && m.avbTo > '16:00:00'))],
                    '16:30:00': [...result.filter(m => (m.avbFrom <= '16:30:00' && m.avbTo > '16:30:00'))],
                    '17:00:00': [...result.filter(m => (m.avbFrom <= '17:00:00' && m.avbTo > '17:00:00'))],
                    '17:30:00': [...result.filter(m => (m.avbFrom <= '17:30:00' && m.avbTo > '17:30:00'))]
                }
            }else{ // sabados y domingos no hay disponibilidad
                avbDays = {
                    '09:00:00': [],
                    '09:30:00': [],
                    '10:00:00': [],
                    '10:30:00': [],
                    '11:00:00': [],
                    '11:30:00': [],
                    '12:00:00': [],
                    '12:30:00': [],
                    '13:00:00': [],
                    '13:30:00': [],
                    '14:00:00': [],
                    '14:30:00': [],
                    '15:00:00': [],
                    '15:30:00': [],
                    '16:00:00': [],
                    '16:30:00': [],
                    '17:00:00': [],
                    '17:30:00': []
                }
            }

            let availability: any = { //armamos el calendario inicializando cada horario con los medicos de la especialidad
                fecha: today,
                avb: avbDays               
            }
    
            allAppointments.map((a,i) => {//mapeamos los appointmnets
                let objProp: string = a.time.toString();
                    if(availability.avb[objProp]){ // si encontramos un turno para este horaio...
                        if(a?.toJSON().MedicalStaff.SpecialitieId == idSpeciality && a?.toJSON().date == today){//...para esta especialidad y dia ...
                            //let filtrados = result.filter(m => m.avbTo > '16:00:00')
                            result.map(m => {//..mapeamos los medicos
                                    //if(m.avbTo == '16:00:00') return
                                    if(m.id == a?.toJSON().MedicalStaff.id) {//quitamos del calendario al medico que NO esta disponible //(m.id == a?.toJSON().MedicalStaff.id) || 
                                        //availability.avb[objProp] = 'Ojo aca'
                                        var index = availability.avb[objProp].indexOf(m);
                                            if (index !== -1) {
                                            availability.avb[objProp].splice(index, 1);
                                            } 
                                    }       
                                })
                        }                        
                    }              
            })
            resultToShow.push(availability)//en la constante resultToSHow vamos guardando el calendario dia por dia
        }    
        
        res.send(resultToShow)

    } catch (error) {
        res.send(error)
    }

})

export default router;
