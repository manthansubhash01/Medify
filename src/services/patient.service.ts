import PatientModel from "../models/patient.model";
import { PatientType } from "../utils/enums/PatientType";

export class PatientService {
  async createPatient(data: any) {
    const { name, age, phone, email, type } = data;

    const patient = await PatientModel.create({
      name,
      age,
      phone,
      email,
      type: type || PatientType.NORMAL,
      appointments: [],
    });

    return patient;
  }

  async getAllPatients(filters: any) {
    const { type, page = 1, limit = 10 } = filters;

    const query: any = {};
    if (type) query.type = type;

    const skip = (page - 1) * limit;

    const patients = await PatientModel.find(query).skip(skip).limit(limit);

    const total = await PatientModel.countDocuments(query);

    return {
      patients,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    };
  }

  async getPatientById(id: string) {
    const patient = await PatientModel.findById(id).populate("appointments");
    if (!patient) throw new Error("Patient not found");
    return patient;
  }

  async updatePatient(id: string, data: any) {
    const patient = await PatientModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!patient) throw new Error("Patient not found");
    return patient;
  }

  async deletePatient(id: string) {
    const patient = await PatientModel.findByIdAndDelete(id);
    if (!patient) throw new Error("Patient not found");
    return patient;
  }
}
