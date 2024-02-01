import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('fallback')
export class FallbackEntity {
    @Column()
    hospitalId: string
    @Column()
    dealStatus: number
    @Column()
    errors: string
    @Column()
    userId: string
    @PrimaryColumn()
    uuid: string
}