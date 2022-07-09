import { UserEntity } from "../../entity";
import { IScheduleRepo } from "../interfaces";
import { Knex } from "knex"


export class ScheduleRepo implements IScheduleRepo {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex
    }


    async resetLock(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.knex("user")
            .where("sent", 1)
            .update({
                sent: null
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    }

    setAsDone(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.knex("user").where("id", id).update({
                sent: 2
            }).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    }

    async setAsLock(id: number, lock: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.knex("user")
                .where("id", id)
                .update({ sent: lock ? 1 : null })
                .then(() => {
                    resolve(true)
                })
                .catch(() => {
                    reject(false)
                })
        })
    }

    async getScheduledUsers(): Promise<UserEntity[]> {
        return new Promise((resolve, rejects) => {
            this.knex("user").select("*").where("sent", null).then(rows => {
                let users: UserEntity[] = [];
                rows.forEach(row => {
                    users.push({
                        country: row.country,
                        date: row.date,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        id: row.id,
                        sent: row.sent
                    })
                })

                resolve(users)
            }).catch(err => rejects(err))
        })
    }
}