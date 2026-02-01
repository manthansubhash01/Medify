import mongoose, { Schema, Document, Model } from "mongoose";
import { Doctor } from "../utils/interfaces/doctor.interface";

export interface DoctorDoc extends Document, Doctor {}

export type DoctorModel = Model<DoctorDoc>;

const DoctorSchema: Schema = new Schema(
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
    specialization: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    workingDays: {
      type: [String],
      required: true,
    },
    workingHours: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<DoctorDoc>("Doctor", DoctorSchema);
