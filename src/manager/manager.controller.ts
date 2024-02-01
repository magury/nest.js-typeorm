import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {ResponseInterceptor} from "../user/deal/user.interceptor";
@UseInterceptors(ResponseInterceptor)
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  postManager(@Body() body) {
    return this.managerService.postManager(body);
  }

  @Get()
  findManager(@Query() query) {
    return this.managerService.findManager(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
