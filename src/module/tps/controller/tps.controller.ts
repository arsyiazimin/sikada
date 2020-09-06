import { Controller, Post, Body, Res, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { TpsService } from '../service/tps.service';
import { TpsEntity } from '../../../module/konstituen/entity/tps.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('tps')
@Controller('tps')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TpsController {
    constructor (
        private tpsService : TpsService
    ){}

    
    @Post('save')
    async createTps(@Body() body, @Res() res ) : Promise<TpsEntity>{
        return await this.tpsService.createTps(body,res);
    }
    
    @Get('getAll')
    async getAllTps(@Res() res): Promise<TpsEntity[]>{
        return await this.tpsService.getAllTps(res);
    }

    @Get('getOne/:id')
    async getOneId(@Param('id')id: number, @Res() res): Promise<TpsEntity> {
        return await this.tpsService.getOneTps(id,res);
    }


    @Put('update/:id')
    async updateTps(@Param('id')id:number,@Body()body, @Res() res) : Promise<TpsEntity
    >{
        return await this.tpsService.updateTps(id,body,res);
    }

    @Delete('delete/:id')
    async deleteTps(@Param('id')id:number, @Res() res):Promise<TpsEntity>{
        return await this.tpsService.deleteTps(id,res);
    }
}
