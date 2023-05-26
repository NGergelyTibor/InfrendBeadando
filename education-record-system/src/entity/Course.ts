import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Student } from "./Student";
import { Subject } from "./Subject";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Student, student => student.courses)
    @JoinTable()
    students!: Student[];

    @ManyToMany(() => Subject, subject => subject.courses)
    @JoinTable()
    subject!: Subject;
}
