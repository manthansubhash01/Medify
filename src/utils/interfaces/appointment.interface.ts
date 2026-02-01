import { AppointmentStatus } from "../enums/AppointmentStatus";

export interface AppointmentDocument {
  patientId: string;
  doctorId: string;
  start: Date;
  end: Date;
  status: AppointmentStatus;
}