import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { settingCol } from '../entity/settingColumn.entity';
import { Repository, getManager } from 'typeorm';
import { settingList } from '../entity/settingList.entity';

@Injectable()
export class SettingColumnService {
    constructor(
        @InjectRepository(settingCol) private readonly settingRepo: Repository<settingCol>,
        @InjectRepository(settingList) private readonly settingListRepo: Repository<settingList>,
    ) { }

    async getSettingByType(type: string, user_id: number, @Res() res): Promise<settingCol> {
        try {
            const dataColumn = await getManager()
                .createQueryBuilder(settingCol, "set")
                .where(`LOWER(set.type) = LOWER('${type}')`)
                .getOne()

            // const dataSetting = await this.settingListRepo.findOne({ where: { user_id: user_id, type } })
            const dataSetting = await getManager()
                .createQueryBuilder(settingList, 'list')
                .where(`list.user_id = ${user_id} AND LOWER(list.type) = LOWER('${type}')`)
                .getOne()

            if (dataColumn) {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'data found', response: { data_column: dataColumn, data_setting: dataSetting } });
            } else {
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'no data found', response: { data_column: dataColumn, data_setting: dataSetting } });
            }
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error, response: error });
        }
    }

    async saveSettingList(body: any, @Res() res): Promise<settingList> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.settingListRepo.create(body)

            await queryRunner.manager.save(data).catch(async error => {
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
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }
}
