import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { patientId, doctorId, start, end } = req.body;

      if (!patientId || !doctorId || !start || !end) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const appointment = await this.appointmentService.createAppointment(
        patientId,
        doctorId,
        new Date(start),
        new Date(end),
      );

      res.status(201).json({ message: "Appointment created", appointment });
    } catch (error) {
      res.status(500).json({ message: "Error creating appointment" });
    }
  }

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const { status, doctorId, patientId, page, limit } = req.query;

      const result = await this.appointmentService.getAllAppointments({
        status,
        doctorId,
        patientId,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  }

  async confirmAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.confirmAppointment(
        id as string,
      );
      res.status(200).json({ message: "Appointment confirmed", appointment });
    } catch (error: any) {
      if (error.message === "Appointment not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error confirming appointment" });
      }
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.cancelAppointment(
        id as string,
      );
      res.status(200).json({ message: "Appointment canceled", appointment });
    } catch (error: any) {
      if (error.message === "Appointment not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error canceling appointment" });
      }
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.appointmentService.deleteAppointment(id as string);
      res.status(200).json({ message: "Appointment deleted" });
    } catch (error: any) {
      if (error.message === "Appointment not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error deleting appointment" });
      }
    }
  }
}
