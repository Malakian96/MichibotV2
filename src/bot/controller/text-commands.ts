import { ChatInputCommandInteraction } from "discord.js";
import { textCommands } from "./command-router";

export const handleTextCommands = async (interaction: ChatInputCommandInteraction | any) => {
  const commandToExecute = textCommands.find(
    (command) => command.name === interaction.commandName
  );
  if (!commandToExecute) {
    interaction.reply("unknown command");
    return;
  }
  commandToExecute.callback(interaction);
};
