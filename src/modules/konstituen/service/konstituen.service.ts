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

@Injectable()
export class KonstituenService {

    constructor(
        @InjectRepository(DptEntity) private readonly dptRepo: Repository<DptEntity>,
        @InjectRepository(Kecamatan) private readonly kecamatanRepo: Repository<Kecamatan>,
        @InjectRepository(Kelurahan) private readonly KelurahanRepo: Repository<Kelurahan>,
        @InjectRepository(TpsEntity) private readonly TpsEntityRepo: Repository<TpsEntity>,
        @InjectRepository(tKelTps) private readonly tKelTpsRepo: Repository<tKelTps>,
    ) { }

    __path = 'src';
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
                        const pathprefix = Path.resolve(__dirname, '../../../file/' + moment(new Date()).format('YYYY') + '/data-konstituen/');
                        let folder = 'file/' + moment(new Date()).format('YYYY') + '/data-konstituen/'
                        // let filename = 'Summary-';
                        let prefixname = resFile.filename;
                        let getfiles = [];

                        await Fs.readdirSync(pathprefix).forEach((files) => {
                            if (files.indexOf(prefixname) != -1) {
                                getfiles.push(files)
                            }
                        });

                        let insertdata = [];
                        let original = resFile.filename.split('-');
                        let kec = original[1].toLowerCase();
                        let kel = original[2].split('_');
                        kel = kel[0].toLowerCase() + ' ' + kel[1].toLowerCase();
                        let tps = original[3].split('.')[0].toLowerCase();

                        // const kecamatan = await getManager()
                        //     .createQueryBuilder(Kecamatan, "kec")
                        //     .leftJoinAndMapOne("kec.KELURAHAN", Kelurahan, "kel", "kec.id_kelurahan = kel.id_kelurahan")
                        //     .leftJoinAndMapOne("kel.TPS", TpsEntity, "tps", "kel.id_tps = tps.id_tps")
                        //     .where("LOWER(kec.nama_kecamatan) = :kec", { kec: kec })
                        //     .andWhere("LOWER(kel.nama_kelurahan) = :kel", { kel: kel })
                        //     .andWhere("LOWER(tps.nama_tps) = :tps", { tps: 'tps-' + tps })
                        //     .getOne()
                        const kecamatan = await getManager()
                            .createQueryBuilder(Kecamatan, "kec")
                            .leftJoinAndMapOne("kec.KELURAHAN", Kelurahan, "kel", "kec.id_kecamatan = kel.id_kecamatan")
                            .leftJoin(tKelTps, "keltps", "kel.id_kelurahan = keltps.id_kelurahan")
                            .leftJoinAndMapOne("kel.TPS", TpsEntity, "tps", "keltps.id_tps = tps.id_tps")
                            .where("LOWER(kec.nama_kecamatan) = :kec", { kec: kec })
                            .andWhere("LOWER(kel.nama_kelurahan) = :kel", { kel: kel })
                            .andWhere("LOWER(tps.nama_tps) = :tps", { tps: 'tps-' + tps })
                            .getOne()

                        if (kecamatan) {
                            for (let ind in getfiles) {
                                let path = Path.resolve(this.__path, folder, resFile.filename);
                                console.log(path)
                                await csv({ trim: true }).fromFile(path)
                                    .then((val) => {
                                        insertdata = [...insertdata, ...val]
                                    })
                                    .catch((err) => {
                                        throw new Error(err);
                                    });
                            };
                            console.log(insertdata)
                            unlinkSync(`src/file/${moment(new Date()).format('YYYY')}/data-konstituen/${resFile.filename}`)
                            for (let index = 0; index < insertdata.length; index++) {
                                let data = { ...insertdata[index], id_kecamatan: kecamatan.id_kecamatan }
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
                .json({ message: error.message });
        } finally {
            await queryRunner.release();
        }
    }

    async generateInsert(value, kec, kel, tps) {
        let data;
        console.log('value')
        console.log(value)
        const connection = await getManager().connection;
        const queryRunner = await connection.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            // const kecamatan = this.kecamatanRepo.findOne({ where: `LOWER(nama_kecamatan) = LOWER(${kec}) AND` })
            const kecamatan = await getManager()
                .createQueryBuilder(Kecamatan, "kec")
                .leftJoinAndMapOne("kec.KELURAHAN", Kelurahan, "kel", "kec.id_kelurahan = kel.id_kelurahan")
                .leftJoinAndMapOne("kel.TPS", TpsEntity, "tps", "kel.id_tps = tps.id_tps")
                .where("LOWER(kec.nama_kecamatan) = :kec", { kec: kec })
                .andWhere("LOWER(kel.nama_kelurahan) = :kel", { kel: kel })
                .andWhere("LOWER(tps.nama_tps) = :tps", { tps: 'tps-' + tps })
                .getOne()
            console.log(kecamatan)
            let insertdata = [];
            // insertdata = await this.createSave(value);

            // await queryRunner.manager.save(insertdata).catch(async err => {
            //     throw new Error(err);
            // });

            await queryRunner.commitTransaction();
            data = { 'Message': 'save successfully', result: '', error_bit: false };

        } catch (error) {
            await queryRunner.rollbackTransaction();
            data = { 'Message': 'save error', result: error.message, error_bit: true };
            throw new Error(error);
        } finally {
            await queryRunner.release();
        }

        return data;
    }

    async uploadPath(file) {

        const exacpath: string = 'src/file/';
        let finalpath: string;
        let finalName;

        let dir = moment(new Date()).format('YYYY') + '/data-konstituen/';

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

    async saveDate(filename) {
        let data;
        const pathprefix = Path.resolve(__dirname, '../../../file/data-konstituen/');
        // let filename = 'Summary-';
        let prefixname = filename;
        let getfiles = [];

        return new Promise(async (resolve, reject) => {
            await Fs.readdirSync(pathprefix).forEach((files) => {
                if (files.indexOf(prefixname) != -1) {
                    getfiles.push(files)
                }
            });

            let insertdata = [];
            for (let ind in getfiles) {
                // let filename = prefixname + '-' + ind + '.csv';
                let path = Path.resolve(this.__path, 'file', filename);
                await csv({ trim: true }).fromFile(path)
                    .then((val) => {
                        insertdata = [...insertdata, ...val]
                    })
                    .catch((err) => {
                        console.log('save billing error fetch file')
                        console.log(err)
                    });
            };
            console.log(insertdata)
            // data = await this.helperclass.generateInsert(insertdata);
            if (data.error_bit == false) {
                resolve(data)
            } else {
                reject(data)
            }
        })
    }
}