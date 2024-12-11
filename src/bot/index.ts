import { Client, GatewayIntentBits, Events } from "discord.js";
import { refreshSlashCommands } from "./controller/command-config";
import { handleJoinCommands } from "./controller/join-commands";
import { handleTextCommands } from "./controller/text-commands";
import * as dotenv from "dotenv";
import ClientHelper from "../helpers/clientHelper";

export const start = async () => {

    dotenv.config();

    const client = ClientHelper.getClient();

    refreshSlashCommands();

    client.on("ready", () => {
        console.log(`Logged in as ${client?.user?.tag}!`);
    });

    client.on(Events.InteractionCreate, handleTextCommands);
    client.on(Events.VoiceStateUpdate, (oldState, newState) => { handleJoinCommands(oldState, newState) });

}
