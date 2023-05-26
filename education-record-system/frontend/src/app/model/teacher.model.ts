import { Subject } from './subject.model';

export class Teacher {
  id: number;
  name: string;
  department: string;
  subjects: Subject[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.department = data.department;
    this.subjects = data.subjects || [];
  }
}
