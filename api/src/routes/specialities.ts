import {Response, Request, Router} from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
import { authenticateToken } from './middelwares'
const router = Router();


router.get('/', authenticateToken , async (req, res) => {
    
    try {
        let specialities = await Specialitie.findAll()
        res.status(200).send(specialities)
    }
    catch (error) {
        console.log(error)
        res.status(404)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idSpeciality = req.params.id;

        const medicalStaff = await MedicalStaff.findAll({
            where: {SpecialitieId: idSpeciality},
            attributes: {include:  ['id', 'firstName', 'lastName','idNumber'], exclude: ['availability', 'avbTo', 'avbFrom', 'appointmentDuration', 'SpecialitieId', 'UserId', 'createdAt','updatedAt']},
            order: [
                ['lastName', 'ASC']
            ]
        });         

        medicalStaff.length > 0 ? res.send(medicalStaff) : res.send({message: "No hay médicos con esa Especialidad."})
        
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: e})
    }
    
});

export default router;