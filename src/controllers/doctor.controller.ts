import { Request, Response } from "express";
import { DoctorService } from "../services/doctor.service";

export class DoctorController {
  private doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        age,
        phone,
        email,
        specialization,
        department,
        workingDays,
        workingHours,
      } = req.body;

      if (!name || !age || !phone || !email || !specialization || !department) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const doctor = await this.doctorService.createDoctor(req.body);
      res.status(201).json({ message: "Doctor created", doctor });
    } catch (error) {
      res.status(500).json({ message: "Error creating doctor" });
    }
  }

  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const { specialization, department, page, limit } = req.query;

      const result = await this.doctorService.getAllDoctors({
        specialization,
        department,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors" });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doctor = await this.doctorService.getDoctorById(id as string);
      res.status(200).json({ doctor });
    } catch (error: any) {
      if (error.message === "Doctor not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error fetching doctor" });
      }
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doctor = await this.doctorService.updateDoctor(
        id as string,
        req.body,
      );
      res.status(200).json({ message: "Doctor updated", doctor });
    } catch (error: any) {
      if (error.message === "Doctor not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error updating doctor" });
      }
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.doctorService.deleteDoctor(id as string);
      res.status(200).json({ message: "Doctor deleted" });
    } catch (error: any) {
      if (error.message === "Doctor not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error deleting doctor" });
      }
    }
  }
}
