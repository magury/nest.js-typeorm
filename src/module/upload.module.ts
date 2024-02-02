import {Module} from '@nestjs/common';
import {UploadService} from '../service/upload.service';
import {UploadController} from '../controller/upload.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "../utility/entities/report.entity";
import {UserEntity} from "../utility/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ReportEntity,UserEntity])],
    controllers: [UploadController],
    providers: [UploadService],
    exports:[TypeOrmModule]
})
export class UploadModule {
}
