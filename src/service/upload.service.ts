import {Inject, Injectable, Res} from '@nestjs/common';
import {execute} from "../common";
import * as fs from 'fs';
import {LOCAL_URL, LOCALHOST, Result, SELECT_PATIENCE, SELECT_REPORT, server, uuid} from "../common/comon.service";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../utility/entities/patient.entity";
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
            const url = file.filename
            //  const res = await execute<Update>(`update user set avatarPath=? where username=? and password=?`, [url, query.username, query.password])
            const res = await this.usersRepository.update({
                username: query.username,
                password: query.password
            }, {
                avatarPath: url
            })
            if (res.affected)
                return Result(200, {url: `${server}/avatar/${url}`})
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
            item.reportPath = `${server}/report/${item.reportPath}`
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
            item.reportPath = `${server}/report/${item.reportPath}`
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
        res.map((item) => {
            item.reportPath = `${server}/report/${item.reportPath}`
        })
        return Result(200, res)
    }
}
