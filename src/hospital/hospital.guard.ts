import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {execute} from "../common";
import {ForbiddenException} from "./hospital.exception";
import {LOCAL_URL} from "../common/comon.service";

@Injectable()
export class HospitalGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.body
        let result = await execute<User[]>(`select * from user where userId=?`, [userId])
        if (result.length) {
            if (result[0].sciencePath == '') {
                await execute(`insert into user(sciencePath) values(?)`, `${LOCAL_URL}/hospital/${userId}.json`)

            }
            return true

        }

        throw new ForbiddenException();
    }

}