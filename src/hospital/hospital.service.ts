import {Injectable} from "@nestjs/common";
import {LOCAL_URL, Result} from "../common/comon.service";
import {execute} from "../common";
import * as fs from "fs";
import {writeFile, readFile} from 'fs/promises';
import {stringify} from "ts-jest";
import {InjectRepository} from "@nestjs/typeorm";
import {PatientEntity} from "../entities/patient.entity";
import {Like, Not, Repository} from "typeorm";
import {AdditionEntity} from "../entities/addition.entity";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class HospitalService {
    constructor(@InjectRepository(PatientEntity) private patienceRepository: Repository<PatientEntity>,
                @InjectRepository(AdditionEntity) private additionsRepository: Repository<AdditionEntity>,
                @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ) {
    }

    async getHospitalList(hospitalName: String) {
        return {
            statusCode: 200,
            result: await this.additionsRepository.findBy({
                hospitalName: Like(`%${hospitalName}%`)
            })
        }
    }

    async getJson(hospitalName: string) {
        // 管理员和普通人
        if (hospitalName) {
            let result = await this.additionsRepository.findBy({hospitalName})
            return Result(200, result)
        }
        let result = await
            this.additionsRepository.query('select a.hospitalName,b.* from addition as a,user as b  where a.hospitalId=b.hospitalId')
        return Result(200, result)
    }

    async getPopularJson() {
        let result =
            await this.usersRepository.find({
                select: ["sciencePath"],
                where: {
                    sciencePath: Not('')
                }
            })
        let res = result.map((item) => item.sciencePath)
        return Result(200, res)
    }

    async putPublicJson(body: any) {
        console.log(body);
        const {onlyKey} = body
        if (onlyKey == "")
            return Result(200, null)
        let unique = await fetch(`${LOCAL_URL}/hospital/${body['fileName']}.json`).then((res) => res.json())
        for (let i = 0; i < unique.length; i++) {
            for (let j = 0; j < body['data'].length; j++) {
                if (unique[i]['onlyKey'] == body['data'][j]['onlyKey'])
                    unique[i] = body['data'][j]
            }
        }
        let data = JSON.stringify(unique, undefined, 4);
        await writeFile(`public/json/${body['fileName']}.json`, data)
        return Result(200, null)
    }

    async putTopicContent(userId: string, title: string, description: string, paragraph: string) {

        let user = await this.usersRepository.findOne({where: {userId}})
        if (!fs.existsSync(`public/json/${userId}.json`)) {
            fs.writeFileSync(`public/json/${userId}.json`, '[]')
        }
        const unique = JSON.parse(await readFile(`public/json/${userId}.json`, 'utf-8'))
        const current = new Date()
        unique.push({
            onlyKey: `${userId}_${(unique.length + 1).toString().padStart(4, '0')}`,
            avatarPath: user.avatarPath,
            author: user.author,
            title: title,
            description: description,
            descriptionPath: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            publicDate: `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`,
            like: 0, dislike: 0, paragraph: paragraph.split(/\r\n|\n\r|[\n\r]/), comment: []

        })
        await writeFile(`public/json/${userId}.json`, JSON.stringify(unique))
        return Result(200, {
            path: `${LOCAL_URL}/hospital/${userId}.json`
        })
    }

    async getAll() {
        const res =
            await this.additionsRepository.find({
                select: ["hospitalId", "hospitalName", "hospitalLevel", "province", "position"]
            })
        return Result(200, res)
    }

    async deleteById(id: string) {
        const update = await this.additionsRepository.delete({hospitalId: id})
        if (update.affected) {
            const hospitals = await this.additionsRepository.find()
            return Result(200, hospitals)
        }
    }

    async deleteJson(body) {
        const {userId, onlyKey} = body
        const json = JSON.parse(await readFile(`public/json/${userId}.json`, 'utf-8'))
        const data = json.filter((item) => item.onlyKey != onlyKey)
        await writeFile(`public/json/${userId}.json`, JSON.stringify(data))
        return Result(200,{a:1})
    }

    async postContent({onlyKey, nickname, comment}) {
        const fileName = onlyKey.split('_')[0]
        const jsons = JSON.parse(await readFile(`public/json/${fileName}.json`, 'utf-8'))
        const date = new Date()
        for (let json of jsons) {
            if (json.onlyKey == onlyKey) {
                json.comments.push({
                    index: stringify(json.comments.length),
                    nickname, comment,
                    commentDate: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
                })
                await writeFile(`public/json/${fileName}.json`, JSON.stringify(jsons))
                return Result(200, json.comments)
            }

        }
        return Result(400)

    }

    async getProvince() {
        let res = await this.additionsRepository.find({
            select: ["province"]
        })
        return Result(200, res.map((item: any) => (item.province)))
    }

    s

    async getHospitals() {
        const res =
            await this.additionsRepository.find({
                select: ["hospitalName", "hospitalId"]
            })
        return Result(200, res)
    }
}
