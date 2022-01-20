import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
import  { Studie } from '../models/Studie'
import  { StudyType } from '../models/StudyType'
import  { MedicalStaff } from '../models/MedicalStaff'
import  { Appointment } from '../models/Appointment'
import  { Patient } from '../models/Patient'
const {Op} = require(`sequelize`)

// const bcrypt = require('bcrypt')
const router = Router();



router.post('/', async (req, res) => {
    // Check all data.
    // Example info  body
    //     state: "ACTIVE",
    //     diagnosis: "normal",
    //     studyPDF: "https/rute",
    //     StudyTypeName:"escaner",
    //     MedicalStaffName:"Gustavo" ,
    //     AppointmentDate:"05/06/2021",
    //     Patientdni:"Laura",
         
// Verificate fork-Ids
    //StudyType
    const TriggerStudyType = await StudyType.findOne({where: {name: {
        [Op.iLike]: "%"+req.body.StudyTypeName+"%"
       } }})
    //MedicalStaff
    const TriggerMedicalStaff = await MedicalStaff.findOne({where: {name:{
        [Op.iLike]: "%"+ req.body.MedicalStaffName+"%"
       }
        }})    
    //Appointment
    const  TriggerAppointment = await Appointment.findOne({where: {date: req.body.AppointmentDate}})
    //Patient
    const TriggerPatient = await Patient.findOne({where: {dni: req.body.PatientDni}})

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
        let estudie = 
        {
            state: req.body.state,
            diagnosis: req.body.diagnosis,
            studyPDF: req.body.studyPDF,
             pacientId: TriggerStudyType.id ,
             medicalStaffId:TriggerMedicalStaff.id,
             studyTypeId:TriggerStudyType.id,
             appointmentId:TriggerAppointment.id
        }
        
        const response = await Studie.create(estudie)
     
        return res.status(201).send(response)
    }catch(e) {
        console.log(e)
        return res.status(500).send(e)
    };

    
    res.send("Hola mundo")
});

//Get all detail about one studie
router.get('/', async (req, res) => {
    //get the req for the body

    // verificate the data 

    try 
    {
        //find de module 


        // send data, not shall nothing in the req.

    }
    catch(e) {
        console.log(e)
        return res.status(500).send(e)
    };

})

//Change info about Studie
router.put('/', async (req, res) => {
    


})


export default router;