export const userIsInVoiceChannel = (interaction) => {
  console.log(Boolean(interaction.member.voice.channel))
  return Boolean(interaction.member.voice.channel);
};

export const replyNotInChannel = async (interaction) => {
  const userInChannnel = userIsInVoiceChannel(interaction);
  if (!userInChannnel) {
    await interaction.reply(
      "You need to be in a voice channel to use this command!"
    );
  }
  return userInChannnel;
};

export const reply = async (interaction, message, ephemeral = false) => {
  await interaction.reply({
    content: message,
    ephemeral: ephemeral,
  });
};

export const editReply = async (interaction, message, ephemeral = false) => {
  await interaction.reply({
    content: message,
    ephemeral: ephemeral,
  });
};
