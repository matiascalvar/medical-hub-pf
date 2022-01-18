import {Response, Request, Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('LOGIN')
});


export default router;
