import { Request, Response } from "express";
import AppointmentModel from "../models/appointment.model";
import PatientModel from "../models/patient.model";
import { AppointmentStatus } from "../utils/enums/AppointmentStatus";

export class AppointmentController {
  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { patientId, doctorId, start, end } = req.body;

      const appointment = await AppointmentModel.create({
        patientId,
        doctorId,
        start,
        end,
        status: AppointmentStatus.PENDING,
      });

      await PatientModel.findByIdAndUpdate(patientId, {
        $push: { appointments: appointment._id },
      });

      res.status(201).json({ message: "Appointment created", appointment });
    } catch (error) {
      res.status(500).json({ message: "Error creating appointment" });
    }
  }

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await AppointmentModel.find()
        .populate("patientId")
        .populate("doctorId");
      res.status(200).json({ appointments });
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  }

  async confirmAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      appointment.status = AppointmentStatus.CONFIRMED;
      await appointment.save();

      res.status(200).json({ message: "Appointment confirmed", appointment });
    } catch (error) {
      res.status(500).json({ message: "Error confirming appointment" });
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }

      appointment.status = AppointmentStatus.CANCELED;
      await appointment.save();

      res.status(200).json({ message: "Appointment canceled" });
    } catch (error) {
      res.status(500).json({ message: "Error canceling appointment" });
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await AppointmentModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting appointment" });
    }
  }
}
