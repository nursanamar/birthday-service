import { UserEntity } from "../entity";

export interface IUserRepo {
    addUser(user: UserEntity): Promise<UserEntity>;
    deleteUser(id: number): Promise<boolean>
}

export interface IUserUseCase {
    addUser(user: UserEntity): Promise<UserEntity>;
    deleteUser(id: number): Promise<boolean>;
}

export interface IScheduleRepo {
    getScheduledUsers(): Promise<UserEntity[]>;
    setAsDone(id: number): Promise<any>;
    setAsLock(id: number, lock: boolean): Promise<any>;
    resetLock(): Promise<any>;
}

export interface IMessenger {
    sendMessage(msg: string): Promise<boolean>
}