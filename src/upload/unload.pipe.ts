import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {isChinese} from "../common/comon.service";
import {meta} from "eslint-plugin-prettier";

@Injectable()
export class reportPipe implements PipeTransform{
    transform(value: report, metadata: ArgumentMetadata): any {
        const {type}=metadata
       if(type=='custom')
           return value
        const tags: string = <string>value.tags
        let values: string[] = [""]
        for(let tag of tags)
        if (isChinese(tag))
            values[values.length - 1] += tag
        else
            values[values.length] = ""
        value.tags = JSON.stringify(values)
        return value;
    }

}