import { Controller, UseGuards, Post, Body, Res, Get, Param, Put, Delete } from '@nestjs/common';
import { TimPemenanganService } from '../service/tim-pemenangan.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TimPemenangan } from '../../../module/konstituen/entity/tim-pemenangan.entity';

@ApiUseTags('tim-pemenangan')
@Controller('tim-pemenangan')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class TimPemenanganController { 
    constructor(
        private timPemenangan : TimPemenanganService
    ){}

    @Post()
    async createTim(@Body() body, @Res()res ):Promise<TimPemenangan>{
        return await this.timPemenangan.createTim(body,res);
    }

    @Get('getOne/:id')
    async getOneTim(@Param('id') id:number, @Res()res): Promise<TimPemenangan>{
        return await this.timPemenangan.getOneTim(id,res);
    }

    @Get('getAll')
    async getAllTim(): Promise<TimPemenangan[]>{
        return await this.timPemenangan.getAllTim();
    }

    @Put('update/:id')
    async updateTim(@Param('id')id:number, @Body() body, @Res()res ):Promise<TimPemenangan>{
        return await this.timPemenangan.updateTim(id,body,res);
    }

    @Delete('delete/:id')
    async deleteTim(@Param('id')id:number, @Res()res): Promise<TimPemenangan>{
        return await this.timPemenangan.deleteTim(id,res);
    }
}
