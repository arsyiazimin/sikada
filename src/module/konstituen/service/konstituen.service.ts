import { Injectable, Res, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import * as mkDir from "make-dir";
import * as move from "move-file";
import { unlinkSync, existsSync, mkdirSync, renameSync, mkdir, readFileSync, writeFileSync, copyFileSync, } from 'fs';
import * as md5 from 'md5';
import { async } from 'rxjs';
import { KonstituenHelper } from '../helper/konstituen.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { DptEntity } from '../entity/dpt.entity';
import { Repository, getManager } from 'typeorm';
import { Kecamatan } from '../entity/kecamatan.entity';
import { Kelurahan } from '../entity/kelurahan.entity';
import { TpsEntity } from '../entity/tps.entity';
import { tKelTps } from '../entity/tpKel.entity';
const csv = require('csvtojson');
const Path = require('path');
const Fs = require('fs');
import { RequestContext } from '../../../common/subscriber/RequestContext';
import { DptV } from '../entity/view/DptV.entity';
const capitalize = require('capitalize')

@Injectable()
export class KonstituenService {

    constructor(
        @InjectRepository(DptEntity) private readonly dptRepo: Repository<DptEntity>,
        @InjectRepository(Kecamatan) private readonly kecamatanRepo: Repository<Kecamatan>,
        @InjectRepository(Kelurahan) private readonly KelurahanRepo: Repository<Kelurahan>,
        @InjectRepository(TpsEntity) private readonly TpsEntityRepo: Repository<TpsEntity>,
        @InjectRepository(tKelTps) private readonly tKelTpsRepo: Repository<tKelTps>,
        @InjectRepository(DptV) private readonly DptVRepo: Repository<DptV>,
    ) { }

    __path = 'dist/src';
    // helperclass = new KonstituenHelper();

    async uploadData(file: any, @Res() res): Promise<any> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            console.log(file)
            let fileData = []
            let readyinsertdata = [];
            if (file.length != 0) {
                for (let index = 0; index < file.length; index++) {
                    let resFile = await this.uploadPath(file[index]);
                    if (resFile) {
                        // this.saveDate(resFile.filename)
                        let data;
                        const pathprefix = Path.resolve(this.__path, 'file/' + moment(new Date()).format('YYYY') + '/data-konstituen/');
                        let folder = 'file/' + moment(new Date()).format('YYYY') + '/data-konstituen/'
                        // let filename = 'Summary-';
                        let prefixname = resFile.filename;
                        let getfiles = [];
                        console.log('pathprefix')
                        console.log(pathprefix)
                        await Fs.readdirSync(pathprefix).forEach((files) => {
                            if (files.indexOf(prefixname) != -1) {
                                getfiles.push(files)
                            }
                        });
                        console.log('getfiles')
                        console.log(getfiles)

                        let insertdata = [];
                        let original = resFile.filename.split('-');
                        let kec = original[1].toLowerCase();
                        let kel = original[2].split('_');
                        kel = kel[0].toLowerCase() + ' ' + kel[1].toLowerCase();
                        let tps = original[3].split('.')[0].toLowerCase();

                        const kecamatan = await getManager()
                            .createQueryBuilder(Kecamatan, "kec")
                            .leftJoinAndMapOne("kec.KEL", Kelurahan, "kel", "kec.id_kecamatan = kel.id_kecamatan")
                            .leftJoin(tKelTps, "keltps", "kel.id_kelurahan = keltps.id_kelurahan")
                            .leftJoinAndMapOne("kel.TPS", TpsEntity, "tps", "keltps.id_tps = tps.id_tps")
                            .where("LOWER(kec.nama_kecamatan) = :kec", { kec: kec })
                            .andWhere("LOWER(kel.nama_kelurahan) = :kel", { kel: kel })
                            .andWhere("LOWER(tps.nama_tps) = :tps", { tps: 'tps-' + tps })
                            .getOne()

                        // const kecamatan = await getManager()
                        //     .createQueryBuilder(Kecamatan, "kec")
                        //     .where("LOWER(kec.nama_kecamatan) = :kec", { kec: kec })
                        //     .getOne()

                        // const kelurahan = await getManager()
                        //     .createQueryBuilder(Kelurahan, "kel")
                        //     .where("LOWER(kec.nama_kelurahan) = :kel", { kel: kel })
                        //     .getOne();

                        // const tpss = await getManager()
                        //     .createQueryBuilder(TpsEntity, "tps")
                        //     .andWhere("LOWER(tps.nama_tps) = :tps", { tps: 'tps-' + tps })
                        //     .getOne()
                        console.log(kecamatan)
                        if (kecamatan) {
                            for (let ind in getfiles) {
                                let path = Path.resolve(this.__path, folder, resFile.filename);
                                console.log('path')
                                console.log(path)
                                await csv({ trim: true }).fromFile(path)
                                    .then((val) => {
                                        insertdata = [...insertdata, ...val]
                                    })
                                    .catch((err) => {
                                        throw new Error(err);
                                    });
                            };
                            // console.log(insertdata)
                            unlinkSync(`dist/src/file/${moment(new Date()).format('YYYY')}/data-konstituen/${resFile.filename}`)
                            for (let index = 0; index < insertdata.length; index++) {
                                let data = {
                                    ...insertdata[index],
                                    nama: capitalize.words(insertdata[index].nama),
                                    id_kecamatan: kecamatan.id_kecamatan,
                                    id_kelurahan: kecamatan['KEL'].id_kelurahan,
                                    id_tps: kecamatan['KEL']['TPS'].id_tps,
                                    create_id: RequestContext.currentUser().login_id,
                                    create_date: new Date()
                                }
                                // console.log(data)
                                let dataExisting = await this.dptRepo.findOne({ where: { no_kk: insertdata[index].no_kk, nik: insertdata[index].nik } })
                                if (dataExisting) {
                                    throw new Error(`No KK : ${dataExisting.no_kk} dengan NIK : ${dataExisting.nik} Sudah ada`);
                                } else {
                                    readyinsertdata.push(data)
                                }
                            }

                        } else {
                            return res
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .json({ message: 'No Data Found' });
                        }
                    }
                }

                const dataDPT = await this.dptRepo.create(readyinsertdata)
                await queryRunner.manager.save(dataDPT).catch(async error => {
                    throw new Error(error);
                })

                await queryRunner.commitTransaction();
                // await queryRunner.rollbackTransaction();
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Save Successfully' });
            } else {
                return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'No File' });
            }

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message.message });
        } finally {
            await queryRunner.release();
        }
    }

    async uploadPath(file) {

        const exacpath: string = 'dist/src/file/';
        let finalpath: string;
        let finalName;

        let dir = moment(new Date()).format('YYYY') + '/data-konstituen/';
        // const dir = Path.resolve(__dirname, '../../../file/' + moment(new Date()).format('YYYY') + '/data-konstituen/');

        if (!existsSync(exacpath + dir)) {
            await mkDir(exacpath + dir);
        }
        console.log(file)
        let filext = file.originalname.split('.');

        let oldPath = file.path;
        let filename = md5(file.originalname).substr(0, 10);
        let random = Math.floor(Math.random() * 99);

        // finalName = moment(new Date()).format('YYYYMMDDHHmm') + random + '-' + filename + '.' + filext[filext.length - 1];
        finalName = moment(new Date()).format('YYYYMMDDHHmm') + random + '-' + file.originalname;
        finalpath = exacpath + dir + finalName;
        // console.log(oldPath, finalpath)
        try {
            await move(oldPath, finalpath)
        } catch (error) {
            console.log('error file')
            console.log(error)
            throw new Error(error);
        }

        return { filename: finalName, path: dir };

    }

    async getAllData(@Res() res): Promise<DptV[]> {
        try {
            const data = await this.DptVRepo.find()
            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }

    async filterData(filterVal, @Res() res): Promise<DptV[]> {
        try {
            let where: any = ''
            let where_array = []
            console.log(filterVal)

            if (filterVal.id_kecamatan !== null && filterVal.id_kecamatan.length !== 0) {
                where = `v.id_kecamatan in (${filterVal.id_kecamatan.join(',')})`;
                where_array.push(where)
            }

            if (filterVal.id_kelurahan !== null && filterVal.id_kelurahan.length !== 0) {
                where = `v.id_kelurahan in (${filterVal.id_kelurahan.join(',')})`;
                where_array.push(where)
            }

            if (filterVal.id_tps !== null && filterVal.id_tps.length !== 0) {
                where = `v.id_tps in (${filterVal.id_tps.join(',')})`;
                where_array.push(where)
            }

            if (filterVal.id_tim !== null) {
                where = `v.id_tim in (${filterVal.id_tim})`;
                where_array.push(where)
            }
            
            if (filterVal.nik !== null && filterVal.nik !== '') {
                where = `LOWER(v.nik) like LOWER('%${filterVal.nik}%')`;
                where_array.push(where)
            }

            if (filterVal.nama !== null && filterVal.nama !== '') {
                where = `LOWER(v.nama) like LOWER('%${filterVal.nama}%')`;
                where_array.push(where)
            }

            const data = await getManager()
                .createQueryBuilder(DptV, "v")
                .where(where_array.join(' AND '))
                .getMany()

            return res
                .status(HttpStatus.OK)
                .json({ message: 'data found', response: data });
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message });
        }
    }

    async updateKonstituen(id: number, body: any, @Res() res): Promise<DptEntity> {
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const data = await this.dptRepo.findOne(id);
            if (data) {
                console.log(body)
                console.log(data)
                const saveDpt = await this.dptRepo.create(body);
                console.log(saveDpt)
                await queryRunner.manager.save(saveDpt).catch(async error => {
                    throw new Error(error);
                });
                console.log(saveDpt)

                // await queryRunner.rollbackTransaction();
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
                .json({ message: error.message.message });
        } finally {
            await queryRunner.release();
        }
    }
}
