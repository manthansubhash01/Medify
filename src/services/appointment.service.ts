import AppointmentModel from "../models/appointment.model";
import PatientModel from "../models/patient.model";
import { AppointmentStatus } from "../utils/enums/AppointmentStatus";

export class AppointmentService {
  async createAppointment(
    patientId: string,
    doctorId: string,
    start: Date,
    end: Date,
  ) {
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

    return appointment;
  }

  async getAllAppointments(filters: any) {
    const { status, doctorId, patientId, page = 1, limit = 10 } = filters;

    const query: any = {};

    if (status) query.status = status;
    if (doctorId) query.doctorId = doctorId;
    if (patientId) query.patientId = patientId;

    const skip = (page - 1) * limit;

    const appointments = await AppointmentModel.find(query)
      .populate("patientId")
      .populate("doctorId")
      .skip(skip)
      .limit(limit)
      .sort({ start: -1 });

    const total = await AppointmentModel.countDocuments(query);

    return {
      appointments,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    };
  }

  async confirmAppointment(id: string) {
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) throw new Error("Appointment not found");

    appointment.status = AppointmentStatus.CONFIRMED;
    await appointment.save();
    return appointment;
  }

  async cancelAppointment(id: string) {
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) throw new Error("Appointment not found");

    appointment.status = AppointmentStatus.CANCELED;
    await appointment.save();
    return appointment;
  }

  async deleteAppointment(id: string) {
    const appointment = await AppointmentModel.findByIdAndDelete(id);
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  }
}
