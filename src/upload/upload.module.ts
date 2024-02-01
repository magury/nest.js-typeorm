import {Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {UploadController} from './upload.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "../entities/report.entity";
import {UserEntity} from "../entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ReportEntity,UserEntity])],
    controllers: [UploadController],
    providers: [UploadService],
    exports:[TypeOrmModule]
})
export class UploadModule {
}
