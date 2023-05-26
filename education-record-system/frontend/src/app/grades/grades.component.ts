import { Component, OnInit } from '@angular/core';
import { GradeCreationObject, GradeService } from '../services/grade.service';
import { Grade } from '../model/grade.model';
import { Student } from '../model/student.model';
import { Subject } from '../model/subject.model';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  grades: Grade[] = [];
  students: Student[] = [];
  courses: Course[] = [];
  subjects: Subject[] = [];
  newGrade = {
    grade: null,
    student: { id: null },
    course: { id: null },
    subject: { id: null },
  };

  courseIdInput: number | null = null;
  averageGradeByCourse: number | null = null;

  studentIdInput: number | null = null;
  averageGradeByStudent: number | null = null;

  constructor(private gradeService: GradeService, private studentService: StudentService,  private subjectService: SubjectService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getGrades();
    this.getStudents();
    this.getCourses();
    this.getSubjects();
  }

  getGrades(): void {
    this.gradeService.getGrades().subscribe(
      data => {
        this.grades = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      data => {
        this.subjects = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  getCourses(): void {
    this.courseService.getCourses().subscribe(
      data => {
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  createGrade() {
    if (this.newGrade.student.id === null || this.newGrade.course.id === null || this.newGrade.subject.id === null || this.newGrade.grade === null) {
      console.error('All fields must be filled before creating a new grade');
      return;
    }

    let body: GradeCreationObject = {
      studentId: this.newGrade.student.id,
      courseId: this.newGrade.course.id,
      subjectId: this.newGrade.subject.id,
      gradeValue: this.newGrade.grade,
    };

    this.gradeService.createGrade(body).subscribe(
      () => {
        this.newGrade = {
          grade: null,
          student: { id: null },
          course: { id: null },
          subject: { id: null },
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAverageGradeByCourse(courseId: number) {
    this.gradeService.getAverageGradeByCourse(courseId).subscribe(
      response => {
        this.averageGradeByCourse = response.average;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAverageGradeByStudent(studentId: number) {
    this.gradeService.getAverageGradeByStudent(studentId).subscribe(
      response => {
        this.averageGradeByStudent = response.average;
      },
      error => {
        console.log(error);
      }
    );
  }
}
