import { Router } from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
import  { User } from '../models/User'
import { authenticateToken } from './middelwares'
const router = Router();


// VOLVER A PONER EL AUTHENTICATE -- ESTA RUTA SIRVE PARA CAMBIAR LOS DATOS PROPIOS


router.post('/:id', async (req: any, res) => {
    try {
        let medic: any = await MedicalStaff.findOne({ where: { id: req.params.id } })
        let body = req.body
        const [specialityDb, created] = await Specialitie.findOrCreate({
            where: { name: body.speciality }
        });
        body.SpecialitieId = specialityDb.id;
        delete body.speciality;
        const response = await medic.update(body)
        return res.status(201).send({ message: "Data updated successfully" });
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

export default router;