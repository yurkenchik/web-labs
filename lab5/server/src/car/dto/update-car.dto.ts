import {IsOptional} from "class-validator";

export class UpdateCarDto {
    @IsOptional()
    readonly model: string;
    @IsOptional()
    readonly price: number;
    @IsOptional()
    readonly year: number;
    @IsOptional()
    readonly country: string;
}