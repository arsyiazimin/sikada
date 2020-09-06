import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TpsEntity } from '../../../module/konstituen/entity/tps.entity';
import { Repository, getManager } from 'typeorm';
import { find } from 'lodash';
import { async } from 'rxjs';
import { tKelTps } from 'module/konstituen/entity/tpKel.entity';
import { Kelurahan } from 'module/konstituen/entity/kelurahan.entity';
import e from 'express';

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
                const kelurahan = await getManager()
                    .createQueryBuilder(tKelTps, "t")
                    .select("t.id as id")
                    .addSelect("t.id_kelurahan as id_kelurahan")
                    .addSelect("kel.nama_kelurahan as nama_kelurahan")
                    .addSelect("t.id_tps as id_tps")
                    .leftJoin(Kelurahan, "kel", "t.id_kelurahan = kel.id_kelurahan")
                    .where(`t.id_tps = ${id}`)
                    .getRawMany()

                data.T_KEL_TPS = await kelurahan
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

    async getAllTps(@Res() res): Promise<TpsEntity[]> {
        try {
            const data = await this.tpsRepo.find({ where: { status_id: 1 } });
            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        }
    }

    async updateTps(id: number, body: any, @Res() res): Promise<TpsEntity> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();
        let rm = []

        await queryRunner.startTransaction();
        try {
            const data = await this.tpsRepo.findOne(id);
            if (data) {
                const saveTps = await this.tpsRepo.create(body);

                const kelurahan = await getManager()
                    .createQueryBuilder(tKelTps, "t")
                    .where(`t.id_tps = ${id}`)
                    .getMany()

                data.T_KEL_TPS = await kelurahan

                data.T_KEL_TPS.forEach(v => {
                    console.log(body.T_KEL_TPS.map(el => el.id).indexOf(v.id))
                    if (body.T_KEL_TPS.map(el => el.id).indexOf(v.id) === -1) {
                        rm.push(v)
                    }
                })

                if (rm.length !== 0) {
                    await queryRunner.manager.remove(rm).catch(async error => {
                        throw new Error(error);
                    });
                }

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
                    .json({ message: 'No data Found' });
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
    async deleteTps(id: number, @Res() res): Promise<TpsEntity> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.tpsRepo.findOne(id);

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
        }
        finally {
            await queryRunner.release();
        }
    }
}
