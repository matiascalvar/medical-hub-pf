import { Response, Request, Router } from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const router = Router();

//Ruta que crea en primer lugar un User para un medico y luego completa la tabla medicalStaff para ese profesional
router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        return res.status(403).send({"Error:": "El email ya esta registrado"})
    }  
    try {
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
        const newUser = {
            email: req.body.email,
            hashedPass: hashedPassword,
            isStaff:true
        }

        const user = await User.create(newUser)

        const newMedicalStaff = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            idNumber: req.body.idNumber,
            availability: req.body.availability,
            avbFrom: req.body.avbFrom,
            avbTo: req.body.avbTo,
            appointmentDuration: req.body.appointmentDuration,
            SpecialitieId: req.body.specialitieId,
            UserId: user.id
        }

        const medicalStaff = await MedicalStaff.create(newMedicalStaff)

        return res.status(201).send(medicalStaff) //{message: 'Médico creado con éxito'}
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});


export default router;