import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {AdditionEntity} from "./addition.entity";

@Entity("user")
export class UserEntity {
    @Column()
    username: string
    @Column()
    password: string
    @Column()
    avatarPath: string
    @Column()
    hospitalId: string
    @Column()
    depart: string
    @Column()
    author: string
    @PrimaryColumn()
    userId: string
    @Column()
    sciencePath: string
}