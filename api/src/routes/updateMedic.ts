import { Router } from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import  { User } from '../models/User'
import { authenticateToken } from './middelwares'
const router = Router();


// VOLVER A PONER EL AUTHENTICATE -- ESTA RUTA SIRVE PARA CAMBIAR LOS DATOS PROPIOS


router.post('/:id', async (req: any, res) => {
    try {
        let medic: any = await MedicalStaff.findOne({ where: {id: req.params.id}})
        const response = await medic.update(req.body)
        return res.status(201).send({message: 'Datos actualizados con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

export default router;
 