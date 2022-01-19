import {Response, Request, Router} from 'express';
import { authenticateToken } from './middelwares'
const router = Router();


router.get('/', authenticateToken , (req, res) => {
    res.send('USERS')
});

export default router;
