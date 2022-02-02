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
const Appointment_1 = require("../models/Appointment");
const mercadopago = require("mercadopago");
const axios = require("axios");
const router = (0, express_1.Router)();
// Token creado desde las credenciales de Mercado Pago
// Debe ser movido luego a variables de entorno
mercadopago.configure({
    access_token: "TEST-3165795748532207-012420-5ce03fdac737c3769cd0c770d40a9972-131457142",
});
// Recibo el producto (title, unit price, quantity) y lo envio a MP
// Esto devuelve el preferenceID. Este se envia al front para generar el script de Mercado Pago
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { appointmentId, unit_price, title } = req.query;
    unit_price = Number(unit_price);
    mercadopago.preferences
        .create({
        external_reference: appointmentId,
        back_urls: {
            success: "http://localhost:3000/home",
            failure: "http://localhost:3000/home",
            pending: "http://localhost:3000/home",
        },
        items: [
            {
                title,
                unit_price,
                quantity: 1,
                currency_id: "ARS",
            },
        ],
    })
        .then((preference) => {
        return res.json({ preferenceId: preference.response.sandbox_init_point });
    })
        .catch((e) => console.log(e));
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id: ", req.body.data.id);
    let paymentId = req.body.data.id;
    try {
        const headers = {
            headers: {
                Authorization: "Bearer TEST-3165795748532207-012420-5ce03fdac737c3769cd0c770d40a9972-131457142",
            },
        };
        const authAxios = axios.create(headers);
        const response = yield authAxios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`);
        console.log("STATUS DE PAGO", response.data.status);
        let paymentStatus = response.data.status;
        let paidAppointmentId = response.data.external_reference;
        if (paymentStatus === "approved") {
            try {
                let appointment = yield Appointment_1.Appointment.findOne({
                    where: { id: paidAppointmentId },
                });
                const result = yield appointment.update({ pay: true });
                return res.status(201).send({ message: "Pago acreditado con exito" });
            }
            catch (err) {
                console.log(err);
                return res.sendStatus(404);
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(404);
    }
}));
exports.default = router;
