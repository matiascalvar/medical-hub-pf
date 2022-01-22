import {Response, Request, Router, response} from 'express';
import { Appointment } from '../models/Appointment';
import { MedicalStaff } from '../models/MedicalStaff';
import { Plan } from '../models/Plan';
import { Studie } from '../models/Studie';
import { StudyType } from '../models/StudyType';
const router = Router();


router.get('/', async (req, res) => {
    try {
        const plans = await Plan.findAll({
            attributes: {
                include:['id','name','coveragePercentage'], 
                exclude:['createdAt','updatedAt']
            }            
        });         
 
        res.send(plans)
        
    } catch (e) {
        console.log(e)
        return res.status(401).send({Error: "No existe el Plan."})
    }
});

export default router;