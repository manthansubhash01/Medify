import { Request, Response } from "express";
import DoctorModel from "../models/doctor.model";

export class DoctorController {
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

      const doctor = await DoctorModel.create({
        name,
        age,
        phone,
        email,
        specialization,
        department,
        workingDays,
        workingHours,
      });

      res.status(201).json({ message: "Doctor created", doctor });
    } catch (error) {
      res.status(500).json({ message: "Error creating doctor" });
    }
  }

  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await DoctorModel.find();
      res.status(200).json({ doctors });
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors" });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doctor = await DoctorModel.findById(id);

      if (!doctor) {
        res.status(404).json({ message: "Doctor not found" });
        return;
      }

      res.status(200).json({ doctor });
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctor" });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doctor = await DoctorModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!doctor) {
        res.status(404).json({ message: "Doctor not found" });
        return;
      }

      res.status(200).json({ message: "Doctor updated", doctor });
    } catch (error) {
      res.status(500).json({ message: "Error updating doctor" });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await DoctorModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Doctor deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting doctor" });
    }
  }
}
