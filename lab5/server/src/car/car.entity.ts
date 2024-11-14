import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";

@Entity()
@Unique(["id", "model"])
export class Car {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', unique: true })
    model: string;

    @Column({ type: 'integer' })
    price: number;

    @Column({ type: 'integer', nullable: true })
    year: number;

    @Column({ type: 'varchar', nullable: true })
    country: string;

    @Column({ type: 'varchar', nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}