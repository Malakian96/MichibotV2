import { Client, GatewayIntentBits, Events } from "discord.js";
import { refreshSlashCommands } from "./src/controller/command-config.js";
import { handleTextCommands } from "./src/controller/text-commands.js";
import { handleJoinCommands } from "./src/controller/join-commands.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const TOKEN = process.env.TOKEN;

refreshSlashCommands();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, handleTextCommands);
client.on(Events.VoiceStateUpdate, (oldState, newState) => {handleJoinCommands(oldState, newState)});


client.login(TOKEN);
