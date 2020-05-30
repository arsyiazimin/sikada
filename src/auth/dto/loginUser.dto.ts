import { ApiModelProperty } from '@nestjs/swagger';
import { read } from 'fs';

export class LoginUserDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}