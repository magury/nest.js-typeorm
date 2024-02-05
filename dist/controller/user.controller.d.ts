import { UserService } from "../service/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserLogin(query: any): Promise<{
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
    getInfo(query: userQuery): Promise<{
        statusCode: number;
        result: import("../utility/entities/patient.entity").PatientEntity[];
    }>;
    getBadList(query: userQuery): Promise<{
        statusCode: number;
        result: import("../utility/entities/patient.entity").PatientEntity[];
    }>;
    postPatience(body: updateUser & {
        createdDate: string;
    }): Promise<{
        code: Number;
        result: any;
    } | {
        statusCode: number;
        result: import("../utility/entities/patient.entity").PatientEntity[];
    }>;
    deleteCustomer(query: any): Promise<{
        statusCode: number;
        result: import("typeorm").DeleteResult;
    }>;
    postTalking(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    getTalking(type: string): Promise<{
        code: Number;
        result: any;
    }>;
    postComment(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    postDefault(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    getDoctors(): Promise<{
        code: Number;
        result: any;
    }>;
    deleteComments(body: any): Promise<{
        code: Number;
        result: any;
    }>;
}
