import { Controller, Get, Res } from '@nestjs/common';
import { RealcountService } from '../service/realcount.service';
import { DptV } from '../../../module/konstituen/entity/view/DptV.entity';

@Controller('realcount')
export class RealcountController {
    constructor(
        private realCountService : RealcountService
    ){}

    @Get('realcount')
    async realCount():Promise<any>{
        console.log("data real count");
        return await this.realCountService.realCount();
    }
}
