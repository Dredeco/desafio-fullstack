import { Prisma } from "@prisma/client";
import { User } from "src/user/user.model";

export class Task implements Prisma.TaskCreateInput{
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    status: boolean;
    user?: User;
    userId: number;
}