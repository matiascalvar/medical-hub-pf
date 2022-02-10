import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import addDays from '../assets/addDays'
const { Op } = require("sequelize");
const router = Router();

router.get('/', async (req, res) => {   
    try {
        const { weekDays } = req.query;
        const idMedicalStaff = req.query.idMedicalStaff as string;

        const medic = await MedicalStaff.findOne({
            where: {
                id: idMedicalStaff
            }
        })

        medic?.avbFrom

        const date = new Date();
        const totalDays: any = weekDays;

        let result: any[] = [];

        for(let i=0; i< totalDays; i++){
            const today = addDays(date,i);
            const day = new Date(today)
            const dayOfWeek = day.getDay();

            let avbHours = [
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
                '17:30:00'              
            ]  
    
            let h: any[] = [];
            let newDate = new Date();
            let now = newDate.getHours() + ':' + newDate.getMinutes() + ':00'
            
            if(today === addDays(date,0) && (dayOfWeek > 0 && dayOfWeek < 6)){
                avbHours.map(hs => {
                    if(JSON.stringify(hs) > JSON.stringify(now) === true && (JSON.stringify(hs) >= JSON.stringify(medic?.avbFrom) === true && JSON.stringify(hs) < JSON.stringify(medic?.avbTo) === true)){
                        h.push(hs)
                    }
                })                
            }else if(today !== addDays(date,0) && dayOfWeek < 5){
                avbHours.map(hs => {
                    if(JSON.stringify(hs) >= JSON.stringify(medic?.avbFrom) === true && JSON.stringify(hs) < JSON.stringify(medic?.avbTo) === true){
                        h.push(hs)
                    }
                })
            }else if(dayOfWeek === 0 || dayOfWeek === 6){
                
            }            

            const appointments = await Appointment.findAll({
                where: {
                    MedicalStaffId: idMedicalStaff,
                    date: today
                }
            })

            let avb = [...h]

            let availability: any = {
                fecha: today,
                avb: avb        
            }
            //devuelve un objeto con 2 propiedades fecha y avb que es un objeto SOLO CON LOS TURNOS DISPONIBLES
            appointments.map(a => {
                let objProp: string = a.time.toString();
                    var index = availability.avb.indexOf(objProp);
                        if (index !== -1) {
                        availability.avb.splice(index, 1);
                        }     
            })
            
            avb.length && result.push(availability)
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