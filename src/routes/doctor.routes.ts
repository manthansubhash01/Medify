import { Router } from "express";
import { DoctorController } from "../controllers/doctor.controller";

const router = Router();
const doctorController = new DoctorController();

router.post("/", (req, res) => doctorController.createDoctor(req, res));

router.get("/", (req, res) => doctorController.getAllDoctors(req, res));

router.get("/:id", (req, res) => doctorController.getDoctorById(req, res));

router.put("/:id", (req, res) => doctorController.updateDoctor(req, res));

router.delete("/:id", (req, res) => doctorController.deleteDoctor(req, res));

export default router;
