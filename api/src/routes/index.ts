import {Response, Request, Router} from 'express';
const router = Router();

// Creamos las rutas. Si queremos separar las rutas en archivos
// creamos los mismos, los importamos en este index (import otherRoutes from './other';)
// y luego desde app se importa todo junto mediante este entry point
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