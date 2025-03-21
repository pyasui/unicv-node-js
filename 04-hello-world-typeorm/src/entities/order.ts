import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @OneToMany(() => Product, product => product.id)
    products: Product[];

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
