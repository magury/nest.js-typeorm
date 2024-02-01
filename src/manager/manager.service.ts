import {Injectable} from '@nestjs/common';
import {CreateManagerDto} from './dto/create-manager.dto';
import {UpdateManagerDto} from './dto/update-manager.dto';
import {Result, uuid} from "../common/comon.service";
import {InjectRepository} from "@nestjs/typeorm";
import {AdminEntity} from "../entities/admin.entity";
import {Repository} from "typeorm";
import {execute} from "../common";
import {AdditionEntity} from "../entities/addition.entity";
import {FallbackEntity} from "../entities/fallback.entity";

@Injectable()
export class ManagerService {
    constructor(@InjectRepository(AdminEntity) private managersRepository: Repository<AdminEntity>,
                @InjectRepository(AdditionEntity) private additionsRepository: Repository<AdditionEntity>,
                @InjectRepository(FallbackEntity) private fallbacksRepository: Repository<FallbackEntity>,
                ) {
    }

    async postManager(body) {
        const {address, level, name, province} = body
        const id = uuid()
        const current = new Date().toLocaleString()
        let additions: AdditionEntity[] =
            await this.additionsRepository.findBy({hospitalName: name})
        if (additions.length > 0)
            return Result(400)
        body = {
            hospitalName: name,
            hospitalId: id,
            hospitalLevel: level,
            province,
            position: address,
            additionDate: current,
            infoJsonPath: null
        }
        let update = await this.additionsRepository.insert(body)
        if (update.raw.affectedRows) {
            let res =
                await this.additionsRepository.find({
                    select: ["hospitalId", "hospitalName", "hospitalLevel", "province", "position"]
                })
            return Result(200, res)
        }

        return Result(400)
    }

    async findManager(query) {
        const res = await this.managersRepository.findOne({where: query})
        if (res) {
            return Result(200, {station: true})
        }
        return Result(400, {station: false})
    }

    findOne(id: number) {
        return `This action returns a #${id} manager`;
    }

    update(id: number, updateManagerDto: UpdateManagerDto) {
        return `This action updates a #${id} manager`;
    }

    remove(id: number) {
        return `This action removes a #${id} manager`;
    }
}
