import mongoose, { Schema, Document, Model } from "mongoose";
import { Patient } from "../utils/interfaces/patient.interface";
import { PatientType } from "../utils/enums/PatientType";

export interface PatientDoc extends Document, Patient {}

export type PatientModel = Model<PatientDoc>;

const PatientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: Object.values(PatientType),
      default: PatientType.NORMAL,
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<PatientDoc>("Patient", PatientSchema);
