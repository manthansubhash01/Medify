import { Doctor } from "../interfaces/doctor.interface";

export class DoctorClass implements Doctor {
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

  getAvailableSlots(date: Date): { start: string; end: string }[] {
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

    if (!this.workingDays.includes(dayName)) {
      return [];
    }

    return [this.workingHours];
  }

  isAvailable(day: string): boolean {
    return this.workingDays.includes(day);
  }
}
