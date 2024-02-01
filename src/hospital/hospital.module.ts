import {Module} from "@nestjs/common";
import {HospitalController} from "./hospital.controller";
import {HospitalService} from "./hospital.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AdditionEntity} from "../entities/addition.entity";
import {PatientEntity} from "../entities/patient.entity";
import {ReportEntity} from "../entities/report.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity,AdditionEntity,UserEntity])],
    controllers: [HospitalController],
    providers: [HospitalService],
    exports:[TypeOrmModule]
})
export class HospitalModule {
}