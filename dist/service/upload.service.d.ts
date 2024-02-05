/// <reference types="multer" />
import { Repository } from "typeorm";
import { ReportEntity } from "../utility/entities/report.entity";
import { UserEntity } from "../utility/entities/user.entity";
export declare class UploadService {
    private reportsRepository;
    private usersRepository;
    constructor(reportsRepository: Repository<ReportEntity>, usersRepository: Repository<UserEntity>);
    create(file: Express.Multer.File, query: User): Promise<{
        code: Number;
        result: any;
    } | {
        statusCode: number;
    }>;
    postReport(file: Express.Multer.File, body: any): Promise<{
        code: Number;
        result: any;
    }>;
    getReport(query: getUnloadReport): Promise<{
        code: Number;
        result: any;
    }>;
    putReport(file: Express.Multer.File): {
        code: Number;
        result: any;
    };
    deleteReport(uuid: string): Promise<{
        code: Number;
        result: any;
    }>;
    getParamReport(hospitalName: string): Promise<{
        code: Number;
        result: any;
    }>;
}
