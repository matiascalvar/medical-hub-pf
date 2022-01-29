import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { AppointmentDetail } from '../models/AppointmentDetail';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
const router = Router();


router.get('/', (req, res) => {
    res.send('APPOINTMENTS')
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
        console.log(newAppointment)
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
    let month: string ='';
    array[1].length < 2 ? day = '0' + array[1] : day = array[1];
    array[0].length < 2 ? month = '0' + array[0] : month = array[0];

    const formatedDate = array[2] + '-' + month + '-' + day;
    return formatedDate.toString();
}

router.get('/avb/:idMedicalStaff', async (req, res) => {        
    try {
        const { idMedicalStaff } = req.params;

        const medic = await MedicalStaff.findOne({
            where: {
                id: idMedicalStaff
            }
        })

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

        res.send({
            MedicalStaffId: idMedicalStaff, 
            medic: medic?.firstName + " " + medic?.lastName,
            data: result
        })
           
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: "No existe el Appointment."})
    }
    
});


router.get('/avbspeciality/:idSpeciality', async (req: Request, res: Response) => {
    try {
        const { idSpeciality } = req.params;

        const date = new Date();
        const totalDays: number = 1; //modificar segun la cantidad de dias a mostrar

        let result: any[] = [];
        let resultToShow: any[] = [];

        const medicsOfThisSpeciality = await MedicalStaff.findAll({ //consulto los medicos de la esoecialidad
            where:{
                SpecialitieId: idSpeciality
            },
            attributes: {include:  ['id', 'firstName', 'lastName','idNumber'], exclude: ['availability', 'avbTo', 'avbFrom', 'appointmentDuration', 'SpecialitieId', 'UserId', 'createdAt','updatedAt']}
        })

       medicsOfThisSpeciality.map(m => result.push(m)) //lleno la cosntante result con los medicos de la especialidad

        for(let i=0; i< totalDays; i++){            

            const today = addDays(date,i); // today se va a ir modificando segun la cant de dias que contenga totalDays

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

            let availability: any = { //armamos el calendario inicializando cada horario con los medicos de la especialidad
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
            }
    
            allAppointments.map((a,i) => {//mapeamos los appointmnets
                let objProp: string = a.time.toString();
                    if(availability.avb[objProp]){ // si encontramos un turno para este horaio...
                        if(a?.toJSON().MedicalStaff.SpecialitieId == idSpeciality && a?.toJSON().date == today){//...para esta especialidad y dia ...
                                result.map(m => {//..mapeamos los medicos
                                    if(m.id == a?.toJSON().MedicalStaff.id) {//quitamos del calendario al medico que NO esta disponible
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
