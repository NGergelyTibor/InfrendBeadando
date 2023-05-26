import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student";
import { Course } from "./Course";
import { Subject } from "./Subject";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    grade!: number;

    @ManyToOne(() => Student, student => student.grades)
    student!: Student;

    @ManyToOne(() => Course)
    course!: Course;

    @ManyToOne(() => Subject)
    subject!: Subject;
}
