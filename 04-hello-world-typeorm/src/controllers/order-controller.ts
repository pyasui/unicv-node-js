import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { User } from '../entities/user';
import { Product } from '../entities/product';
import { Order } from '../entities/order';

export class OrderController {
    static async createOrder(req: Request, res: Response) {
        const { userId, productIds } = req.body;
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const products = await AppDataSource.getRepository(Product).findByIds(productIds);
        if (!products.length) return res.status(404).json({ message: 'Produtos não encontrados' });

        const order = AppDataSource.getRepository(Order).create({ user, products });
        await AppDataSource.getRepository(Order).save(order);
        res.status(201).json(order);
    }
}