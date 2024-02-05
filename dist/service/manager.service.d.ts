import { UpdateManagerDto } from '../dto/manager.dto/update-manager.dto';
import { AdminEntity } from "../utility/entities/admin.entity";
import { Repository } from "typeorm";
import { AdditionEntity } from "../utility/entities/addition.entity";
import { FallbackEntity } from "../utility/entities/fallback.entity";
export declare class ManagerService {
    private managersRepository;
    private additionsRepository;
    private fallbacksRepository;
    constructor(managersRepository: Repository<AdminEntity>, additionsRepository: Repository<AdditionEntity>, fallbacksRepository: Repository<FallbackEntity>);
    postManager(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    findManager(query: any): Promise<{
        code: Number;
        result: any;
    }>;
    findOne(id: number): string;
    update(id: number, updateManagerDto: UpdateManagerDto): string;
    remove(id: number): string;
}
