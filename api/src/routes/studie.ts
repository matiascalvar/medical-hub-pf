import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
import  { Studie } from '../models/Studie'
import  { StudyType } from '../models/StudyType'
import  { MedicalStaff } from '../models/MedicalStaff'
import  { Appointment } from '../models/Appointment'
import  { Patient } from '../models/Patient'
const {Op} = require(`sequelize`)


const router = Router();


router.post('/', async (req, res) => {
    // Check all data.
    // Verificate info
        //StudyType
        const TriggerStudyType = await StudyType.findOne(  
            {
                where: {
                    name: {
                             [Op.iLike]: "%"+req.body.StudyTypeName+"%"
                          } 
                        }
            }
               )
            //MedicalStaff
            const TriggerMedicalStaff = await MedicalStaff.findOne(
                {       where: {
                            name:{
                            [Op.iLike]: "%"+ req.body.MedicalStaffName+"%"
                                 }
                                }
                }
                                                                    )    
                //Appointment
                const  TriggerAppointment = await Appointment.findOne(
                    {where:
                         {
                        date: req.body.AppointmentDate
                         }
                    }       
                                                                    )
                //Patient
                const TriggerPatient = await Patient.findOne(
                    {
                        where:
                         {
                             dni: req.body.PatientDni
                        }
                    }
                                                            )
            
                     if (
                        TriggerStudyType === null
                        ||TriggerMedicalStaff === null
                        ||TriggerAppointment === null
                        ||TriggerPatient === null 
                        )
                             {
                                return res.status(403).send({"Error:": "falta valor en la request"})
                             }                   
                    try 
                    {


let estudie = {
             state: req.body.state,
             diagnosis: req.body.diagnosis,
             studyPDF: req.body.studyPDF,
             PacientId: TriggerStudyType.id ,
             MedicalStaffId:TriggerMedicalStaff.id,
             StudyTypeId:TriggerStudyType.id,
             AppointmentId:TriggerAppointment.id
             }

        const response = await Studie.create(estudie)
     
        return res.status(201).send(response)
    }catch(e) {
        console.log(e)
        return res.status(500).send(e)
    };

    
   
});

//Get all detail about one studie, 
//use params
router.get('/:id', async (req, res) => {
    //get the req for the body name patient

    const  findID = await Patient.findOne({where: {name: req.params.id }})
    
    if(findID === null)    
        return res.status(403).send({"Error:": "Paciente no existe en la database."})
    
    try 
    {       
        //find de module 
        const AllStudie  = await  Studie.findAll(
            { where:
                {                  
                   PatientId : req.params.id  
                }
            }           
                                               )

        return res.status(201).send(AllStudie)
        // send data, not shall nothing in the req.
    }
    catch(e) {
        console.log(e)
        return res.status(500).send(e)
    };

})

//Change info about Studie
router.put('/', async (req, res) => {

    const TriggerStudyType = await StudyType.findOne(  
        {
            where: {
                name: {
                         [Op.iLike]: "%"+req.body.StudyTypeName+"%"
                      } 
                    }
        }
           )
        //MedicalStaff
        const TriggerMedicalStaff = await MedicalStaff.findOne(
            {       where: {
                        name:{
                        [Op.iLike]: "%"+ req.body.MedicalStaffName+"%"
                             }
                            }
            }
                                                                )    
            //Appointment
            const  TriggerAppointment = await Appointment.findOne(
                {       where:
                            {
                            date: req.body.AppointmentDate
                            }
                }       
                                                                )
            //Patient
            const TriggerPatient = await Patient.findOne(
                {
                    where:
                     {
                         dni: req.body.PatientDni
                    }
                }
                                                        )

//   ---------//  -------------- // ---------------- // -----------------
        
                  if (
                      TriggerStudyType === null
                    ||TriggerMedicalStaff === null
                    ||TriggerAppointment === null
                    ||TriggerPatient === null 
                    )
                    {
                            return res.status(403).send({"Error:": "falta valor en la request"})
                        }      

try 
    { 
 const response = await Studie.update(
    {   state:           req.body.state,
        diagnosis:       req.body.diagnosis,
        studyPDF:        req.body.studyPDF,       
        MedicalStaffId:  TriggerMedicalStaff.id,
        StudyTypeId:     TriggerStudyType.id,
        AppointmentId:   TriggerAppointment.id
     },
    { where: { id: req.body.id } }

    )
    return res.status(201).send(response)
}
catch(e) {
    console.log(e)
    return res.status(500).send(e)
};

})


export default router;