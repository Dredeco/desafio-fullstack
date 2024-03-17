import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('api/task')
export class TaskController {
    constructor(private readonly userService: TaskService) {}

    @Get()
    async findAll():Promise<Task[]> {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() data: Task) {
        return this.userService.create(data);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Task) {
        return this.userService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(+id);
    }
}