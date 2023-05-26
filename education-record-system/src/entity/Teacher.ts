import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Course } from "./Course";
import { Subject } from "./Subject";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    department!: string;

    @ManyToMany(() => Subject, subject => subject.teachers)
    subjects!: Subject[];
}
