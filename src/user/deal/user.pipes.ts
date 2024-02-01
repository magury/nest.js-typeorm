import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {isChinese} from "../../common/comon.service";

@Injectable()
export class tagsPipe implements PipeTransform<any> {
    transform(value: updateUser & { createdDate: string }, metadata: ArgumentMetadata): any {
        delete value.hospitalId
        delete value.picturePath
        value.createdDate = new Date().toLocaleString()
        const tags: string = <string>value.tags
        let values: string[] = [""]
        for (let tag of tags)
            if (isChinese(tag))
                values[values.length - 1] += tag
            else
                values[values.length] = ""
        value.tags = JSON.stringify(values)
        return value
    }
}