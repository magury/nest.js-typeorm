import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors} from '@nestjs/common';
import { ManagerService } from '../service/manager.service';
import { CreateManagerDto } from '../dto/manager.dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/manager.dto/update-manager.dto';
import {ResponseInterceptor} from "../utility/interceptor/user.interceptor";
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
