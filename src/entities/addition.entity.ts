import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("addition")
export class AdditionEntity {
    @Column()
    hospitalName: string
    @PrimaryColumn()
    hospitalId: string
    @Column()
    additionDate: string
    @Column()
    hospitalLevel: string
    @Column()
    province: string
    @Column()
    position: string
    @Column()
    infoJsonPath: string
}