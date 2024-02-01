import {Inject, Injectable, Res} from '@nestjs/common';
import {execute} from "../common";
import * as fs from 'fs';
import {LOCAL_URL, LOCALHOST, Result, SELECT_PATIENCE, SELECT_REPORT, uuid} from "../common/comon.service";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";
import {Between, Like, Repository} from "typeorm";
import {ReportEntity} from "../entities/report.entity";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(ReportEntity) private reportsRepository: Repository<ReportEntity>,
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ) {
    }

    async create(file: Express.Multer.File, query: User) {
        if (file) {
            const url = `http://localhost:5000/avatar/${file.filename}`
            //  const res = await execute<Update>(`update user set avatarPath=? where username=? and password=?`, [url, query.username, query.password])
            const res = await this.usersRepository.update({
                username: query.username,
                password: query.password
            }, {
                avatarPath: url
            })
            console.log(res)
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
        const reportPath = `${LOCALHOST}/report/${file.filename}`
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
            url: `${LOCAL_URL}/report/${file.originalname}`
        }
        return Result(200, result);
    }

    async deleteReport(uuid: string) {
        return Result(200, await this.reportsRepository.delete({uuid}))
    }

    async getParamReport(hospitalName: string) {
        return Result(200, await this.reportsRepository.findBy({
            hospitalName
        }))
    }
}
