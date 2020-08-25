import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kecamatan } from 'modules/konstituen/entity/kecamatan.entity';
import { Repository, getManager } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class KecamatanService {
    constructor(
        @InjectRepository(Kecamatan) private readonly kecamatanRepo: Repository<Kecamatan>
    ){}
    
    async createKecamatan(body:any, @Res() res):Promise<Kecamatan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveKec = await this.kecamatanRepo.create(body);

            await queryRunner.manager.save(saveKec).catch(async error =>{
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
        }finally{
            await queryRunner.release();
        }
    }

    async getOneKecamatan(id:number, @Res() res):Promise<Kecamatan>{
        try {
            const data = await this.kecamatanRepo.findOne(id);

            if(data){
                return res
                    .status(HttpStatus.OK)
                    .json({message: ' Data Found', response:data});
            }else {
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No data Found', response:data});
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        }
    }

    async getAllKecamatan():Promise<Kecamatan[]>{
        return await this.kecamatanRepo.find();
    }

    async updateKecamatan(id:number, body:any, @Res() res):Promise<Kecamatan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kecamatanRepo.findOne(id);

            if(data){
                const saveKec = await this.kecamatanRepo.create(body);

                await queryRunner.manager.save(saveKec).catch(async error =>{
                    throw new Error(error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message:'Update Successfully'});
            }else {
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No data Found'});
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error});
        }finally{
            await queryRunner.release();
        }
    }

    async deleteKecamatan(id:number, @Res() res): Promise<Kecamatan>{
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await  this.kecamatanRepo.findOne(id);

            if(data){
                await queryRunner.manager.remove(data).catch(async error =>{
                    throw new Error(error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({message: 'Data Terhapus'});
            }else {
                return res
                    .status(HttpStatus.OK)
                    .json({message:'No data Found', response:data});
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
