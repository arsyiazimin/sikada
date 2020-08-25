import { Controller, UseGuards, Post, Body, Res, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { KecamatanService } from '../service/kecamatan.service';
import { Kecamatan } from 'modules/konstituen/entity/kecamatan.entity';

@ApiUseTags('kecamatan')
@Controller('kecamatan')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class KecamatanController {
    constructor(
        private kecService : KecamatanService,
    ){}

    @Post()
    async createKecamatan(@Body() body, @Res () res):Promise<Kecamatan>{
        return await this.kecService.createKecamatan(body,res);
    }

    @Get('getAll')
    async getAllKecamatan():Promise<Kecamatan[]>{
        return await this.kecService.getAllKecamatan();
    }

    @Get('getOne/:id')
    async getOneKec(@Param('id')id:number, @Res() res):Promise<Kecamatan>{
        return await this.kecService.getOneKecamatan(id,res);
    }

    @Put('update/:id')
    async updateKecamatan(@Param('id')id:number, @Body() body, @Res() res) :Promise<Kecamatan>{
        return await this.kecService.updateKecamatan(id,body,res);
    }

    @Delete('delete/:id')
    async deleteKecamatan(@Param('id')id:number, @Res() res): Promise<Kecamatan>{
        return await this.kecService.deleteKecamatan(id,res);
    }
}
