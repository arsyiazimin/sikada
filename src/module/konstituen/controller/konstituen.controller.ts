import { Controller, UseGuards, Post, UseInterceptors, UploadedFiles, Res, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { KonstituenService } from '../service/konstituen.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

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

    @Get('getAllData')
    async getAllData(@Res() res) {
        return await this.konstituenService.getAllData(res)
    }
}
