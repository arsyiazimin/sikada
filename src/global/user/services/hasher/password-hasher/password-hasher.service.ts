import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as md5 from 'md5';

@Injectable()
export class PasswordHasherService {
    async hasPassword(password: string) {
        // const bcryptHash = bcrypt.hash(password, 10);
        const bcryptHash = await this.hasPasswordBcrypt(password);
        let dataPassword = {
            LOGIN_PASS: await md5(bcryptHash + md5(md5(bcryptHash + password))),
            SPASS: bcryptHash
        }
        return dataPassword;
    }

    async hasPasswordBcrypt(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async compareHash(
        password: string | undefined,
        hash: string | undefined,
        salt: string | undefined,
    ): Promise<boolean> {
        if (await this.compareBcrypt(password, salt)) {
            const encodePass = md5(salt + md5(md5(salt + password)));
            if (encodePass === hash) {
                return true;
            } else {
                return false;
            }
        } else {
            return false
        }
    }
    async compareBcrypt(password, encrypted): Promise<boolean> {
        return await bcrypt.compare(password, encrypted)
    }
}
