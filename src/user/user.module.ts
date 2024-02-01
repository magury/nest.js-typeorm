import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AdditionEntity} from "../entities/addition.entity";
import {PatientEntity} from "../entities/patient.entity";
import {ReportEntity} from "../entities/report.entity";
import {AdminEntity} from "../entities/admin.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity,AdditionEntity,PatientEntity,ReportEntity,AdminEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports:[TypeOrmModule]
})
export class UserModule {}
