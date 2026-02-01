import Person from "./person.interface";

export interface Doctor extends Person {
  specialization: string;
  department: string;
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
}
