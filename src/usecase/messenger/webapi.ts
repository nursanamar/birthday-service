import { IMessenger } from "../interfaces";
import axios from "axios";

export default class Messenger implements IMessenger {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint
    }

    async sendMessage(msg: string): Promise<boolean> {
        let payload = {
            message: msg
        }

        return axios.post(this.endpoint,payload).then(res => true).catch(() => false)
    }
    
}