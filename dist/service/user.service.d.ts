import { Repository } from "typeorm";
import { UserEntity } from "../utility/entities/user.entity";
import { AdditionEntity } from "../utility/entities/addition.entity";
import { PatientEntity } from "../utility/entities/patient.entity";
import { ReportEntity } from "../utility/entities/report.entity";
export declare class UserService {
    private usersRepository;
    private additionsRepository;
    private patienceRepository;
    private reportsRepository;
    constructor(usersRepository: Repository<UserEntity>, additionsRepository: Repository<AdditionEntity>, patienceRepository: Repository<PatientEntity>, reportsRepository: Repository<ReportEntity>);
    getInfo(query: userQuery): Promise<{
        statusCode: number;
        result: PatientEntity[];
    }>;
    getBadList(query: userQuery): Promise<{
        statusCode: number;
        result: PatientEntity[];
    }>;
    Login(query: any): Promise<{
        code: Number;
        result: any;
    } | {
        statusCode: number;
        result: {
            avatarPath: string;
            hospitalId: string;
            depart: string;
            hospitalName: string;
            hospitalLevel: string;
            province: string;
            position: string;
            userId: string;
            author: string;
        };
    }>;
    postPatience(body: updateUser & {
        createdDate: string;
    }): Promise<{
        code: Number;
        result: any;
    } | {
        statusCode: number;
        result: PatientEntity[];
    }>;
    deleteCustomer(query: any): Promise<{
        statusCode: number;
        result: import("typeorm").DeleteResult;
    }>;
    postTalking(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    getRecommend(recommend: string): Promise<{
        code: Number;
        result: any;
    }>;
    postComment(body: experience): Promise<{
        code: Number;
        result: any;
    }>;
    postDefault({ author, depart, password, hospital: { value: hospitalName, level: hospitalId }, username }: {
        author: any;
        depart: any;
        password: any;
        hospital: {
            value: any;
            level: any;
        };
        username: any;
    }): Promise<{
        code: Number;
        result: any;
    }>;
    getDoctors(): Promise<{
        code: Number;
        result: any;
    }>;
    deleteComments({ fileName, index }: {
        fileName: any;
        index: any;
    }): Promise<{
        code: Number;
        result: any;
    }>;
}
