import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getTeacherById(teacherId: number): Observable<Teacher> {
    const url = `${this.apiUrl}/${teacherId}`;
    return this.http.get<Teacher>(url);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  updateTeacher(teacherId: number, teacher: Teacher): Observable<Teacher> {
    const url = `${this.apiUrl}/${teacherId}`;
    return this.http.put<Teacher>(url, teacher);
  }

  deleteTeacher(teacherId: number): Observable<any> {
    const url = `${this.apiUrl}/${teacherId}`;
    return this.http.delete(url);
  }

  addSubjectToTeacher(teacherId: number, subjectId: number): Observable<any> {
    const url = `http://localhost:3000/subjects/addteacher/${subjectId}/${teacherId}`;
    return this.http.post(url, {});
  }

  removeSubjectFromTeacher(teacherId: number, subjectId: number): Observable<any> {
    const url = `http://localhost:3000/subjects/removeteacher/${subjectId}/${teacherId}`;
    return this.http.delete(url);
  }
  
}
