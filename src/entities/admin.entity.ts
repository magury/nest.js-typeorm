import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('admin')
export class AdminEntity{
    @PrimaryColumn()
    username:string
    @Column()
    password:string
}