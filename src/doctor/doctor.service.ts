import {Injectable} from "@nestjs/common";
import {execute} from "../common";
import {Result, uuid} from "../common/comon.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {FallbackEntity} from "../entities/fallback.entity";
import {AdditionEntity} from "../entities/addition.entity";

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        @InjectRepository(FallbackEntity) private fallbacksRepository: Repository<FallbackEntity>,
        @InjectRepository(AdditionEntity) private additionsRepository: Repository<AdditionEntity>,
    ) {
    }

    async post_fallback({userId, hospitalId, errors}) {

        let update =   await this.fallbacksRepository.insert({hospitalId, dealStatus: 0, errors, userId, uuid: uuid()})
        console.log(update.raw.affectedRows)
        if (update) {
            return Result(200)
        } else {
            return Result(500, {error: '网络繁忙，请稍后重试'})
        }
    }

    async get_fallback() {
        let sql = await this.fallbacksRepository.createQueryBuilder('a')
            .leftJoinAndSelect(UserEntity, 'b', 'a.hospitalId=b.hospitalId')
            .leftJoinAndSelect(AdditionEntity, 'c', 'b.hospitalId=c.hospitalId')
            .select(['a.*', 'b.author', 'c.hospitalName']).getRawMany()
        console.log(sql)
        return Result(200, sql)
    }

    async put_fallback({userId, hospitalId, uuid}) {
        let update =
            // await this.fallbacksRepository.createQueryBuilder().update().set({dealStatus:1}).where({hospitalId,uuid}).execute()
            await this.fallbacksRepository.update({hospitalId, uuid}, {dealStatus: 1})
        if (update.affected)
            return Result(200)
        return Result(500)
    }

    async deleteDoctors(body) {
        const {hospitalId, username} = body

        const update = await this.usersRepository.delete({username, hospitalId})
        if (update.affected) {
            const users = await this.usersRepository.find()
            return Result(200, users)
        } else {
            return Result(500, {err: '网络繁忙，请稍后重试'})
        }
    }
}