import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourse(courseId: number): Observable<Course> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.get<Course>(url);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(courseId: number, course: Course): Observable<Course> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.put<Course>(url, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.delete(url);
  }

  addStudentToCourse(courseId: number, studentId: number): Observable<any> {
    const url = `${this.apiUrl}/addstudent/${courseId}/${studentId}`;
    return this.http.post(url, {});
  }

  removeStudentFromCourse(courseId: number, studentId: number): Observable<any> {
    const url = `${this.apiUrl}/removestudent/${courseId}/${studentId}`;
    return this.http.delete(url);
  }
}
