import { PatientEntity } from "../utility/entities/patient.entity";
import { Repository } from "typeorm";
import { AdditionEntity } from "../utility/entities/addition.entity";
import { UserEntity } from "../utility/entities/user.entity";
export declare class HospitalService {
    private patienceRepository;
    private additionsRepository;
    private usersRepository;
    constructor(patienceRepository: Repository<PatientEntity>, additionsRepository: Repository<AdditionEntity>, usersRepository: Repository<UserEntity>);
    getHospitalList(hospitalName: String): Promise<{
        code: Number;
        result: any;
    }>;
    getJson(hospitalName: string): Promise<{
        code: Number;
        result: any;
    }>;
    getPopularJson(): Promise<{
        code: Number;
        result: any;
    }>;
    putPublicJson(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    putTopicContent(userId: string, title: string, description: string, paragraph: string): Promise<{
        code: Number;
        result: any;
    }>;
    getAll(): Promise<{
        code: Number;
        result: any;
    }>;
    deleteById(id: string): Promise<{
        code: Number;
        result: any;
    }>;
    deleteJson(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    postContent({ onlyKey, nickname, comment }: {
        onlyKey: any;
        nickname: any;
        comment: any;
    }): Promise<{
        code: Number;
        result: any;
    }>;
    getProvince(): Promise<{
        code: Number;
        result: any;
    }>;
    s: any;
    getHospitals(): Promise<{
        code: Number;
        result: any;
    }>;
}
