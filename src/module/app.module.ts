import {Dependencies, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from '../controller/app.controller';
import {AppService} from '../service/app.service';
import {UserModule} from "./user.module";
import {UploadModule} from './upload.module';
import { UploadController } from '../controller/upload.controller';
import { UploadService } from '../service/upload.service';
import {HospitalModule} from "./hospital.module";
import {HospitalController} from "../controller/hospital.controller";
import {HospitalService} from "../service/hospital.service";
import {DoctorModule} from "./doctor.module";
import {DoctorController} from "../controller/doctor.controller";
import {DoctorService} from "../service/doctor.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "../utility/entities/report.entity";
import {UserEntity} from "../utility/entities/user.entity";
import {AdditionEntity} from "../utility/entities/addition.entity";
import {PatientEntity} from "../utility/entities/patient.entity";
import {DataSource} from "typeorm";
import { ManagerModule } from './manager.module';
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
