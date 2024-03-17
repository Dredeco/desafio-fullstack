import { error } from 'console';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';
import { Response } from 'express';

@Controller('auth')
    export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() user: User, @Res() res: Response): Promise<any> {
        try {
            const userData = await this.authService.validateUser(user.email, user.password);
            return res.status(200).json(userData)
        } catch (error) {
            if (error.message === 'Usuário não cadastrado.') {
                return res.status(404).json({ statusCode: 404, message: error.message });
            } else {
                return res.status(404).json({ statusCode: 404, message: error.message });
            }
        }
    }

}