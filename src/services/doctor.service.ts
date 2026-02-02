import DoctorModel from "../models/doctor.model";

export class DoctorService {
  async createDoctor(data: any) {
    const {
      name,
      age,
      phone,
      email,
      specialization,
      department,
      workingDays,
      workingHours,
    } = data;

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

    return doctor;
  }

  async getAllDoctors(filters: any) {
    const { specialization, department, page = 1, limit = 10 } = filters;

    const query: any = {};
    if (specialization) query.specialization = specialization;
    if (department) query.department = department;

    const skip = (page - 1) * limit;

    const doctors = await DoctorModel.find(query).skip(skip).limit(limit);

    const total = await DoctorModel.countDocuments(query);

    return {
      doctors,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    };
  }

  async getDoctorById(id: string) {
    const doctor = await DoctorModel.findById(id);
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  }

  async updateDoctor(id: string, data: any) {
    const doctor = await DoctorModel.findByIdAndUpdate(id, data, { new: true });
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  }

  async deleteDoctor(id: string) {
    const doctor = await DoctorModel.findByIdAndDelete(id);
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  }
}
