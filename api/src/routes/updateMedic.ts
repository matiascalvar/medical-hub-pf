import { Router } from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import  { User } from '../models/User'
import { authenticateToken } from './middelwares'
const router = Router();

router.post('/', authenticateToken, async (req: any, res) => {
    let email = req.email.email
    try {
        let user: any = await User.findOne({ where: { email: email}});
        let medic: any = await MedicalStaff.findOne({ where: {UserId: user.id}})
        const response = await medic.update(req.body)
        return res.status(201).send({message: 'Datos actualizados con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

export default router;
 