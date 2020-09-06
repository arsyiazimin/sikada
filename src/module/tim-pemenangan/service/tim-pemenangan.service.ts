import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { TimPemenangan } from '../../../module/konstituen/entity/tim-pemenangan.entity';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { timList } from '../entity/timList.entity';
import { DptEntity } from 'module/konstituen/entity/dpt.entity';

@Injectable()
export class TimPemenanganService {
    constructor(
        @InjectRepository(TimPemenangan) private readonly timRepo: Repository<TimPemenangan>,
        @InjectRepository(timList) private readonly timListRepo: Repository<timList>,
        @InjectRepository(DptEntity) private readonly DptEntityRepo: Repository<DptEntity>,
    ) { }

    async createTim(body: any, @Res() res): Promise<TimPemenangan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const saveTim = await this.timRepo.create(body);

            await queryRunner.manager.save(saveTim).catch(async error => {
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
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }

    async getOneTim(id: number, @Res() res): Promise<TimPemenangan> {
        try {
            const data = await this.timRepo.findOne(id);

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
                .json({ message: error });
        }
    }

    async getAllTim(): Promise<TimPemenangan[]> {
        return await this.timRepo.find();
    }

    async timList(@Res() res) {
        try {
            const data = await this.timListRepo.find({ where: { status_id: 1 } });
            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error });
        }
    }

    async updateTim(id: number, body: any, @Res() res): Promise<TimPemenangan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();
        let updateDPT = []

        await queryRunner.startTransaction();
        try {
            const data = await this.timRepo.findOne(id);

            if (data) {
                const saveTim = await this.timRepo.create(body);

                if (saveTim['status_id'] === 0) {
                    const dpt = await getManager()
                        .createQueryBuilder(DptEntity, 'dpt')
                        .where(`dpt.id_tim = ${id}`)
                        .getMany();

                    for (let index = 0; index < dpt.length; index++) {
                        updateDPT.push({
                            ...dpt[index],
                            anggota_bit: 0,
                            id_tim: null
                        })
                    }
                    if (updateDPT.length !== 0) {
                        let dataDPT = await this.DptEntityRepo.create(updateDPT)

                        console.log(dataDPT)

                        await queryRunner.manager.save(dataDPT).catch(async error => {
                            throw new Error(error);
                        });
                    }
                }

                await queryRunner.manager.save(saveTim).catch(async error => {
                    throw new Error(error);
                });
                await queryRunner.commitTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Update Successfully' });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: ' No data Found' });
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

    async deleteTim(id: number, @Res() res): Promise<TimPemenangan> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.timRepo.findOne(id);

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
                .json({ message: error });
        } finally {
            await queryRunner.release();
        }
    }

}
