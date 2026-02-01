import Person from "./person.interface";
import { PatientType } from "../enums/PatientType";
import { Appointment } from "../classes/appointment";

export interface Patient extends Person{
    type : PatientType;
    appointments: Appointment[];
}