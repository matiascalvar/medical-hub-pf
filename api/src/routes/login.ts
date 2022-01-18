import {Response, Request, Router} from 'express';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const router = Router();

router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        try {
            if (await bcrypt.compare(req.body.password, response.hashedPass)) {
                return res.send(response)
            } else {
                return res.status(401).send({"Error": "Contrasenia incorrecta."})
            }
        } catch {
            return res.sendStatus(500)
        }
    } else {
        return res.status(401).send({"Error": "No existe el usuario."})
    }
});


export default router;
