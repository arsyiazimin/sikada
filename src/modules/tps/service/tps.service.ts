import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TpsEntity } from 'modules/konstituen/entity/tps.entity';
import { Repository, getManager } from 'typeorm';
import { find } from 'lodash';
import { async } from 'rxjs';

@Injectable()
export class TpsService {
    constructor(
        @InjectRepository(TpsEntity) private readonly tpsRepo: Repository<TpsEntity>,
    ) { }

    async createTps(body: any, @Res() res): Promise<TpsEntity> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveTps = await this.tpsRepo.create(body);

            await queryRunner.manager.save(saveTps).catch(async error => {
                throw new Error(error);
            })

            await queryRunner.commitTransaction();
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Save Successfully' });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        } finally {
            await queryRunner.release()
        }
    }

    async getOneTps(id: number, @Res() res): Promise<TpsEntity> {
        try {
            const data = await this.tpsRepo.findOne(id);
            if (data) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Data Found', response: data });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'No data Found', response: data });
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        }
    }

    async getAllTps(): Promise<TpsEntity[]> {
        return await this.tpsRepo.find();
    }

    async updateTps(id: number, body: any, @Res() res): Promise<TpsEntity> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.tpsRepo.findOne(id);
            if (data) {
                const saveTps = await this.tpsRepo.create(body);

                await queryRunner.manager.save(saveTps).catch(async error => {
                    throw new Error(error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Update Successfully' });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'No data Found'});
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteTps(id:number, @Res() res ): Promise<TpsEntity>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.tpsRepo.findOne(id);

            if (data ){
                await queryRunner.manager.remove(data).catch(async error => {
                    throw new Error(error);
                });
                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message: 'Data Terhapus'});
            } else{
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No data Found', response: data});
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res  
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        }
        finally{
            await queryRunner.release();
        }
    }
}
