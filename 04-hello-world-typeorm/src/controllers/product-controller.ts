import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Product } from '../entities/product';

export class ProductController {
    static async createProduct(req: Request, res: Response) {
        const { name, price } = req.body;
        const product = AppDataSource.getRepository(Product).create({ name, price });
        await AppDataSource.getRepository(Product).save(product);
      
        res.status(201).json(product);
    }
}