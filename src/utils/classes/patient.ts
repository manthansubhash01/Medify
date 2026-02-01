import { Patient } from "../interfaces/patient.interface";
import { PatientType } from "../enums/PatientType";
import { Appointment } from "../classes/appointment";
import { AppointmentStatus } from "../enums/AppointmentStatus";

export class PatientClass implements Patient {
  constructor(
    public name: string,
    public age: number,
    public phone: string,
    public email: string,
    public type: PatientType,
    public appointments: Appointment[],
  ) {}

  requestAppointment(appointment: Appointment): void {
    appointment.status = AppointmentStatus.PENDING;
    this.appointments.push(appointment);
  }

  cancelAppointment(appointmentId: string): void {
    const appointment = this.appointments.find(
      (apt) => apt.id === appointmentId,
    );
    if (appointment) {
      appointment.cancel();
    }
  }

  getConfirmedAppointments(): Appointment[] {
    return this.appointments.filter(
      (apt) => apt.status === AppointmentStatus.CONFIRMED,
    );
  }

  getPendingAppointments(): Appointment[] {
    return this.appointments.filter(
      (apt) => apt.status === AppointmentStatus.PENDING,
    );
  }
}
