import { Car } from "src/car/car.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";

@Entity()
export class BucketItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Car, (car) => car.id, { eager: true })
    car: Car;

    @Column({ type: 'integer', default: 1 })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}