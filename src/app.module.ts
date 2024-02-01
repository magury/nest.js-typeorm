import {Dependencies, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./user/user.module";
import {UploadModule} from './upload/upload.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import {HospitalModule} from "./hospital/hospital.module";
import {HospitalController} from "./hospital/hospital.controller";
import {HospitalService} from "./hospital/hospital.service";
import {DoctorModule} from "./doctor/doctor.module";
import {DoctorController} from "./doctor/doctor.controller";
import {DoctorService} from "./doctor/doctor.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "./entities/report.entity";
import {UserEntity} from "./entities/user.entity";
import {AdditionEntity} from "./entities/addition.entity";
import {PatientEntity} from "./entities/patient.entity";
import {DataSource} from "typeorm";
import { ManagerModule } from './manager/manager.module';
@Dependencies(DataSource)
@Module({
    imports: [UploadModule,UserModule,HospitalModule,DoctorModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'suse',
            autoLoadEntities: true,
            // synchronize: true,
        }),
        ManagerModule,
        ],
    controllers: [AppController,UploadController,HospitalController,DoctorController],
    providers: [AppService,UploadService,HospitalService,DoctorService],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer): any {
        // consumer.apply(UserTagsMiddleware).forRoutes("/update/user")
        // consumer.apply(HospitalMiddleware).forRoutes("/hospital/topic/content")
    }

}
