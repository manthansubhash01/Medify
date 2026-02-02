import { Router } from "express";
import { PatientController } from "../controllers/patient.controller";

const router = Router();
const patientController = new PatientController();

router.post("/", (req, res) => patientController.createPatient(req, res));

router.get("/", (req, res) => patientController.getAllPatients(req, res));

router.get("/:id", (req, res) => patientController.getPatientById(req, res));

router.put("/:id", (req, res) => patientController.updatePatient(req, res));

router.delete("/:id", (req, res) => patientController.deletePatient(req, res));

export default router;
