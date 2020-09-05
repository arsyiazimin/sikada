import { Controller, UseGuards, Post, UseInterceptors, UploadedFiles, Res, Put, Param, Body, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { KonstituenService } from '../service/konstituen.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { DptEntity } from '../entity/dpt.entity';

@ApiUseTags('Konstituen')
@Controller('konstituen')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class KonstituenController {
    constructor(
        private konstituenService: KonstituenService
    ) { }

    @Post('uploadData')
    @UseInterceptors(FilesInterceptor('file', 100, {
        storage: diskStorage({
            filename: (req, file, cb) => {
                let name = file.originalname.split('.').slice(0, -1)
                const randomName = `${name}`
                return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async uploadData(@UploadedFiles() file, @Res() res) {
        return this.konstituenService.uploadData(file, res)
    }

    @Post('filterKonstituen')
    async filter(@Body() body, @Res() res) {
        return await this.konstituenService.filterData(body, res)
    }

    @Put('update/:id')
    async updateKonstituen(@Param('id') id: number, @Body() body, @Res() res): Promise<DptEntity> {
        return await this.konstituenService.updateKonstituen(id, body, res);
    }

    @Get('getAllData')
    async getAllData(@Res() res) {
        return await this.konstituenService.getAllData(res)
    }
}
