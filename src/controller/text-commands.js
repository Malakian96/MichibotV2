import { textCommands } from "./command-router.js";

export const handleTextCommands = async (interaction) => {
  const commandToExecute = textCommands.find(
    (command) => command.name === interaction.commandName
  );
  if (!commandToExecute) {
    interaction.reply("unknown command");
    return;
  }
  commandToExecute.callback(interaction);
};
