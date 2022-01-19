import { Response, Request, Router } from 'express';
import  { User } from '../models/User'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();

let refreshTokens: any = []

function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

function generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

router.post('/', async (req, res) => {
    let response = await User.findOne({where: {email: req.body.email}})
    if (response) {
        try {
            if (await bcrypt.compare(req.body.password, response.hashedPass)) {
                const user = { email: req.body.email }
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                return res.send({ accessToken: accessToken, refreshToken: refreshToken })
            } else {
                return res.status(401).send({"Error": "Contrasenia incorrecta."})
            }
        } catch(error) {
            console.log(error)
            return res.sendStatus(500)
        }
    } else {
        return res.status(401).send({"Error": "No existe el usuario."})
    }
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ email: user.email })
        res.json({ accessToken: accessToken })
    })
})

router.delete('/remove', (req, res) => {
    refreshTokens = refreshTokens.filter((token: any) => token !== req.body.token)
    return res.sendStatus(200)
}) 

export default router;
