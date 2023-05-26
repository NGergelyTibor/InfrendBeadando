import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = []; // add this line
  selectedCourse?: Course;
  newCourse: Course = new Course({
    id: 0,
    name: '',
    students: [],
    subject: null
  });

  constructor(private courseService: CourseService, private studentService: StudentService ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getStudents();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses.map(c => new Course(c));
    });
  }
  
  getStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students.map(s => new Student(s));
    });
  }

  getCourse(courseId: number): void {
    this.courseService.getCourse(courseId).subscribe(course => {
      this.selectedCourse = course;
    });
  }

  createCourse(): void {
    if (this.newCourse.name) {
      this.courseService.createCourse(this.newCourse).subscribe(course => {
        this.courses.push(new Course(course));
        this.newCourse = new Course({
          id: 0,
          name: '',
          students: [],
          subject: null
        });
      });
    }
  }

  updateCourse(courseId: number): void {
    if (this.selectedCourse && this.selectedCourse.id) {
      this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe(course => {
        const index = this.courses.findIndex(c => c.id === course.id);
        if (index !== -1) {
          this.courses[index] = new Course(course);
        }
      });
    }
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(c => c.id !== courseId);
      this.selectedCourse = undefined;
    });
  }

  addStudentToCourse(courseId: number, studentId: number): void {
    this.courseService.addStudentToCourse(courseId, studentId).subscribe(() => {
      this.getCourse(courseId);
    });
  }

  removeStudentFromCourse(courseId: number, studentId: number): void {
    this.courseService.removeStudentFromCourse(courseId, studentId).subscribe(() => {
      this.getCourse(courseId);
    });
  }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }
}
