import { Injectable, InternalServerErrorException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import {InsertResult, Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserAlreadyExistsException} from "../common/exceptions/user-already-exist.exception";
import {UserNotFoundException} from "../common/exceptions/user-not-found.exception";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder()
            .where("id = :userId", { userId })
            .getOne();

        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const userInsertResult: InsertResult = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(createUserDto)
                .returning("id")
                .execute();

            const userId = userInsertResult.identifiers[userInsertResult.identifiers.length - 1].id;
            return this.getUserById(userId);
        } catch (error) {
            if (error.code === "23505") {
                throw new UserAlreadyExistsException();
            }
            throw new InternalServerErrorException();
        }
    }
}