import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import User from "../usecase/user";
import { DateTime } from "luxon";

export function userRouter(usecase:User) {
    const router = express.Router()

    router.use(bodyParser.json())

    router.post("/",async (req: Request,res: Response) => {

        let payload = req.body
        let date = DateTime.fromFormat(payload.date,"dd-MM-yyyy").toUTC();

        let user = {
            country: payload.zone,
            date: date.toJSDate(),
            firstName: payload.firstName,
            lastName: payload.lastName,
        }
        
        let result = await usecase.addNewUser(user)

        res.send(JSON.stringify(result))
    })

    router.delete("/:id",async (req: Request, res: Response) => {
        let { id } = req.params
        usecase.deleteUser(id as unknown as number).then(result => {
            res.send({
                success: true 
            })
        }).catch(() => {
            res.send({
                success: false 
            })
        })
    })

    return router
}
