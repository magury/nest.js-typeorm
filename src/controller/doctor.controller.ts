import {Body, Controller, Delete, Get, Post, Put, UseInterceptors} from "@nestjs/common";
import {DoctorService} from "../service/doctor.service";
import {DoctorResponse} from "../utility/response/doctor.response";
import {ResponseInterceptor} from "../utility/interceptor/user.interceptor";
@UseInterceptors(DoctorResponse)
@Controller('doctors')
export class DoctorController{
    constructor(private readonly doctorService:DoctorService) {
    }
    @Post('fallback')
    post_fallback(@Body() body){
        return this.doctorService.post_fallback(body)
    }
    @Get('fallback')
    /*已解决*/get_fallback(){
        return this.doctorService.get_fallback()
    }
    @Put('fallback')
    put_fallback(@Body() body){
        return this.doctorService.put_fallback(body)
    }
    @Delete()
    /*已解决*/deleteDoctors(@Body() body) {
        return this.doctorService.deleteDoctors(body)
    }
}