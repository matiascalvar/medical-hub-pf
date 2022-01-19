import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();



router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        try {
            if (await bcrypt.compare(req.body.password, response.hashedPass)) {
                const user = { email: req.body.email }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                
                return res.send({ accessToken: accessToken })
            } else {
                return res.status(401).send({"Error": "Contrasenia incorrecta."})
            }
        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    } else {
        return res.status(401).send({"Error": "No existe el usuario."})
    }
});

export default router;
