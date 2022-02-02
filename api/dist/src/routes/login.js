"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const RefreshToken_1 = require("../models/RefreshToken");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = (0, express_1.Router)();
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.User.findOne({ where: { email: req.body.email } });
    if (user) {
        try {
            if (yield bcrypt.compare(req.body.password, user.hashedPass)) {
                const userData = {
                    email: user.email,
                    isStaff: user.isStaff,
                    isAdmin: user.isAdmin,
                };
                const accessToken = generateAccessToken(userData);
                const refreshToken = generateRefreshToken(userData);
                const response = yield RefreshToken_1.RefreshToken.create({ token: refreshToken });
                res.cookie('token', refreshToken, { httpOnly: true });
                return res.send({
                    email: user.email,
                    role: "patient",
                    token_type: "Bearer",
                    access_token: accessToken
                });
            }
            else {
                return res.status(401).send({ "error": "Contrasenia incorrecta." });
            }
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    else {
        return res.status(401).send({ "error": "No existe el usuario." });
    }
}));
router.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.token;
    if (!refreshToken)
        return res.sendStatus(401);
    try {
        let response = yield RefreshToken_1.RefreshToken.findOne({ where: { token: refreshToken } });
        if (!response)
            return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            const accessToken = generateAccessToken({ email: user.email });
            return res.send({
                email: user.email,
                role: "patient",
                token_type: "Bearer",
                access_token: accessToken
            });
        });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}));
router.delete('/remove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.token;
    if (!refreshToken)
        return res.sendStatus(401);
    try {
        let response = yield RefreshToken_1.RefreshToken.destroy({ where: { token: req.cookies.token } });
        if (!response)
            return res.sendStatus(404);
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}));
exports.default = router;
