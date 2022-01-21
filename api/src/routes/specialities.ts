import {Response, Request, Router} from 'express';
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

export default router;