import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:3000/subjects'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Implement the CRUD methods for the Subject entity

  // Get all subjects
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl);
  }

  // Get a subject by ID
  getSubject(subjectId: number): Observable<Subject> {
    const url = `${this.apiUrl}/${subjectId}`;
    return this.http.get<Subject>(url);
  }

  // Create a new subject
  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl, subject);
  }

  // Update a subject
  updateSubject(subjectId: number, subject: Subject): Observable<Subject> {
    const url = `${this.apiUrl}/${subjectId}`;
    return this.http.put<Subject>(url, subject);
  }

  // Delete a subject
  deleteSubject(subjectId: number): Observable<any> {
    const url = `${this.apiUrl}/${subjectId}`;
    return this.http.delete(url);
  }

  // // Add a teacher to a subject
  // addTeacherToSubject(subjectId: number, teacherId: number): Observable<any> {
  //   const url = `${this.apiUrl}/addteacher/${subjectId}/${teacherId}`;
  //   return this.http.post(url, {});
  // }
  // // Remove a teacher from a subject
  // removeTeacherFromSubject(subjectId: number, teacherId: number): Observable<any> {
  //   const url = `${this.apiUrl}/removeteacher/${subjectId}/${teacherId}`;
  //   return this.http.delete(url);
  // }
}
