import { Response, Request, Router } from 'express';
import { Patient } from '../models/Patient';
import { Specialitie } from '../models/Specialitie';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const router = Router();

router.get('/', async (req,res) => {
    try {
        let response: any = await Patient.findAll({
            order: [
                ['id', 'ASC'],
            ]
        })
        response? res.status(200).send(response) : res.send(204).send({"Msg": "No hay pacientes registrados"})
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})

router.get('/:id', async (req,res) => {
    try {
        let response: any = await Patient.findOne({
            where: {id: req.params.id},
        })
        response? res.status(200).send(response) : res.send(204).send({"Msg": "No hay paciente con esa Id"})
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
        const hashedPassword = await bcrypt.hash(req.body.dni, 10)
        const newUser = {
            email: req.body.email,
            hashedPass: hashedPassword
        }
        const user = await User.create(newUser)
        const newPatient = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            dni: req.body.dni,
            UserId: user.id,
            // PlanId: req.body.planId
        }
        const patient = await Patient.create(newPatient)
        return res.status(201).send({message: 'Paciente creado con éxito'}) 
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

router.post('/:id', async (req: any, res) => {
    try {
        let patient: any = await Patient.findOne({ where: {id: req.params.id}})
        const response = await patient.update(req.body)
        return res.status(201).send({message: 'Datos actualizados con exito'})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

export default router;