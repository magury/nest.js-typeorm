import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('patience')
export class PatientEntity {
    @Column()
    customer: String
    @Column()
    hospitalName: String
    @Column()
    hospitalAddress: String
    @Column()
    hospitalLevel: String
    @Column()
    createdDate: String
    @Column()
    times: Number
    @Column()
    tags: String
    @Column()
    cause: String
    @Column()
    customerId: String
    @Column()
    depart: String
    @Column()
    province: String
    @Column()
    prescriptionDrug: String
    @PrimaryColumn()
    uuid:String
}