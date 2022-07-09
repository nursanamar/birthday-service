import config from "./config/config";
import express from "express";
import { userRouter } from "./controller/route";
import UserUseCase from "./usecase/user";
import ScheduleUseCase from "./usecase/schedule";
import { UserRepo } from "./usecase/repo/userDbRepo";
import Messenger from './usecase/messenger/webapi'
import { ScheduleRepo } from "./usecase/repo/scehduleDbRepo";
import knex from "knex";
import { createScheduler } from "./controller/scheduler";

const app = express()

const port = config.db.port as number;
const db = knex({
  client: "mysql",
  connection: {
    database: config.db.name,
    host: config.db.host,
    password: config.db.password,
    user: config.db.user,
    port: port
  }
})


const mongoConnectionString = config.mongoConnectStr

const srepo = new ScheduleRepo(db)
const repo = new UserRepo(db)
const msg = new Messenger(config.messageEndpoint);
const userUsecase = new UserUseCase(repo)
const scheduleUseCase = new ScheduleUseCase(srepo, msg)

createScheduler({
  mongoConnectionString,
  usecase: scheduleUseCase,
  options: {
    interval: config.checkInterval
  }
})

app.use("/user", userRouter(userUsecase))

app.listen(config.apiPort, () => {
  console.log(`Listen on port ${config.apiPort}`)
})


