import {Module} from "@nestjs/common";
import {HospitalController} from "../controller/hospital.controller";
import {HospitalService} from "../service/hospital.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../utility/entities/user.entity";
import {AdditionEntity} from "../utility/entities/addition.entity";
import {PatientEntity} from "../utility/entities/patient.entity";
import {ReportEntity} from "../utility/entities/report.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PatientEntity,AdditionEntity,UserEntity])],
    controllers: [HospitalController],
    providers: [HospitalService],
    exports:[TypeOrmModule]
})
export class HospitalModule {
}