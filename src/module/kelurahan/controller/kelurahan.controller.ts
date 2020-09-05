import { Controller, UseGuards, Post, Body, Res, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { KelurahanService } from '../service/kelurahan.service';
import { Kelurahan } from '../../../module/konstituen/entity/kelurahan.entity';

@ApiUseTags('kelurahan')
@Controller('kelurahan')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class KelurahanController {
    constructor (
        private kelService : KelurahanService
    ){}

    @Post()
    async createKelurahan(@Body()body, @Res() res):Promise<Kelurahan>{
        return await this.kelService.createKelurahan(body,res);
    }

    @Get('getAll')
    async getAllKelurahan(@Res() res):Promise<Kelurahan[]>{
        return await this.kelService.getAllKelurahan(res);
    }

    @Get('getOne/:id')
    async getOneKelurahan(@Param('id')id:number, @Res() res):Promise<Kelurahan>{
        return await this.kelService.getOneKelurahan(id,res);
    }

    @Put('update/:id')
    async updateKelurahan(@Param('id')id:number, @Body() body, @Res () res):Promise<Kelurahan>{
        return await this.kelService.updateKelurahan(id,body,res);
    }

    @Delete('delete/:id')
    async deleteKelurahan(@Param('id')id: number, @Res() res):Promise<Kelurahan>{
        return await this.kelService.deleteKelurahan(id,res);
    }

    @Get('kelurahanlist')
    async kelurahanList(@Res() res ){
        return await this.kelService.kelurahanList(res);
    }
}
