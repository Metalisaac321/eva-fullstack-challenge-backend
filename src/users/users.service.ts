import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'admin',
                password: 'admin',
            },
            {
                userId: 2,
                username: 'chris',
                password: 'secret',
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}