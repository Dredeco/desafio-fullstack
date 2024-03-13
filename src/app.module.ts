import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, TaskModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}