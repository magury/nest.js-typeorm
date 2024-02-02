import {
    Body,
    Controller,
    Delete,
    Get, Param, Patch,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import {UploadService} from '../service/upload.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import e from "express";
import {multerConfig, reportConfig} from "../utility/config/multerConfig";
import {reportPipe} from "../utility/pipe/unload.pipe";
import {reportInterceptor} from "../utility/interceptor/upload.interceptor";
@UseInterceptors(reportInterceptor)
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    simple(@UploadedFile() file: Express.Multer.File,@Query() query:User) {
        return this.uploadService.create(file,query);
    }

    @UsePipes(new reportPipe())
    @Post("/report")
    /* 已解决*/@UseInterceptors(FileInterceptor('file', reportConfig))
    postReport(@UploadedFile() file: Express.Multer.File,@Body() body:report){
        return this.uploadService.postReport(file,body)
    }
    @Put("/report")
    @UseInterceptors(FileInterceptor('file', reportConfig))
    /*已更改*/putReport(@UploadedFile() file: Express.Multer.File,@Body() body:report){
        return this.uploadService.putReport(file)
    }
    @Get("/report")
    /*已更改*/getReport(@Query() query:getUnloadReport){
        return this.uploadService.getReport(query)
    }
    @Get('/:hospitalName')
    /*已更改*/getParamReport(@Param("hospitalName") hospitalName:string)
    {
        return this.uploadService.getParamReport(hospitalName)
    }
    @Delete('/report')
    /*已更改*/deleteReport(@Body("uuid") uuid:string){
        return this.uploadService.deleteReport(uuid)
    }

}
