import { UserEntity } from "../utility/entities/user.entity";
import { Repository } from "typeorm";
import { FallbackEntity } from "../utility/entities/fallback.entity";
import { AdditionEntity } from "../utility/entities/addition.entity";
export declare class DoctorService {
    private usersRepository;
    private fallbacksRepository;
    private additionsRepository;
    constructor(usersRepository: Repository<UserEntity>, fallbacksRepository: Repository<FallbackEntity>, additionsRepository: Repository<AdditionEntity>);
    post_fallback({ userId, hospitalId, errors }: {
        userId: any;
        hospitalId: any;
        errors: any;
    }): Promise<{
        code: Number;
        result: any;
    }>;
    get_fallback(): Promise<{
        code: Number;
        result: any;
    }>;
    put_fallback({ userId, hospitalId, uuid }: {
        userId: any;
        hospitalId: any;
        uuid: any;
    }): Promise<{
        code: Number;
        result: any;
    }>;
    deleteDoctors(body: any): Promise<{
        code: Number;
        result: any;
    }>;
}
