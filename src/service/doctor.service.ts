import {Injectable} from "@nestjs/common";
import {Result, uuid} from "../common/comon.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../utility/entities/user.entity";
import {Repository} from "typeorm";
import {FallbackEntity} from "../utility/entities/fallback.entity";
import {AdditionEntity} from "../utility/entities/addition.entity";

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        @InjectRepository(FallbackEntity) private fallbacksRepository: Repository<FallbackEntity>,
        @InjectRepository(AdditionEntity) private additionsRepository: Repository<AdditionEntity>,
    ) {
    }

    async post_fallback({userId, hospitalId, errors}) {

        let update = await this.fallbacksRepository.insert({hospitalId, dealStatus: 0, errors, userId, uuid: uuid()})
        if (update) {
            return Result(200)
        } else {
            return Result(500, {error: '网络繁忙，请稍后重试'})
        }
    }

    async get_fallback() {
        let sql = await this.fallbacksRepository
            .query('select a.*,b.author,c.hospitalName ' +
                'from fallback as a,user as b,addition as c ' +
                'where a.userId=b.userId and a.hospitalId=b.hospitalId and b.hospitalId=c.hospitalId')
        return Result(200, sql)
    }

    async put_fallback({userId, hospitalId, uuid}) {
        let update =
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