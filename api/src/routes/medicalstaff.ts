import { Response, Request, Router } from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import { Specialitie } from '../models/Specialitie';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const router = Router();

router.get('/', async (req,res) => {
    try {
        let response: any = await MedicalStaff.findAll({
            include: [{
                model: Specialitie,
                    attributes: {include: ["name", "id"], exclude: [ "createdAt", "updatedAt"]}
            }],
            order: [
                ['id', 'ASC'],
            ]
        })
        response? res.status(200).send(response) : res.send(204).send({"Msg": "No hay medicos registrados"})
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})

router.get('/:id', async (req,res) => {
    try {
        let response: any = await MedicalStaff.findOne({
            where: {id: req.params.id},
            include: [{
                model: Specialitie,
                    attributes: {include: ["name", "id"], exclude: ["createdAt", "updatedAt"]}
            }]
        })
        response? res.status(200).send(response) : res.send(204).send({"Msg": "No hay medicos con esa Id"})
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})


router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        return res.status(403).send({"Error:": "El email ya esta registrado"})
    }  
    try {
        const hashedPassword = await bcrypt.hash(req.body.idNumber, 10)
    
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
            //avbFrom: req.body.avbFrom,
            //avbTo: req.body.avbTo,
            //appointmentDuration: req.body.appointmentDuration,
            SpecialitieId: req.body.specialitieId,
            UserId: user.id
        }

        const medicalStaff = await MedicalStaff.create(newMedicalStaff)

        return res.status(201).send(medicalStaff)
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

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