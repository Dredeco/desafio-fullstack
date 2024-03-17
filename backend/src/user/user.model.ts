import { Prisma } from "@prisma/client";
import { Task } from "src/task/task.model";

export class User implements Prisma.UserCreateInput{
    id: number;
    email: string;
    password: string;
    tasks?: Prisma.TaskCreateNestedManyWithoutUserInput;
}