import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kecamatan } from '../../../module/konstituen/entity/kecamatan.entity';
import { Repository, getManager } from 'typeorm';
import { async } from 'rxjs';
import { KecamatanListEntity } from 'module/konstituen/entity/view/kecamatan-list.entity';

@Injectable()
export class KecamatanService {
    constructor(
        @InjectRepository(Kecamatan) private readonly kecamatanRepo: Repository<Kecamatan>
        //@InjectRepository(KecamatanListEntity) private readonly kecamatanListRepo: Repository<KecamatanListEntity>

    ) { }

    async createKecamatan(body: any, @Res() res): Promise<Kecamatan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveKec = await this.kecamatanRepo.create(body);

            await queryRunner.manager.save(saveKec).catch(async error => {
                throw new Error(error);
            });
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
            await queryRunner.release();
        }
    }

    async getOneKecamatan(id: number, @Res() res): Promise<Kecamatan> {
        try {
            const data = await this.kecamatanRepo.findOne(id);

            if (data) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: ' Data Found', response: data });
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

    async getAllKecamatan(@Res() res): Promise<Kecamatan[]> {
        try {
            const data = await this.kecamatanRepo.find();
            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        }
    }

    async updateKecamatan(id: number, body: any, @Res() res): Promise<Kecamatan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kecamatanRepo.findOne(id);

            if (data) {
                const saveKec = await this.kecamatanRepo.create(body);

                await queryRunner.manager.save(saveKec).catch(async error => {
                    throw new Error(error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Update Successfully' });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'No data Found' });
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        } finally {
            await queryRunner.release();
        }
    }

    async deleteKecamatan(id: number, @Res() res): Promise<Kecamatan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kecamatanRepo.findOne(id);

            if (data) {
                await queryRunner.manager.remove(data).catch(async error => {
                    throw new Error(error);
                });

                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Data Terhapus' });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'No data Found', response: data });
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        } finally {
            await queryRunner.release();
        }
    }

    async kecamatanList(@Res()res){
        try {
            const data = await getManager()
                .createQueryBuilder(KecamatanListEntity,"kec_list")
                .getMany();
            return res
                .status(HttpStatus.OK)
                .json({message: 'data found', response: data});
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:error})
        }
    }
}
