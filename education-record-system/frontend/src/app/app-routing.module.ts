import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CoursesComponent } from './courses/courses.component';
import { GradesComponent } from './grades/grades.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'grades', component: GradesComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
