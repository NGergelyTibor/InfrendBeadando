import { Component, OnInit } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { TeacherService } from '../services/teacher.service';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../model/subject.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  selectedTeacher?: Teacher;
  subjects: Subject[] = [];
  newTeacher: Teacher = new Teacher({
    id: 0,
    name: '',
    department: '',
    subjects: []
  });

  constructor(private teacherService: TeacherService, private subjectService: SubjectService) {}

  ngOnInit() {
    this.getTeachers();
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers.map(s => new Teacher(s));
    });
  }

  getTeacher(teacherId: number): void {
    this.teacherService.getTeacherById(teacherId)
      .subscribe(teacher => this.selectedTeacher = teacher);
  }

  createTeacher(): void {
    if (this.newTeacher) {
      this.teacherService.createTeacher(this.newTeacher)
        .subscribe(teacher => {
          this.teachers.push(new Teacher(teacher));
          this.newTeacher = new Teacher({
            id: 0,
            name: '',
            department: '',
            subjects: []
          });
        });
    }
  }


  updateTeacher(teacherId: number): void {
    if (this.selectedTeacher && this.selectedTeacher.id) {
      this.teacherService.updateTeacher(this.selectedTeacher.id, this.selectedTeacher)
        .subscribe((teacher) => {
          // Update the selected teacher in the teachers array
          const index = this.teachers.findIndex(s => s.id === this.selectedTeacher?.id);
          if (index !== -1) {
            this.teachers[index] = new Teacher(teacher);
          }
        });
    }
  }



  deleteTeacher(teacherId: number): void {
    this.teacherService.deleteTeacher(teacherId)
      .subscribe(() => {
        // Remove the deleted teacher from the teachers array
        this.teachers = this.teachers.filter(teacher => teacher.id !== teacherId);
        this.selectedTeacher = undefined;
      });
  }

  addSubjectToTeacher(teacherId: number, subjectId: number): void {
    this.teacherService.addSubjectToTeacher(teacherId, subjectId)
      .subscribe(() => {
        // Refresh the selected teacher
        this.getTeacher(teacherId);
      });
  }

  removeSubjectFromTeacher(teacherId: number, subjectId: number): void {
    this.teacherService.removeSubjectFromTeacher(teacherId, subjectId)
      .subscribe(() => {
        // Refresh the selected teacher
        this.getTeacher(teacherId);
      });
  }

  onSelect(teacher: Teacher): void {
    this.selectedTeacher = new Teacher(teacher);
  }
  
  getTeacherId(teacher: Teacher): number {
    return teacher ? teacher.id : 0;
  }

}
