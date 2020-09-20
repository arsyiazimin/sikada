import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DptEntity } from '../../../module/konstituen/entity/dpt.entity';
import { Repository } from 'typeorm';
import { DptV } from '../../../module/konstituen/entity/view/DptV.entity';

@Injectable()
export class RealcountService {
    constructor(
        @InjectRepository(DptEntity) private readonly realcountRepo: Repository<DptEntity>,
        @InjectRepository(DptV) private readonly realRepo: Repository<DptV>,
    ){}

     async realCount() :Promise<any> {
        
        const allData = await this.realcountRepo.count();
        const realcount = allData 
        
    }
}
