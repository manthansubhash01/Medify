import { Request, Response } from "express";
import { PatientService } from "../services/patient.service";

export class PatientController {
  private patientService: PatientService;

  constructor() {
    this.patientService = new PatientService();
  }

  async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const { name, age, phone, email, type } = req.body;

      if (!name || !age || !phone || !email) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const patient = await this.patientService.createPatient(req.body);
      res.status(201).json({ message: "Patient created", patient });
    } catch (error) {
      res.status(500).json({ message: "Error creating patient" });
    }
  }

  async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      const { type, page, limit } = req.query;

      const result = await this.patientService.getAllPatients({
        type,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error fetching patients" });
    }
  }

  async getPatientById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await this.patientService.getPatientById(id as string);
      res.status(200).json({ patient });
    } catch (error: any) {
      if (error.message === "Patient not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error fetching patient" });
      }
    }
  }

  async updatePatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await this.patientService.updatePatient(
        id as string,
        req.body,
      );
      res.status(200).json({ message: "Patient updated", patient });
    } catch (error: any) {
      if (error.message === "Patient not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error updating patient" });
      }
    }
  }

  async deletePatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.patientService.deletePatient(id as string);
      res.status(200).json({ message: "Patient deleted" });
    } catch (error: any) {
      if (error.message === "Patient not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error deleting patient" });
      }
    }
  }
}
