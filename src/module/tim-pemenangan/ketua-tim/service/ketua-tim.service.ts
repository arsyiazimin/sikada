import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KetuaTim } from 'module/tim-pemenangan/entity/ketua-tim.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class KetuaTimService {
    constructor(
        @InjectRepository(KetuaTim) private readonly ketuaTimRepo : Repository<KetuaTim>
    ){}
    async createKetuaTim(body: any, @Res() res): Promise<KetuaTim>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveKetua = await this.ketuaTimRepo.create(body);

            await queryRunner.manager.save(saveKetua).catch(async error =>{
                throw new Error(error);
            });
            await queryRunner.commitTransaction();
            return res
                .status(HttpStatus.OK)
                .json({message :'Save Successfully'});
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: error.message});
        } finally{
            await queryRunner.release();
        }
    }

    async getAllKetuaTim(@Res() res) :Promise<KetuaTim[]>{
        return await this.ketuaTimRepo.find();
    }

    async getOneKetuaTim(id:number ,@Res() res ): Promise<KetuaTim>{
        try {
            const data = await this.ketuaTimRepo.findOne(id);
            if (data) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Data Found', response: data });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Data not Found', response: data });
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
    async updateKetuaTim(id:number,body:any, @Res() res) : Promise<KetuaTim>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.ketuaTimRepo.findOne(id);
            if (data) {
                const updateAnggota = await this.ketuaTimRepo.create(body);
                await queryRunner.manager.save(updateAnggota).catch(async error=>{
                    throw new Error(error);
                });
                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Update Successfully'});
            }
            else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: ' No data Found' });
            }        
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
               .status(HttpStatus.INTERNAL_SERVER_ERROR)
               .json({message:error.message});
        }finally {
            await queryRunner.release();
        }
    }

    async deleteKetuaTim(id:number, @Res() res):Promise<KetuaTim>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.ketuaTimRepo.findOne(id);

            if (data) {
                await queryRunner.manager.remove(data).catch(async error => {
                    throw new Error(error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Data Terhapus' })
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'No data Found', response: data });
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }
}
