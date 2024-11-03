import {IsNotEmpty, IsString, Max, Min} from "class-validator";

export class UpdateCarDto {
    @IsNotEmpty()
    @IsString()
    readonly model: string;

    @IsNotEmpty()
    @Min(0)
    readonly price: number;

    @IsNotEmpty()
    @Min(2000)
    @Max(new Date().getTime())
    readonly year: number;

    readonly country: string;
}