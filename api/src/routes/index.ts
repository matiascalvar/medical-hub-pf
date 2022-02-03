import { Response, Request, Router } from "express";
const router = Router();

// Creamos las rutas. Si qeremos separar las rutas en archivos
// creamos los mismos, los importamos en este index (import otherRoutes from './other';)
// y luego desde app se importa todo junto mediante este entry point

import login from './login'
import users from './users'
import register from  './register'
import appointments from './appointments'
import appointmentDetails from './appointmentDetails'
import medicalstaff from './medicalstaff'
import studies from './studies'
import plans from './plans'
import specialities from './specialities'
import updateUser from './updateUser'
import mercadopago from "./mercadopago";
import updateMedic from "./updateMedic";

router.use('/login', login)
router.use('/users', users)
router.use('/register', register)
router.use('/appointments', appointments)
router.use('/appointmentsDetails', appointmentDetails)
router.use('/medicalstaff', medicalstaff)
router.use('/studies', studies)
router.use('/plans', plans)
router.use('/specialities', specialities)
router.use('/updateUser', updateUser)
router.use("/mercadopago", mercadopago)
router.use('/updateMedic', updateMedic)

router.get("/", (req: Request, res: Response) => {
  res.send("soy la ruta home get! Probá /test");
});

router.get("/test", (req: Request, res: Response) => {
  res.send("soy la ruta test get!");
});

router.post("/", (req: Request, res: Response) => {
  res.send("soy la ruta test post!");
});

export default router;
