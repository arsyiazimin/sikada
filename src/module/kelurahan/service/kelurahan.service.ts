import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kelurahan } from '../../../module/konstituen/entity/kelurahan.entity';
import { Repository, getManager } from 'typeorm';
import { async } from 'rxjs';
import { KelurahanListEntity } from '../../../module/konstituen/entity/view/kelurahan-list.entity';
import { tKelTps } from '../../../module/konstituen/entity/tpKel.entity';

@Injectable()
export class KelurahanService {
    constructor(
        @InjectRepository(Kelurahan) private readonly kelurahanRepo: Repository<Kelurahan>,
        @InjectRepository(KelurahanListEntity) private readonly kelurahanListRepo: Repository<KelurahanListEntity>

    ) { }

    async createKelurahan(body: any, @Res() res): Promise<Kelurahan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveKelurahan = await this.kelurahanRepo.create(body);

            await queryRunner.manager.save(saveKelurahan).catch(async error => {
                throw new Error(error);
            });
            await queryRunner.commitTransaction();
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Save Successfully' });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.OK)
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }

    async getOneKelurahan(id: number, @Res() res): Promise<Kelurahan> {
        try {
            const data = await this.kelurahanRepo.findOne(id);

            if (data) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Data Found', response: data });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'No Data Found', response: data });
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }

    async getAllKelurahan(@Res() res): Promise<Kelurahan[]> {
        try {
            const data = await this.kelurahanRepo.find();
            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }

    async updateKelurahan(id: number, body: any, @Res() res): Promise<Kelurahan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kelurahanRepo.findOne(id);
            if (data) {
                const saveKelurahan = await this.kelurahanRepo.create(body);

                if (saveKelurahan['status_id'] === 0) {
                    const kelurahan = await getManager()
                        .createQueryBuilder(tKelTps, "t")
                        .where(`t.id_kelurahan = ${id}`)
                        .getMany()

                    await queryRunner.manager.remove(kelurahan).catch(async error => {
                        throw new Error(error);
                    });
                }

                await queryRunner.manager.save(saveKelurahan).catch(async error => {
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
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }

    async deleteKelurahan(id: number, @Res() res): Promise<Kelurahan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.kelurahanRepo.findOne(id);

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
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }

    async kelurahanList(@Res() res) {
        try {
            const data = await this.kelurahanListRepo.find();
            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }
}
