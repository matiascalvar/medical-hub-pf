import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
import  { StudyType } from '../models/StudyType'
import { Scopes } from 'sequelize-typescript';
const {Op} = require(`sequelize`)
const router = Router();


router.post('/', async (req, res) => {

    //add 
    const {name, neededPreparation} = req.body;
    
    try{

    //create table
    let response  = await StudyType.create
    (
        {
        name,
        neededPreparation
        }
    );
    return res.status(201).send(response)
}
catch(e){
    console.log(e)
    return res.status(500).send(e)
};

})

router.get('/', async (req, res) => {

    try{

        //create table
        let response  = await StudyType.findAll
        (
            {
                where: {
                    name: req.body.name
                        }
            }
        );
        return res.status(201).send(response)
    }
    catch(e){
        console.log(e)
        return res.status(500).send(e)
    };


})


export default router;