import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";

const router = Router();
const appointmentController = new AppointmentController();

router.post("/", (req, res) =>
  appointmentController.createAppointment(req, res),
);

router.get("/", (req, res) =>
  appointmentController.getAllAppointments(req, res),
);

router.patch("/:id/confirm", (req, res) =>
  appointmentController.confirmAppointment(req, res),
);

router.patch("/:id/cancel", (req, res) =>
  appointmentController.cancelAppointment(req, res),
);

router.delete("/:id", (req, res) =>
  appointmentController.deleteAppointment(req, res),
);

export default router;
