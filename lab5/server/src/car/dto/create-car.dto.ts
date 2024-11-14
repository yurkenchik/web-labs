import {IsNotEmpty, IsString, IsUrl, Max, Min} from "class-validator";

export class CreateCarDto {
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

    @IsUrl()
    imageUrl: string;
}