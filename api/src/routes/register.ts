import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const router = Router();

router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        return res.status(403).send({"Error:": "El email ya esta registrado"})
    }  
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
        const user = {
            email: req.body.email,
            hashedPass: hashedPassword,
            active: true,
            isStaff: false,
        }
        const response = await User.create(user)
        return res.status(201).send(response)
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
});


export default router;
