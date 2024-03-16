import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { error } from 'console';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new Error('Usuário não cadastrado.');
        }
        if (user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        throw new Error('Senha incorreta.');
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}