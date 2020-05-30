import { ApiModelProperty } from '@nestjs/swagger';
import { read } from 'fs';

export class HashDto {
    @ApiModelProperty()
    readonly salt: string;

    @ApiModelProperty()
    readonly password: string;
}