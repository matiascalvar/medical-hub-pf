import { Response, Request, Router } from 'express';
import { Patient } from '../models/Patient';
import { Plan } from '../models/Plan';
import  { User } from '../models/User'
import { authenticateToken } from './middelwares'
const bcrypt = require('bcrypt')
const router = Router();

router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        return res.status(403).send({"error": "This email is already registered"})
    }  
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
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
            PlanId: req.body.planId
        }
        const patient = await Patient.create(newPatient)
        return res.status(201).send({ message: "User created successfully" }); 
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});

router.post('/password', authenticateToken, async (req: any, res) => {
    let email = req.email.email
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try {
        let user: any = await User.findOne({ where: { email: email}});
        const response = await user.update({hashedPass: hashedPassword, resetPass: false})
        return res
          .status(201)
          .send({ message: "Password modified successfully" }); 
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }

})

export default router;
