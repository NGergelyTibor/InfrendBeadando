import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Course } from "./Course";
import { Grade } from "./Grade";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    department!: string;

    @ManyToMany(() => Course)
    @JoinTable()
    courses!: Course[];

    @OneToMany(() => Grade, grade => grade.student)
    grades!: Grade[];
}
