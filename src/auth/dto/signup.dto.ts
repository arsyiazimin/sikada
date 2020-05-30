import { ApiModelProperty } from '@nestjs/swagger';
import { read } from 'fs';

export class SignupDTO {
    @ApiModelProperty()
    readonly emp_name: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}