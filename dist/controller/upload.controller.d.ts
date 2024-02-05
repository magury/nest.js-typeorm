/// <reference types="multer" />
import { UploadService } from '../service/upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    simple(file: Express.Multer.File, query: User): Promise<{
        code: Number;
        result: any;
    } | {
        statusCode: number;
    }>;
    postReport(file: Express.Multer.File, body: report): Promise<{
        code: Number;
        result: any;
    }>;
    putReport(file: Express.Multer.File, body: report): {
        code: Number;
        result: any;
    };
    getReport(query: getUnloadReport): Promise<{
        code: Number;
        result: any;
    }>;
    getParamReport(hospitalName: string): Promise<{
        code: Number;
        result: any;
    }>;
    deleteReport(uuid: string): Promise<{
        code: Number;
        result: any;
    }>;
}
