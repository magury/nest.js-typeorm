import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    Req,
    Res,
    UploadedFile,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {UserService} from "../service/user.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Response} from "express";
import {ResponseInterceptor} from "../utility/interceptor/user.interceptor";
import {tagsPipe} from "../utility/pipe/user.pipes";
import * as _ from 'lodash'

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get("/login")
    // @UseInterceptors(ResponseInterceptor)
    /*已重写*/ async getUserLogin(@Query() query) {
        return this.userService.Login(query)
    }

    /*患者信息*/
    @Get("/patients")
    /*已处理*/ async getInfo(@Query() query: userQuery) {
        return await this.userService.getInfo(query)
    }

    /*不良患者*/
    @Get("/bad")
    /*已处理*/  getBadList(@Query() query: userQuery) {
        return this.userService.getBadList(query)
    }

    @UsePipes(new tagsPipe())
    @Post("/update")
    /*已重写*/ postPatience(@Body() body: updateUser & { createdDate: string }) {
        return this.userService.postPatience(body)
    }

    @UseInterceptors(ResponseInterceptor)
    @Delete()
    /*已重写*/deleteCustomer(@Query() query) {
        return this.userService.deleteCustomer(query)
    }

    @UseInterceptors(ResponseInterceptor)
    @Post('/experience')
    /*已重写*/postTalking(@Body() body: any) {
        return this.userService.postTalking(body)
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('/experience')
    /*已解决*/getTalking(@Query("type") type: string) {
        if (type == 'recommend')
            return this.userService.getRecommend(type)
    }

    @UseInterceptors(ResponseInterceptor)
    @Post('/comment')
    /*已解决*/postComment(@Body() body: any) {
        return this.userService.postComment(body)
    }

    @UseInterceptors(ResponseInterceptor)
    @Post('/default')
    postDefault(@Body() body) {
        return this.userService.postDefault(body)
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('/doctors')
    /*已处理*/getDoctors() {
        return this.userService.getDoctors()
    }

    @UseInterceptors(ResponseInterceptor)
    @Delete('comments')
    /*已处理*/deleteComments(@Body() body) {
        return this.userService.deleteComments(body)
    }
}