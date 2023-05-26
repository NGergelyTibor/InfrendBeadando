import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../model/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'http://localhost:3000/grades';

  constructor(private http: HttpClient) {}

  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }  

  createGrade(grade: GradeCreationObject): Observable<Grade> {
    return this.http.post<Grade>(this.apiUrl, grade);
  }
  
  getAverageGradeByCourse(courseId: number): Observable<{ average: number }> {
    const url = `http://localhost:3000/average-grade/course/${courseId}`;
    return this.http.get<{ average: number }>(url);
  }
  
  getAverageGradeByStudent(studentId: number): Observable<{ average: number }> {
    const url = `http://localhost:3000/average-grade/student/${studentId}`;
    return this.http.get<{ average: number }>(url);
  }
}

export interface GradeCreationObject {
  studentId: number;
  courseId: number;
  subjectId: number;
  gradeValue: number;
}