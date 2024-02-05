import { HospitalService } from "../service/hospital.service";
export declare class HospitalController {
    private readonly hospitalService;
    constructor(hospitalService: HospitalService);
    getHospitalList(hospital: String): Promise<{
        code: Number;
        result: any;
    }>;
    getProvince(): Promise<{
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
    putTopicContent(userId: string, topic: string, description: string, content: string): Promise<{
        code: Number;
        result: any;
    }>;
    postContent(body: any): Promise<{
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
    getHospitals(): Promise<{
        code: Number;
        result: any;
    }>;
}
