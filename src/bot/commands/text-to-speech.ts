import { join } from "./join";
import { play } from "./play";
import { manageCharacterLimit } from "../../helpers/characterHelper";
import {
  userIsInVoiceChannel,
  replyNotInChannel,
  reply,
  editReply
} from "../../helpers/voiceChannelHelper";
import { createTTS } from "../../helpers/ttsHelper";
import { Interaction } from "discord.js";

export const textToSpeechCommand = async (interaction: Interaction | any) => {
  if (!interaction.member) return;
  // Check if the user is in a voice channel
  const userVoiceChannel = interaction.member.voice.channel;
  if (!userIsInVoiceChannel(interaction)) {
    replyNotInChannel(interaction);
    return;
  }
  const text = interaction.options.getString("text");
  const gender = interaction.options.getString("voice") ?? "MALE";
  const languageCode = interaction.options.getString("language") ?? "es-ES";

  if(text.length > 100){
    console.error("Exceded maximum length for TTS:");
    await editReply(
      interaction,
      "Exceded maximum length for TTS.",
      true,
    );
    return;
  }

  const { success, remainingChars } = manageCharacterLimit(text.length);

  if (!success) {
    await reply(
      interaction,
      `Daily character limit exceeded! You have ${remainingChars} characters remaining.`,
      true
    );
    return;
  }

  // Acknowledge the command
  await reply(interaction, `Generating TTS for: "${text}"`, true);

  try {
    // Request configuration for TTS
    const request = {
      input: { text },
      voice: { languageCode: languageCode, ssmlGender: gender },
      audioConfig: { audioEncoding: "MP3" },
    };

    await createTTS(request);

    // Join the voice channel and play the audio
    const connection = await join(userVoiceChannel);
    await play("tts-output.mp3", connection, false);
  } catch (error) {
    console.error("Error generating TTS:", error);
    await editReply(
      interaction,
      "Failed to generate TTS. Please try again.",
      true,
    );
  }
};
