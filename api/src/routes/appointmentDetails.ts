import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { AppointmentDetail } from '../models/AppointmentDetail';

const router = Router();

router.post('/:idAppointment', async (req, res) => { 

    const { idAppointment } = req.params;

    try {
        const newAppointmentDetail = {
            details: req.body.details,
            AppointmentId: idAppointment
        }

        const appointmentDetail = await AppointmentDetail.create(newAppointmentDetail)

        const appointment = await Appointment.findOne({where: {id: idAppointment}})

        const appointmentState = appointment?.update(
            {
                state: 'COMPLETED'
            })

        return res.status(201).send({message: "Appointment Detail created and Appointment state updated."}) 
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }

})

export default router;
