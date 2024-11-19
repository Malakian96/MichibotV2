import { Interaction } from "discord.js";

export const userIsInVoiceChannel = (interaction: Interaction | any) => {
  return Boolean(interaction?.member?.voice.channel);
};

export const replyNotInChannel = async (interaction: Interaction | any) => {
  const userInChannnel = userIsInVoiceChannel(interaction);
  if (!userInChannnel) {
    await interaction.reply(
      "You need to be in a voice channel to use this command!"
    );
  }
  return userInChannnel;
};

export const reply = async (interaction: Interaction | any, message: string, ephemeral: boolean = false) => {
  await interaction.reply({
    content: message,
    ephemeral: ephemeral,
  });
};

export const editReply = async (interaction: Interaction | any, message: string, ephemeral: boolean = false) => {
  await interaction.reply({
    content: message,
    ephemeral: ephemeral,
  });
};
