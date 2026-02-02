import { Request, Response } from "express";
import PatientModel from "../models/patient.model";
import { PatientType } from "../utils/enums/PatientType";

export class PatientController {
  async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const { name, age, phone, email, type } = req.body;

      const patient = await PatientModel.create({
        name,
        age,
        phone,
        email,
        type: type || PatientType.NORMAL,
        appointments: [],
      });

      res.status(201).json({ message: "Patient created", patient });
    } catch (error) {
      res.status(500).json({ message: "Error creating patient" });
    }
  }

  async getAllPatients(req: Request, res: Response): Promise<void> {
    try {
      const patients = await PatientModel.find();
      res.status(200).json({ patients });
    } catch (error) {
      res.status(500).json({ message: "Error fetching patients" });
    }
  }

  async getPatientById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await PatientModel.findById(id).populate("appointments");

      if (!patient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }

      res.status(200).json({ patient });
    } catch (error) {
      res.status(500).json({ message: "Error fetching patient" });
    }
  }

  async updatePatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await PatientModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!patient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }

      res.status(200).json({ message: "Patient updated", patient });
    } catch (error) {
      res.status(500).json({ message: "Error updating patient" });
    }
  }

  async deletePatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PatientModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Patient deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting patient" });
    }
  }
}
