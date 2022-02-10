import { Response, Request, Router } from 'express';
import { Patient } from '../models/Patient';
import { Plan } from '../models/Plan';
import  { User } from '../models/User'
import { authenticateToken } from './middelwares'
const bcrypt = require('bcrypt')
const router = Router();

router.post('/', authenticateToken, async (req: any, res) => {
    let email = req.email.email
    try {
        let user: any = await User.findOne({ where: { email: email}});
        let patient: any = await Patient.findOne({ where: {UserId: user.id}})
        const response = await patient.update(req.body)
        return res.status(201).send({message: 'Datos actualizados con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

router.post('/permissions/:id', async (req: any, res) => {
    try {
        let patient: any = await Patient.findOne({ where: {id: req.params.id}})
        let user: any = await User.findOne({ where: { id: patient.UserId}});
        const response = await user.update(req.body)
        return res.status(201).send({message: 'Datos actualizados con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

router.post('/resetpassword/:id', async (req: any, res) => {
    try {
        let patient: any = await Patient.findOne({ where: {id: req.params.id}})
        let user: any = await User.findOne({ where: { id: patient.UserId}});
        const hashedPassword = await bcrypt.hash(patient.dni, 10)
        const response = await user.update({
            resetPass: req.body.resetPass,
            hashedPass: hashedPassword,
        })
        return res.status(201).send({message: 'Reset password con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

export default router;
