import { Injectable} from '@nestjs/common';
import { Result, server, uuid} from "../common/comon.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, Like, Repository} from "typeorm";
import {ReportEntity} from "../utility/entities/report.entity";
import {UserEntity} from "../utility/entities/user.entity";

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(ReportEntity) private reportsRepository: Repository<ReportEntity>,
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ) {
    }

    async create(file: Express.Multer.File, query: User) {
        if (file) {
            const url = `${server}/avatar/${file.filename}`
            const res = await this.usersRepository.update({
                username: query.username,
                password: query.password
            }, {
                avatarPath: url
            })
            if (res.affected)
                return Result(200, {url})
            else {
                return Result(500, {errors: '请稍后上传'})
            }
        }
        return {
            statusCode: 400
        }
    }

    async postReport(file: Express.Multer.File, body: any) {
        const reportPath = file.filename
        body.uuid = uuid()
        body.reportPath = reportPath
        await this.reportsRepository.save(body)
        const result: ReportEntity[] = await this.reportsRepository.findBy({hospitalName: body.hospitalName})
        result.map((item, index) => {
            item.tags = JSON.parse(<string>item.tags)
        })
        return Result(200, result);
    }

    async getReport(query: getUnloadReport) {
        const result = await this.reportsRepository.findBy({
            customer: Like(`%${query.customer}%`),
            customerId: Like(`%${query.customerId}%`),
            createdDate: Between(query.range[0], query.range[1])
        })
        result.map((item) => {
            item.tags = JSON.parse(<string>item.tags)
        })
        return Result(200, result)
    }

    putReport(file: Express.Multer.File) {
        const result = {
            url: `${server}/report/${file.originalname}`
        }
        return Result(200, result);
    }

    async deleteReport(uuid: string) {
        return Result(200, await this.reportsRepository.delete({uuid}))
    }

    async getParamReport(hospitalName: string) {
        const res = await this.reportsRepository.findBy({
            hospitalName
        })
        return Result(200, res)
    }
}
