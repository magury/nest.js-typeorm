import { Module } from '@nestjs/common';
import { ManagerService } from '../service/manager.service';
import { ManagerController } from '../controller/manager.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../utility/entities/user.entity";
import {AdditionEntity} from "../utility/entities/addition.entity";
import {PatientEntity} from "../utility/entities/patient.entity";
import {ReportEntity} from "../utility/entities/report.entity";
import {AdminEntity} from "../utility/entities/admin.entity";
import {FallbackEntity} from "../utility/entities/fallback.entity";

@Module({
  imports:[TypeOrmModule.forFeature([AdminEntity,AdditionEntity,FallbackEntity])],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports:[TypeOrmModule]
})
export class ManagerModule {}
