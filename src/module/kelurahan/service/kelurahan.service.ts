import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kelurahan } from '../../../module/konstituen/entity/kelurahan.entity';
import { Repository, getManager } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class KelurahanService {
    constructor(
        @InjectRepository(Kelurahan) private readonly kelurahanRepo: Repository<Kelurahan>
    ){}

    async createKelurahan(body:any, @Res() res): Promise<Kelurahan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveKelurahan = await this.kelurahanRepo.create(body);

            await queryRunner.manager.save(saveKelurahan).catch(async error =>{
                throw new Error(error);
            });
            await queryRunner.commitTransaction();
            return res
                .status(HttpStatus.OK)
                .json({message : 'Save Successfully'});
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.OK)
                .json({message: error});
        }finally {
            await queryRunner.release();
        }
    }

    async getOneKelurahan(id:number, @Res() res): Promise<Kelurahan>{
        try {
            const data = await this.kelurahanRepo.findOne(id);

            if(data){
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Data Found',response:data});
            } else{
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No Data Found',response:data});
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        }
    }

    async getAllKelurahan() :Promise<Kelurahan[]>{
        return await this.kelurahanRepo.find();
    }

    async updateKelurahan(id:number, body:any, @Res() res):Promise<Kelurahan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kelurahanRepo.findOne(id);
            if(data){
                const saveKelurahan = await this.kelurahanRepo.create(body);

                await queryRunner.manager.save(saveKelurahan).catch(async error =>{
                    throw new Error(error);
                });
                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Update Successfully'});
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No data Found'});
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        } finally{
            await queryRunner.release();
        }
    }

    async deleteKelurahan(id:number, @Res() res): Promise<Kelurahan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kelurahanRepo.findOne(id);

            if(data){
                await queryRunner.manager.remove(data).catch(async error =>{
                    throw new Error(error);
                });
                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Data Terhapus'});
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({message: 'No data Found', response:data});
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        }finally {
            await queryRunner.release();
        }
    }
}
