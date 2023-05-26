import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudent(studentId: number): Observable<Student> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.get<Student>(url);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  updateStudent(studentId: number, student: Student): Observable<Student> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.put<Student>(url, student);
  }

  deleteStudent(studentId: number): Observable<any> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.delete(url);
  }
}
