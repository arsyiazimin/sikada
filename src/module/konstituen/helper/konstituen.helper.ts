import { getManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DptEntity } from "../entity/dpt.entity";
import { Kecamatan } from "../entity/kecamatan.entity";
import { Kelurahan } from "../entity/kelurahan.entity";
import { TpsEntity } from "../entity/tps.entity";
import { tKelTps } from "../entity/tpKel.entity";

const Path = require('path')
const Fs = require('fs');

export class KonstituenHelper {

    constructor(
        @InjectRepository(DptEntity) private readonly dptRepo: Repository<DptEntity>,
        @InjectRepository(Kecamatan) private readonly kecamatanRepo: Repository<Kecamatan>,
        @InjectRepository(Kelurahan) private readonly KelurahanRepo: Repository<Kelurahan>,
        @InjectRepository(TpsEntity) private readonly TpsEntityRepo: Repository<TpsEntity>,
        @InjectRepository(tKelTps) private readonly tKelTpsRepo: Repository<tKelTps>,
    ) { }

    
}