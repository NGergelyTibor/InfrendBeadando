import { Teacher } from './teacher.model';
import { Course } from './course.model';

export class Subject {
  id: number;
  name: string;
  teachers: Teacher[];
  courses: Course[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.teachers = data.teachers || [];
    this.courses = data.courses || [];
  }
}
