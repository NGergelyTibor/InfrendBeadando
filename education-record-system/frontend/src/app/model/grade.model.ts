import { Student } from './student.model';
import { Course } from './course.model';
import { Subject } from './subject.model';

export class Grade {
  id: number;
  grade: number;
  student: Student;
  course: Course;
  subject: Subject;

  constructor(data: any) {
    this.id = data.id;
    this.grade = data.grade;
    this.student = new Student(data.student);
    this.course = new Course(data.course);
    this.subject = new Subject(data.subject);
  }
}

