import * as dotenv from "dotenv";
dotenv.config();
import { REST, Routes } from "discord.js";
import { commands } from "./command-router";

const CLIENT_ID = process.env.CLIENT_ID ?? "";
const TOKEN = process.env.TOKEN ?? "";

const rest = new REST({ version: "10" }).setToken(TOKEN);

export const refreshSlashCommands = async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, "1303134031315075102"),
      { body: commands.map((cmd) => cmd.builder.toJSON()) }
    );
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands.map((cmd) => cmd.builder.toJSON()),
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
