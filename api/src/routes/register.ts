import {Response, Request, Router} from 'express';
const { Users } = require('../db.ts')
const bcrypt = require('bcrypt')
const router = Router();

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
        const user = {
            email: req.body.email,
            hashedPass: hashedPassword
        }
        
        // const response = await User.create(user)
        res.status(201).send(response)
    } catch(e) {
        res.status(500).send({error: e})
    }
});


export default router;
