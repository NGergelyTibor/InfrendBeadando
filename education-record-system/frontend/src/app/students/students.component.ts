import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  selectedStudent?: Student;
  newStudent: Student = new Student({
    id: 0,
    name: '',
    department: '',
    courses: [],
    grades: []
  });

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students.map(s => new Student(s));
    });
  }

  onSelect(student: Student): void {
    this.selectedStudent = new Student(student);
  }

  createStudent(): void {
    this.studentService.createStudent(this.newStudent).subscribe(student => {
      this.students.push(new Student(student));
      this.newStudent = new Student({
        id: 0,
        name: '',
        department: '',
        courses: [],
        grades: []
      });
    });
  }

  updateStudent(): void {
    if (this.selectedStudent && this.selectedStudent.id) {
      this.studentService.updateStudent(this.selectedStudent.id, this.selectedStudent).subscribe(student => {
        const idx = this.students.findIndex(s => s.id === this.selectedStudent?.id);
        if (idx !== -1) {
          this.students[idx] = new Student(student);
        }
      });
    }
  }

  deleteStudent(): void {
    if (this.selectedStudent && this.selectedStudent.id) {
      this.studentService.deleteStudent(this.selectedStudent.id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== this.selectedStudent?.id);
        this.selectedStudent = undefined;
      });
    }
  }
}
