import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
import  { RefreshToken } from '../models/RefreshToken'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();

function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

function generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

router.post('/', async (req, res) => {
    let user = await User.findOne({where: {email: req.body.email}})
    if (user) {
        try {
            if (await bcrypt.compare(req.body.password, user.hashedPass)) {
                if (req.body.role === "medic") {
                    if (!user.isStaff) return res.status(401).send({"error": "No tiene permisos de medico"})
                }
                const userData = {
                    email: user.email,
                    role: req.body.role,
                    isAdmin: user.isAdmin,
                }
                const accessToken = generateAccessToken(userData)
                const refreshToken = generateRefreshToken(userData)
                const response = await RefreshToken.create({token: refreshToken})
                res.cookie('token', refreshToken, { httpOnly: true})
                return res.send({
                    email: user.email,
                    role: req.body.role,
                    token_type: "Bearer",
                    access_token: accessToken
                })
            } else {
                return res.status(401).send({"error": "Contrasenia incorrecta."})
            }
        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    } else {
        return res.status(401).send({"error": "No existe el usuario."})
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
                access_token: accessToken
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
