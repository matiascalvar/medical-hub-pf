import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import addDays from '../assets/addDays'
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res) => {        
    console.log(req.query)
    try {
        const { idMedicalStaff, weekDays } = req.query;

        const medic = await MedicalStaff.findOne({
            where: {
                id: idMedicalStaff
            }
        })

        const date = new Date();
        const totalDays: any = weekDays;

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

export default router;