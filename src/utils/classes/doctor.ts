import { Doctor } from "../interfaces/doctor.interface";
import { Appointment } from "../classes/appointment";
import { AppointmentStatus } from "../enums/AppointmentStatus";

export class DoctorClass implements Doctor {
  public appointments: Appointment[] = [];

  constructor(
    public name: string,
    public age: number,
    public phone: string,
    public email: string,
    public specialization: string,
    public department: string,
    public workingDays: string[],
    public workingHours: {
      start: string;
      end: string;
    },
  ) {}

  isWorkingDay(date: Date): boolean {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    return this.workingDays.includes(dayName);
  }

  isAvailable(requestedStart: Date, requestedEnd: Date): boolean {
    if (!this.isWorkingDay(requestedStart)) {
      return false;
    }

    const hasConflict = this.appointments.some((apt) => {
      if (apt.status !== AppointmentStatus.CONFIRMED) {
        return false;
      }
      return (
        (requestedStart >= apt.start && requestedStart < apt.end) ||
        (requestedEnd > apt.start && requestedEnd <= apt.end) ||
        (requestedStart <= apt.start && requestedEnd >= apt.end)
      );
    });

    return !hasConflict;
  }

  acceptAppointment(appointment: Appointment): boolean {
    if (!this.isAvailable(appointment.start, appointment.end)) {
      return false;
    }
    appointment.status = AppointmentStatus.CONFIRMED;
    this.appointments.push(appointment);
    return true;
  }

  rejectAppointment(appointment: Appointment): void {
    appointment.status = AppointmentStatus.REJECTED;
  }

  rescheduleAppointment(
    appointmentId: string,
    newStart: Date,
    newEnd: Date,
  ): boolean {
    const appointment = this.appointments.find(
      (apt) => apt.id === appointmentId,
    );
    if (!appointment) {
      return false;
    }

    if (!this.isAvailable(newStart, newEnd)) {
      return false;
    }

    appointment.reschedule(newStart, newEnd);
    return true;
  }

  getConfirmedAppointments(): Appointment[] {
    return this.appointments.filter(
      (apt) => apt.status === AppointmentStatus.CONFIRMED,
    );
  }
}
