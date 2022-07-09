import { UserEntity } from "../entity";
import type { IUserRepo } from "./interfaces";


export default class User {
    private repo: IUserRepo;

    constructor(repo: IUserRepo) {
        this.repo = repo
    }

    async addNewUser(user: UserEntity) {
        let result = await this.repo.addUser(user)

        if (result instanceof Error) {
            return Promise.reject(result)
        }

        return Promise.resolve(result)
    }

    async deleteUser(id: number) {
        let result = await this.repo.deleteUser(id).catch(err => err)

        if (result instanceof Error) {
            return Promise.reject(result)
        }

        return Promise.resolve(result)
    }
}