import { UserEntity } from "../entity";
import { IMessenger, IScheduleRepo } from "./interfaces";

export default class Schedule {

    repo: IScheduleRepo
    messenger: IMessenger

    constructor(repo: IScheduleRepo, messenger: IMessenger) {
        this.repo = repo
        this.messenger = messenger
    }

    async getUnsentBirthDay() {

        let users = await this.repo.getScheduledUsers()

        return users;
    }

    async clearLocked(){
        await this.repo.resetLock()
    }

    async checkBirthDay(users: UserEntity[]) {
        let currentDate = new Date();

        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(currentDate.getDate() >= user.date.getDate() && currentDate.getMonth() >= user.date.getMonth()){
                // Lock
                if(user.id){
                    this.repo.setAsLock(user.id,true)
                }
                
                // Get user local time
                let [hour] = new Date().toLocaleTimeString("en-GB",{
                    timeZone: user.country
                }).split(":")
                
                if(parseInt(hour) > parseInt("17")){
                    let message = `Hey,${user.firstName} ${user.lastName} it's your birthday`
                    await this.messenger.sendMessage(message).then(() => {
                        if(user.id){
                            this.repo.setAsDone(user.id)
                        }
                    }).catch(() => {
                        if (user.id) {
                            this.repo.setAsLock(user.id,false)                            
                        }
                    })
                }
            }
        }
    }
}