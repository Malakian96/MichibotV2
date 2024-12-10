import { Client, GatewayIntentBits } from "discord.js";

class ClientHelper {
    static instance: any;
    client!: Client;

    constructor() {
        if (ClientHelper.instance) {
            return ClientHelper.instance;
        }
        
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
        });
    
        ClientHelper.instance = this;
    }

    async login(): Promise<Client>{
        const TOKEN = process.env.TOKEN;
        await this.client.login(TOKEN);

        return this.client;
    }

    getClient() {
        return this.client;
    }
}

export default new ClientHelper();
