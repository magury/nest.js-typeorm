import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../utility/entities/user.entity";
import {AdditionEntity} from "../utility/entities/addition.entity";
import {PatientEntity} from "../utility/entities/patient.entity";
import {ReportEntity} from "../utility/entities/report.entity";
import {AdminEntity} from "../utility/entities/admin.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity,AdditionEntity,PatientEntity,ReportEntity,AdminEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports:[TypeOrmModule]
})
export class UserModule {}
