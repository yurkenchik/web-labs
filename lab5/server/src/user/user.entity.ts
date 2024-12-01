import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BucketItem } from "../bucket/bucket-item.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false })
    firstName: string;

    @Column({ type: "varchar", nullable: false })
    lastName: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "varchar", nullable: false })
    confirmPassword: string;

    @OneToMany(() => BucketItem, (bucketItem) => bucketItem.user, { cascade: true })
    bucketItems: BucketItem[];
}