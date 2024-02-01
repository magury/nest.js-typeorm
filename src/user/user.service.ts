import {Injectable, Query} from '@nestjs/common';
import {execute} from '../common'
import {Response} from "express";
import {DELETE_REPORT, Result, uuid} from "../common/comon.service";
import {writeFile, readFile, readdir, stat} from 'fs/promises';
import * as path from "path";
import {join} from 'path'
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, getManager, Like, Not, Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {AdditionEntity} from "../entities/addition.entity";
import {PatientEntity} from "../entities/patient.entity";
import {ReportEntity} from "../entities/report.entity";
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
                @InjectRepository(AdditionEntity) private additionsRepository: Repository<AdditionEntity>,
                @InjectRepository(PatientEntity) private patienceRepository: Repository<PatientEntity>,
                @InjectRepository(ReportEntity) private reportsRepository: Repository<ReportEntity>,
    ) {
    }

    async getInfo(@Query() query: userQuery) {
        for (let item in query)
            query[item] = `%${query[item]}%`
        const res = await this.patienceRepository.findBy({
            hospitalName: Like(query.hospitalName),
            customerId: Like(query.customerId),
            customer: Like(query.customer)
        })
        return {
            statusCode: 200,
            result: res
        }
    }

    async getBadList(@Query() query: userQuery) {
        for (let item in query)
            query[item] = `%${query[item]}%`
        const res = await this.patienceRepository.find({
            where: {
                cause: Not(''),
                hospitalName: Like(query.hospitalName),
                customerId: Like(query.customerId),
                customer: Like(query.customer)
            }
        })
        return {
            statusCode: 200,
            result: res
        }
    }

    /*已重写*/
    async Login(query) {
        let {username, password, hospital: {key: hospitalId}} = query
        const user = await this.usersRepository.findOne({where: {username, password, hospitalId}})
        if (user) {
            const hospital = await this.additionsRepository.findOneBy({hospitalId})
            return {
                statusCode: 200,
                result: {
                    avatarPath: user.avatarPath,
                    hospitalId: user.hospitalId,
                    depart: user.depart,
                    hospitalName: hospital.hospitalName,
                    hospitalLevel: hospital.hospitalLevel,
                    province: hospital.province,
                    position: hospital.position,
                    userId: user.userId,
                    author: user.author
                }
            }
        } else
            return Result(400)
    }

    async postPatience(body: updateUser & { createdDate: string }) {
        body.uuid = uuid()
        const insert = await this.patienceRepository.insert(body)
        if (insert.raw.affectedRows) {
            return {
                statusCode: 200,
                result: await this.patienceRepository.findBy({hospitalName: body.hospitalName})
            }
        }
        return Result(400)

    }

    async deleteCustomer(query) {
        return {
            statusCode: 200,
            result: await this.patienceRepository.delete(query)
        }
    }


    async postTalking(body: any) {
        const res = await readdir('public/experience')
        const length = res.length
        const previous = (length - 1).toString().padStart(4, '0')
        const current = length.toString().padStart(4, '0')
        const data: any =
            {
                title: body.title,
                htmlContent: body.htmlContent,
                like: 0, dislike: 0, index: "0", comments: []
            }


        if (res.length == 0) {
            // 新建文件
            data.fileName = `exp${previous}.json`
            await writeFile(`public/experience/exp${previous}.json`, JSON.stringify([data]))
        } else {
            const {size} = await stat(join('public/experience', res[length - 1]))
            if (size > 10000000) {
                // 新建文件
                data.fileName = `exp${current}.json`
                await writeFile(`public/experience/exp${current}.json`, JSON.stringify([data]))
            } else {
                // 加入文件
                const result = JSON.parse(await readFile(`public/experience/exp${previous}.json`, 'utf-8'))
                data.fileName = `exp${previous}.json`
                data.index = result.length.toString()
                result[result.length] = data
                await writeFile(`public/experience/exp${previous}.json`, JSON.stringify(result))
            }
        }

        return Result(200)
    }

    async getRecommend(recommend: string) {

        const files = await readdir(join('public', 'experience'))
        let result = []
        for (let file of files) {
            let chats = JSON.parse(await readFile(join('public', 'experience', file), 'utf-8'))
            for (let chat of chats) {
                result.push(chat)
            }
        }
        return Result(200, result)
    }

    async postComment(body: experience) {
        const {fileName, index: _} = body
        const index = parseInt(_)
        const json: experience[] = JSON.parse(await readFile(join('public', 'experience', fileName), 'utf-8'))
        json[index].like = body.like
        json[index].dislike = body.dislike
        json[index].comments = body.comments
        await writeFile(join('public', 'experience', fileName), JSON.stringify(json))
        return Result(200)
    }

    async postDefault({author, depart, password, hospital: {value: hospitalName, level: hospitalId}, username}) {
        let infos = await this.additionsRepository.findOne({where: {hospitalName: hospitalName}})
        if (!infos)
            return Result(400, {error: '该医院不存在'})
        let user = await this.usersRepository.findOne({where: {username, hospitalId}})
        if (user) {
            //     已经注册过了
            return Result(400, {err: `该账号在${hospitalName}已经被注册过了，请更改账号`})
        } else {
            let userId = uuid()
            //     用户存在 可以添加
            let update =
                await this.usersRepository.insert({
                    username, password, userId,
                    avatarPath: null,
                    depart, author,
                    sciencePath: null,
                    hospitalId
                })
            if (update.raw.affectedRows) {
                let res =
                    await this.usersRepository.createQueryBuilder('b').leftJoinAndSelect(AdditionEntity, 'a',
                        'a.hospitalId=b.hospitalId', [' a.hospitalName', 'b.*']).getMany()
                return Result(200, res)
            } else {
                // 系统错误
                return Result(500, {err: '网络繁忙，请稍后重试'})
            }
        }
    }

    async getDoctors() {
        let res: User[] = await this.usersRepository.createQueryBuilder('a').leftJoinAndSelect(AdditionEntity, 'b',
            'a.hospitalId=b.hospitalId', ['a.hospitalName', 'b.*']).getMany()
        return Result(200, res)
    }

    async deleteComments({fileName, index}) {
        const json = JSON.parse(await readFile(`public/experience/${fileName}`, 'utf-8'))
        const res = json.filter((item) => item.index != index)
        await writeFile(`public/experience/${fileName}`, JSON.stringify(res))
        return Result(200)
    }
}