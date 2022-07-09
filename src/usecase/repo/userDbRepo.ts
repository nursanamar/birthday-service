import { UserEntity } from "../../entity";
import { IUserRepo } from "../interfaces";
import { Knex } from "knex"

export class UserRepo implements IUserRepo {
    private knex: Knex;
    constructor(knex: Knex){
        this.knex = knex
    }

    async addUser(user: UserEntity): Promise<UserEntity> {
        let {insertedId, error} = await this.knex("user").insert({
            firstName: user.firstName,
            lastName: user.lastName,
            date: user.date,
            country: user.country
        }).then(res => {
            return {
                insertedId: res[0],
                error: null
            }
        }).catch(err => {
            let error = new Error(err.sqlMessage)
            return {
                insertedId: null,
                error: error
            }
        })

        if(error === null){
            let user = await this.knex("user").select("*").where("id",insertedId).then(res => {
                const [result] = res
                return result
            })
            console.log(user.date.getTimezoneOffset())
            return Promise.resolve(user as UserEntity)
        }

        return Promise.reject(error)
    }

    async deleteUser(id: number): Promise<boolean> {
        let {efectedRow, error} = await this.knex("user")
        .where("id",id)
        .del()
        .then(res => {
            return {
                efectedRow: res,
                error: null
            }
        })
        .catch(err => {
            console.log(err)
            return {
                efectedRow: null,
                error: new Error(err.sqlMessage)
            }
        })

        if (error === null) {
            return Promise.resolve(true)
        }

        return Promise.reject(error)
    }
}