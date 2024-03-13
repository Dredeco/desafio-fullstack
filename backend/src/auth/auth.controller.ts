import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';

@Controller('auth')
    export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() user: User): Promise<any> {
        return this.authService.validateUser(user.email, user.password);
    }
}