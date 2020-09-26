import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnggotaTim } from 'module/tim-pemenangan/entity/anggota-tim.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class AnggotaTimService {
    constructor(
        @InjectRepository(AnggotaTim) private readonly anggotaTimRepo : Repository<AnggotaTim>
    ){}
    async createAnggotaTim(body: any, @Res() res): Promise<AnggotaTim>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveAnggota = await this.anggotaTimRepo.create(body);

            await queryRunner.manager.save(saveAnggota).catch(async error =>{
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

    async getAllAnggotaTim(@Res() res) :Promise<AnggotaTim[]>{
        return await this.anggotaTimRepo.find();
    }

    async getOneAnggotaTim(id:number ,@Res() res ): Promise<AnggotaTim>{
        try {
            const data = await this.anggotaTimRepo.findOne(id);
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
    async updateAnggotaTim(id:number,body:any, @Res() res) : Promise<AnggotaTim>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.anggotaTimRepo.findOne(id);
            if (data) {
                const updateAnggota = await this.anggotaTimRepo.create(body);
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

    async deleteAnggotaTim(id:number, @Res() res):Promise<AnggotaTim>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.anggotaTimRepo.findOne(id);

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
