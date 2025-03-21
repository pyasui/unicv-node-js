import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { User } from '../entities/user';

export class UserController {
    static async createUser(req: Request, res: Response) {
        const { name, email } = req.body;
        const user = AppDataSource.getRepository(User).create({ name, email });
        await AppDataSource.getRepository(User).save(user);
        res.status(201).json(user);
    }
}
