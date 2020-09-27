import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { KetuaTim } from 'module/tim-pemenangan/entity/ketua-tim.entity';
import { KetuaTimService } from '../service/ketua-tim.service';

@ApiUseTags('ketua-tim')
@Controller('ketua-tim')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class KetuaTimController {
    constructor(
        private ketuaTimService : KetuaTimService
    ){}
    
    @Post('save')
    async createKetuaTim(@Body()body , @Res() res){
        return this.ketuaTimService.createKetuaTim(body,res);
    }
    @Get('getAll')
    async getAllKetuaTim(@Res() res):Promise<KetuaTim[]>{
        return await this.ketuaTimService.getAllKetuaTim(res);
    }

    @Get('getOne/:id')
    async getOneKetuaTim(@Param('id')id:number, @Res() res):Promise<KetuaTim>{
        return await this.ketuaTimService.getOneKetuaTim(id,res);
    }

    @Put('update/:id')
    async updateKetuaTim(@Param('id')id:number, @Body() body, @Res () res):Promise<KetuaTim>{
        return await this.ketuaTimService.updateKetuaTim(id,body,res);
    }

    @Delete('delete/:id')
    async deleteKetuaTim(@Param('id')id: number, @Res() res):Promise<KetuaTim>{
        return await this.ketuaTimService.deleteKetuaTim(id,res);
    }
}
