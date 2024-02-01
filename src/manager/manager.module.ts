import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {AdditionEntity} from "../entities/addition.entity";
import {PatientEntity} from "../entities/patient.entity";
import {ReportEntity} from "../entities/report.entity";
import {AdminEntity} from "../entities/admin.entity";
import {FallbackEntity} from "../entities/fallback.entity";

@Module({
  imports:[TypeOrmModule.forFeature([AdminEntity,AdditionEntity,FallbackEntity])],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports:[TypeOrmModule]
})
export class ManagerModule {}
