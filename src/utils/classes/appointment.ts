import { AppointmentStatus } from "../enums/AppointmentStatus";

export class Appointment {
  constructor(
    public id: string,
    public patientId: string,
    public doctorId: string,
    public start: Date,
    public end: Date,
    public status: AppointmentStatus,
  ) {}

  cancel(): void {
    if (this.status === AppointmentStatus.CONFIRMED) {
      this.status = AppointmentStatus.CANCELED;
    }
  }

  complete(): void {
    if (this.status === AppointmentStatus.CONFIRMED) {
      this.status = AppointmentStatus.COMPLETED;
    }
  }

  reschedule(newStart: Date, newEnd: Date): void {
    this.start = newStart;
    this.end = newEnd;
    this.status = AppointmentStatus.RESCHEDULED;
  }
}
