import { ManagerService } from '../service/manager.service';
import { UpdateManagerDto } from '../dto/manager.dto/update-manager.dto';
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    postManager(body: any): Promise<{
        code: Number;
        result: any;
    }>;
    findManager(query: any): Promise<{
        code: Number;
        result: any;
    }>;
    findOne(id: string): string;
    update(id: string, updateManagerDto: UpdateManagerDto): string;
    remove(id: string): string;
}
