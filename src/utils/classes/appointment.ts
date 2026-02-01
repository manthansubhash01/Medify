import { AppointmentStatus } from "../enums/AppointmentStatus";

export class Appointment {
  constructor(
    public id: string,
    public patientId: string,
    public doctorId: string,
    public start: Date,
    public end: Date,
    private status: AppointmentStatus,
  ) {}

  cancel(): void {
    this.status = AppointmentStatus.CANCELED;
  }

  complete(): void {
    this.status = AppointmentStatus.COMPLETED;
  }

  reschedule(newStart: Date, newEnd: Date): void {
    this.start = newStart;
    this.end = newEnd;
    this.status = AppointmentStatus.RESCHEDULED;
  }

  getStatus(): AppointmentStatus {
    return this.status;
  }

  updateStatus(newStatus: AppointmentStatus): void {
    this.status = newStatus;
  }
}
