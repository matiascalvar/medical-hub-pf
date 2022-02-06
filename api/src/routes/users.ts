import {Response, Request, Router} from 'express';
import { MedicalStaff } from '../models/MedicalStaff';
import { Patient } from '../models/Patient';
import { Plan } from '../models/Plan';
import { User } from '../models/User';
import { authenticateToken } from './middelwares'
const router = Router();


router.get('/', authenticateToken , async (req: any, res) => {
    let email = req.email.email

    try {
        let user: any = await User.findOne({ where: { email: email }});

        let userId = user.dataValues.id
        const patient: any = await Patient.findOne({
          where: { UserId: userId },
          include: [
            {
              model: Plan,
              attributes: {
                include: ["name", "coveragePercentage"],
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ]
        });
        
        res.send(patient.dataValues) 
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(404)
    } 
});

router.get('/medic', authenticateToken , async (req: any, res) => {
    let email = req.email.email

    try {
        let user: any = await User.findOne({ where: { email: email}});

        let userId = user.id
        const medic: any = await MedicalStaff.findOne({ where: {UserId: userId} });
        
        res.send(medic.dataValues) 
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(404)
    } 
});

export default router;