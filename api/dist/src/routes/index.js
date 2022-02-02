"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Creamos las rutas. Si qeremos separar las rutas en archivos
// creamos los mismos, los importamos en este index (import otherRoutes from './other';)
// y luego desde app se importa todo junto mediante este entry point
const login_1 = __importDefault(require("./login"));
const users_1 = __importDefault(require("./users"));
const register_1 = __importDefault(require("./register"));
const appointments_1 = __importDefault(require("./appointments"));
const appointmentDetails_1 = __importDefault(require("./appointmentDetails"));
const medicalstaff_1 = __importDefault(require("./medicalstaff"));
const studies_1 = __importDefault(require("./studies"));
const plans_1 = __importDefault(require("./plans"));
const specialities_1 = __importDefault(require("./specialities"));
const updateUser_1 = __importDefault(require("./updateUser"));
const mercadopago_1 = __importDefault(require("./mercadopago"));
router.use('/login', login_1.default);
router.use('/users', users_1.default);
router.use('/register', register_1.default);
router.use('/appointments', appointments_1.default);
router.use('/appointmentsDetails', appointmentDetails_1.default);
router.use('/medicalstaff', medicalstaff_1.default);
router.use('/studies', studies_1.default);
router.use('/plans', plans_1.default);
router.use('/specialities', specialities_1.default);
router.use('/updateUser', updateUser_1.default);
router.use("/mercadopago", mercadopago_1.default);
router.get("/", (req, res) => {
    res.send("soy la ruta home get! Probá /test");
});
router.get("/test", (req, res) => {
    res.send("soy la ruta test get!");
});
router.post("/", (req, res) => {
    res.send("soy la ruta test post!");
});
exports.default = router;
