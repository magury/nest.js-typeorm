import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('report')
export class ReportEntity {
    @PrimaryColumn()
    uuid: string
    @Column()
    customerId: string
    @Column()
    hospitalName: string
    @Column()
    depart: string
    @Column()
    createdDate: string
    @Column()
    tags: string
    @Column()
    customer: string
    @Column()
    reportPath: string
}