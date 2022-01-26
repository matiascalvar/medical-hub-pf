import { Response, Request, Router } from 'express';
import  { RefreshToken } from '../models/RefreshToken'
const Sequelize = require('sequelize')
const Op = Sequelize.Op


export default async function clearDB() {
    let today: any = new Date()
    let lastweek: any = new Date (today.getTime() - (7 * 24 * 60 * 60 * 1000))
    let response = await RefreshToken.destroy(
        {where: {createdAt: {[Op.lt]: lastweek}}}
    )
}


