import { Client, GatewayIntentBits, Events } from "discord.js";
import { refreshSlashCommands } from "./controller/command-config";
import { handleJoinCommands } from "./controller/join-commands";
import { handleTextCommands } from "./controller/text-commands";
import * as dotenv from "dotenv";
dotenv.config();
 
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const TOKEN = process.env.TOKEN;
refreshSlashCommands();

client.on("ready", () => {
  console.log(`Logged in asss ${client?.user?.tag}!`);
});

client.on(Events.InteractionCreate, handleTextCommands);
client.on(Events.VoiceStateUpdate, (oldState, newState) => { handleJoinCommands(oldState, newState) });


client.login(TOKEN);
