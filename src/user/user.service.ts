import { PrismaService } from "src/prisma/prisma.service";
import { User } from "./user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async findOneByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: any) {
        return await this.prisma.user.create({ data });
    }

    async update(id: number, data: any) {
        return await this.prisma.user.update({ where: { id }, data });
    }

    async remove(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }
}