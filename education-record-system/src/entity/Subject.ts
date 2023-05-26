import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Course } from "./Course";
import { Teacher } from "./Teacher";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Teacher, teacher => teacher.subjects)
    @JoinTable()
    teachers!: Teacher[];

    @ManyToMany(() => Course, course => course.subject)
    courses!: Course[];



}
