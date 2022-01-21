import {Response, Request, Router} from 'express';
const router = Router();

// Creamos las rutas. Si qeremos separar las rutas en archivos
// creamos los mismos, los importamos en este index (import otherRoutes from './other';)
// y luego desde app se importa todo junto mediante este entry point
import login from './login'
import users from './users'
import register from  './register'
import studie from  './studie' 
import studyType from  './studyType'

router.use('/login', login)
router.use('/users', users)
router.use('/register', register)
router.use('/studie', studie) 
router.use('/studyType', studyType) 

router.get('/', (req: Request, res: Response) => {
	res.send('soy la ruta home get! Probá /test');
});


router.get('/test', (req: Request, res: Response) => {
	res.send('soy la ruta test get!');
});

router.post('/', (req: Request, res: Response) => {
	res.send('soy la ruta test post!');
});

export default router;
