/**
 * Copyright ⓒ 2022 Sebastian Szafrański - All Rights Reserved
 */
import { IsNotEmpty, IsString } from "class-validator";

export class StatsDto {
    @IsNotEmpty()
    @IsString()
    public ramUsage: string;
    @IsNotEmpty()
    @IsString()
    public cpuUsage: string;
    @IsNotEmpty()
    @IsString()
    public diskUsage: string;
}
