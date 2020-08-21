import { Controller, Get, Param, Res, UseGuards, Post, Body } from '@nestjs/common';
import { SettingColumnService } from '../service/setting-column.service';
import { ApiImplicitParam, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Setting Column')
@Controller('setting-column')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class SettingColumnController {
    constructor(
        private seetingService: SettingColumnService
    ) { }

    @Get('getByType/:user_id/:type')
    @ApiImplicitParam({ name: 'user_id' })
    @ApiImplicitParam({ name: 'type' })
    async getByType(@Param('type') type: string, @Param('user_id') user_id: number, @Res() res) {
        return await this.seetingService.getSettingByType(type, user_id, res)
    }

    @Post('saveSettingList')
    async saveSettingList(@Body() Body, @Res() res) {
        return await this.seetingService.saveSettingList(Body, res)
    }
}
