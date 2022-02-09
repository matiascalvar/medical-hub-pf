import { Router } from 'express';
import  { User } from '../models/User'
import  { RefreshToken } from '../models/RefreshToken'
import { Patient } from '../models/Patient';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();

function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60m'})
}

function generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

router.post('/', async (req, res) => {
    let user = await User.findOne({where: {email: req.body.email}})
    if (user) {
        try {
            if (!user.active) return res.status(401).send({"error": "Access revoked"})
            if (await bcrypt.compare(req.body.password, user.hashedPass)) {
                if (req.body.role === "medic") {
                    if (!user.isStaff) return res.status(401).send({"error": "Not a medic."})
                }
                if (req.body.role === "patient") {
                    let patient = await Patient.findOne({where: {UserId: user.id}})
                    if (!patient) return res.status(401).send({"error": "Not a patient."})
                }
                const userData = {
                    email: user.email,
                    role: req.body.role,
                    isAdmin: user.isAdmin,
                    resetPass: user.resetPass
                }
                const accessToken = generateAccessToken(userData)
                const refreshToken = generateRefreshToken(userData)
                const response = await RefreshToken.create({token: refreshToken})
                res.cookie('token', refreshToken, { httpOnly: true})
                return res.send({
                    email: user.email,
                    role: req.body.role,
                    token_type: "Bearer",
                    access_token: accessToken,
                    resetPass: user.resetPass,
                    isAdmin: user.isAdmin
                })
            } else {
                return res.status(401).send({"error": "Incorrect password"})
            }
        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    } else {
        return res.status(401).send({"error": "This user doesn't exist"})
    }
});

router.post('/token', async (req, res) => {
    const refreshToken = req.cookies.token
    if (!refreshToken) return res.sendStatus(401)
    try {
        let response = await RefreshToken.findOne({where: {token: refreshToken}}) 
        if (!response) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken(user)
            return res.send({
                email: user.email,
                role: user.role,
                token_type: "Bearer",
                access_token: accessToken,
                resetPass: user.resetPass,
                isAdmin: user.isAdmin
            })
        })
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.delete('/remove', async  (req, res) => {
    const refreshToken = req.cookies.token
    if (!refreshToken) return res.sendStatus(401)
    try {
        let response = await RefreshToken.destroy({where: {token: req.cookies.token}})
        if (!response) return res.sendStatus(404)
        return res.sendStatus(200)
    } catch(error) {
        console.log(error)
        return res.sendStatus(500)
    }
}) 


export default router
