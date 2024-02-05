import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class tagsPipe implements PipeTransform<any> {
    transform(value: updateUser & {
        createdDate: string;
    }, metadata: ArgumentMetadata): any;
}
