import { DoctorService } from "../service/doctor.service";
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    post_fallback(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    get_fallback(): Promise<{
        code: Number;
        result: any;
    }>;
    put_fallback(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    deleteDoctors(body: any): Promise<{
        code: Number;
        result: any;
    }>;
}
