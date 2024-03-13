import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Task[]> {
        return await this.prisma.task.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.task.findUnique({ where: { id } });
    }

    async create(data: any) {
        return await this.prisma.task.create({ data });
    }

    async update(id: number, data: any) {
        return await this.prisma.task.update({ where: { id }, data });
    }

    async remove(id: number) {
        return await this.prisma.task.delete({ where: { id } });
    }
}