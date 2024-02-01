import {
    Body,
    Controller,
    Delete,
    Get, Param, Post,
    Put,
    Query,
    UseFilters,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {HospitalInterceptor} from "./hospital.interceptor";
import {UploadService} from "../upload/upload.service";
import {HospitalService} from "./hospital.service";
import {publicJsonPipes} from "./hospital.pipes";
import {HospitalGuard} from "./hospital.guard";
import {HttpExceptionFilter} from "./hospital.HttpExceptionFilter";
import {ResponseInterceptor} from "../user/deal/user.interceptor";

@UseInterceptors(HospitalInterceptor)
@Controller("hospitals")
export class HospitalController {
    constructor(private readonly hospitalService: HospitalService) {
    }

    @Get("list")
    /*已解决*/getHospitalList(@Query("hospital") hospital: String) {
        return this.hospitalService.getHospitalList(hospital)
    }

    @Get('/province')
    /*已解决*/getProvince() {
        return this.hospitalService.getProvince()
    }

    @Get("/json")
    /*已解决*/getJson(@Query("hospitalName") hospitalName: string) {
        return this.hospitalService.getJson(hospitalName)
    }

    @Get("/popular")
    /*已解决*/getPopularJson() {
        return this.hospitalService.getPopularJson()
    }


    @UsePipes(new publicJsonPipes())
    @Put("/json")
    /*已解决*/putPublicJson(@Body() body: any) {
        return this.hospitalService.putPublicJson(body)
    }

    @UseFilters(new HttpExceptionFilter())
    @UseGuards(new HospitalGuard())
    @Put('content')
    /*已处理*/putTopicContent(@Body("userId") userId: string, @Body("topic") topic: string, @Body("description") description: string, @Body("content") content: string) {
        return this.hospitalService.putTopicContent(userId, topic, description, content)
    }

    @UseFilters(new HttpExceptionFilter())
    @Post('content')
    /*已处理*/postContent(@Body() body) {
        return this.hospitalService.postContent(body)
    }

    @Get('/all')
    /*已处理*/getAll() {
        return this.hospitalService.getAll()
    }

    @Delete('/:key')
    /*已解决*/deleteById(@Param("key") id: string) {
        return this.hospitalService.deleteById(id)
    }

    @Post('/essays')
    /*已解决*/deleteJson(@Body() body) {
        return this.hospitalService.deleteJson(body)
    }
    @Get()
    /*已处理*/getHospitals() {
        return this.hospitalService.getHospitals()
    }
}
