import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AnggotaTim } from 'module/tim-pemenangan/entity/anggota-tim.entity';
import { AnggotaTimService } from '../service/anggota-tim.service';
@ApiUseTags('anggota-tim')
@Controller('anggota-tim')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class AnggotaTimController {
    constructor(
        private anggotaTimService : AnggotaTimService
    ){}
    
    @Post('save')
    async createAnggotaTim(@Body()body , @Res() res){
        return this.anggotaTimService.createAnggotaTim(body,res);
    }
    @Get('getAll')
    async getAllAnggotaTim(@Res() res):Promise<AnggotaTim[]>{
        return await this.anggotaTimService.getAllAnggotaTim(res);
    }

    @Get('getOne/:id')
    async getOneAnggotaTim(@Param('id')id:number, @Res() res):Promise<AnggotaTim>{
        return await this.anggotaTimService.getOneAnggotaTim(id,res);
    }

    @Put('update/:id')
    async updateAnggotaTim(@Param('id')id:number, @Body() body, @Res () res):Promise<AnggotaTim>{
        return await this.anggotaTimService.updateAnggotaTim(id,body,res);
    }

    @Delete('delete/:id')
    async deleteAnggotaTim(@Param('id')id: number, @Res() res):Promise<AnggotaTim>{
        return await this.anggotaTimService.deleteAnggotaTim(id,res);
    }
}
