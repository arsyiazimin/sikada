import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { TimPemenangan } from 'modules/konstituen/entity/tim-pemenangan.entity';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { json } from 'express';

@Injectable()
export class TimPemenanganService {
    constructor(
        @InjectRepository(TimPemenangan)private readonly timRepo: Repository<TimPemenangan>
    ){}

    async createTim(body:any, @Res() res): Promise<TimPemenangan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveTim = await this.timRepo.create(body);

            await queryRunner.manager.save(saveTim).catch(async error =>{
                throw new Error(error);
            });

            await queryRunner.commitTransaction();
            return res
                .status(HttpStatus.OK)
                .json({message: 'Save Successfully'});
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: error});
        } finally {
            await queryRunner.release();
        }
    }

    async getOneTim(id:number, @Res() res): Promise<TimPemenangan>{
        try {
            const data = await this.timRepo.findOne(id);

            if(data){
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Data Found', response: data});
            } else{
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Data not Found', response: data});
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        }
    }

    async getAllTim() :Promise<TimPemenangan[]>{
        return await this.timRepo.find();
    }

    async updateTim(id:number, body:any, @Res() res):Promise<TimPemenangan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.timRepo.findOne(id);

            if(data){
                const saveTim = await this.timRepo.create(body);

                await queryRunner.manager.save(saveTim).catch(async error =>{
                    throw new Error(error);
                });
                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json ({message: 'Update Successfully'});
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({message: ' No data Found'});
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        } finally {
            await queryRunner.release();
        }
    }

    async deleteTim(id:number, @Res() res):Promise<TimPemenangan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.timRepo.findOne(id);

            if (data) {
                await queryRunner.manager.remove(data).catch(async error =>{
                    throw new Error (error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message: 'Data Terhapus'})
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No data Found', response:data});
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        } finally {
            await queryRunner.release();
        }
    }

}
