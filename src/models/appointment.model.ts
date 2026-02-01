import mongoose, { Schema, Document, Model } from "mongoose";
import { AppointmentDocument } from "../utils/interfaces/appointment.interface";
import { AppointmentStatus } from "../utils/enums/AppointmentStatus";

export interface AppointmentDoc extends Document, AppointmentDocument {}

export type AppointmentModel = Model<AppointmentDoc>;

const AppointmentSchema: Schema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.BOOKED,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<AppointmentDoc>("Appointment", AppointmentSchema);
