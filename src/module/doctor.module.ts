import {Module} from "@nestjs/common";
import {DoctorController} from "../controller/doctor.controller";
import {DoctorService} from "../service/doctor.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PatientEntity} from "../utility/entities/patient.entity";
import {AdditionEntity} from "../utility/entities/addition.entity";
import {UserEntity} from "../utility/entities/user.entity";
import {FallbackEntity} from "../utility/entities/fallback.entity";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,AdditionEntity,FallbackEntity])],
    controllers:[DoctorController],
    providers:[DoctorService],
    exports:[TypeOrmModule]
})
export class DoctorModule{

}