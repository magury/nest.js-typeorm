import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class publicJsonPipes implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        let {onlyKey} = value
        onlyKey = onlyKey.split('_')
        value['fileName']=onlyKey[0]
        return value;
    }

}