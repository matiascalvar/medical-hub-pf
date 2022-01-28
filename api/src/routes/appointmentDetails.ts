import {Response, Request, Router, response} from 'express';
import { AppointmentDetail } from '../models/AppointmentDetail';

const router = Router();


router.get('/', (req, res) => {
    res.send('APPOINTMENTS DETAILS')
});

router.post('/:idAppointment', async (req, res) => { 

    const { idAppointment } = req.params;

    try {
        const newAppointmentDetail = {
            details: req.body.details,
            AppointmentId: idAppointment
        }

        const appointmentDetail = await AppointmentDetail.create(newAppointmentDetail)

        return res.status(201).send(appointmentDetail) 
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }

})

export default router;