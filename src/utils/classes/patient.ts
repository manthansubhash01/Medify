import { Patient } from "../interfaces/patient.interface";
import { PatientType } from "../enums/PatientType";
import { Appointment } from "../classes/appointment";

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
    this.appointments.push(appointment);
  }

  cancelAppointment(appointmentId: string): void {
    this.appointments = this.appointments.filter(
      (apt) => apt.id !== appointmentId,
    );
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }
}
