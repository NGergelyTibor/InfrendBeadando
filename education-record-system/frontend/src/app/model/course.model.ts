import { Student } from './student.model';
import { Subject } from './subject.model';

export class Course {
  id: number;
  name: string;
  students: Student[];
  subject: Subject;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.students = data.students || [];
    this.subject = data.subject;
  }
}
