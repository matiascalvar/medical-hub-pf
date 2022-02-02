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
const MedicalStaff_1 = require("../models/MedicalStaff");
const Specialitie_1 = require("../models/Specialitie");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let specialities = yield Specialitie_1.Specialitie.findAll();
        res.status(200).send(specialities);
    }
    catch (error) {
        console.log(error);
        res.status(404);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSpeciality = req.params.id;
        const medicalStaff = yield MedicalStaff_1.MedicalStaff.findAll({
            where: { SpecialitieId: idSpeciality },
            attributes: {
                include: ["id", "firstName", "lastName", "idNumber"],
                exclude: [
                    "availability",
                    "avbTo",
                    "avbFrom",
                    "appointmentDuration",
                    "SpecialitieId",
                    "UserId",
                    "createdAt",
                    "updatedAt",
                ],
            },
            order: [["lastName", "ASC"]],
        });
        medicalStaff.length > 0
            ? res.send(medicalStaff)
            : res.send({ message: "No hay médicos con esa Especialidad." });
    }
    catch (e) {
        console.log(e);
        return res.status(401).send({ Error: e });
    }
}));
exports.default = router;
