import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { KandidatEntity } from '../entity/kandidat.entity';
import { KandidatService } from '../service/kandidat.service';

@ApiUseTags('kandidate')
@Controller('kandidat')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class KandidatController {
    constructor(
        private kandidatService : KandidatService
    ){}

    @Post('save')
    async createKandidat(@Body()body , @Res() res){
        return this.kandidatService.createKandidat(body,res);
    }
    @Get('getAll')
    async getAllKelurahan(@Res() res):Promise<KandidatEntity[]>{
        return await this.kandidatService.getAllKandidat(res);
    }

    @Get('getOne/:id')
    async getOneKelurahan(@Param('id')id:number, @Res() res):Promise<KandidatEntity>{
        return await this.kandidatService.getOneKandidat(id,res);
    }

    @Put('update/:id')
    async updateKandidat(@Param('id')id:number, @Body() body, @Res () res):Promise<KandidatEntity>{
        return await this.kandidatService.updateKandidat(id,body,res);
    }

    @Delete('delete/:id')
    async deleteKelurahan(@Param('id')id: number, @Res() res):Promise<KandidatEntity>{
        return await this.kandidatService.deleteKandidat(id,res);
    }
}
