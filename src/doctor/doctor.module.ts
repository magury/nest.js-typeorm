import {Module} from "@nestjs/common";
import {DoctorController} from "./doctor.controller";
import {DoctorService} from "./doctor.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";
import {AdditionEntity} from "../entities/addition.entity";
import {UserEntity} from "../entities/user.entity";
import {FallbackEntity} from "../entities/fallback.entity";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,AdditionEntity,FallbackEntity])],
    controllers:[DoctorController],
    providers:[DoctorService],
    exports:[TypeOrmModule]
})
export class DoctorModule{

}