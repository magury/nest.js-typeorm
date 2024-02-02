import {Controller, Get} from '@nestjs/common';
import {AppService} from '../service/app.service';
import mysql from "mysql2/promise";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
        this.appService = appService
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

}
