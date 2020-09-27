import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { KandidatEntity } from '../entity/kandidat.entity';

@Injectable()
export class KandidatService {
    constructor(
        @InjectRepository(KandidatEntity) private readonly kandidatRepo : Repository<KandidatEntity>,
    ){}

    async createKandidat(body: any, @Res() res): Promise<KandidatEntity>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveKandidat = await this.kandidatRepo.create(body);

            await queryRunner.manager.save(saveKandidat).catch(async error =>{
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

    async getAllKandidat(@Res() res) :Promise<KandidatEntity[]>{
        return await this.kandidatRepo.find();
    }

    async getOneKandidat(id:number ,@Res() res ): Promise<KandidatEntity>{
        try {
            const data = await this.kandidatRepo.findOne(id);
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
    async updateKandidat(id:number,body:any, @Res() res) : Promise<KandidatEntity>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kandidatRepo.findOne(id);
            if (data) {
                const updateKandidat = await this.kandidatRepo.create(body);
                await queryRunner.manager.save(updateKandidat).catch(async error=>{
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

    async deleteKandidat(id:number, @Res() res):Promise<KandidatEntity>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kandidatRepo.findOne(id);

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
