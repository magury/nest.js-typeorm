import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class reportPipe implements PipeTransform {
    transform(value: report, metadata: ArgumentMetadata): any;
}
