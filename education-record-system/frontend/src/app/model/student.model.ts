import { Course } from './course.model';
import { Grade } from './grade.model';

export class Student {
  id: number;
  name: string;
  department: string;
  courses: Course[];
  grades: Grade[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.department = data.department;
    this.courses = data.courses || [];
    this.grades = data.grades || [];
  }
}
