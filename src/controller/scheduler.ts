import ScheduleUseCase from "../usecase/schedule";
import Agenda from "agenda/dist";



export async function createScheduler(
    { mongoConnectionString, usecase, options = {
        interval: 5
    } }: { mongoConnectionString: string; usecase: ScheduleUseCase; options?: { interval: number | string; }; }): Promise<Agenda> {
    console.log("Reset Previous schedule")

    await usecase.clearLocked()

    console.log("Creating scheduler")

    const agenda = new Agenda({ db: { address: mongoConnectionString } });

    agenda.define("Check users BirthDay", async (job: any, done) => {
        console.log("Running Check")
        let users = await usecase.getUnsentBirthDay()
        console.log(`Found ${users.length} user(s)`)
        await usecase.checkBirthDay(users)
        done()
    });

    await agenda.start();

    await agenda.every(`${options.interval} seconds`, "Check users BirthDay");

    return agenda;
}
