import { SlashCommandBuilder } from "discord.js";
import { ping } from "../commands/ping";
import { textToSpeechCommand } from "../commands/text-to-speech";
import { joinChannel } from "../commands/join";
export const textCommands = [
  {
    name: "ping",
    builder: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!"),
    callback: ping,
  },
  {
    name: "join",
    builder: new SlashCommandBuilder()
      .setName("join")
      .setDescription("Joins and listens"),
    callback: joinChannel,
  },
  {
    name: "talk",
    builder: new SlashCommandBuilder()
      .setName("talk")
      .setDescription("Convert text to speech")
      .addStringOption((option) =>
        option
          .setName("text")
          .setDescription("The text you want to convert to speech")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("language")
          .setDescription("Bot language")
          .setRequired(true)
          .addChoices(
            { name: "Español", value: "es-ES" },
            { name: "English", value: "en-US" },
            { name: "Japones", value: "ja-JP" }
          )
      )
      .addStringOption((option) =>
        option
          .setName("voice")
          .setDescription("Bot voice")
          .setRequired(true)
          .addChoices(
            { name: "Male", value: "MALE" },
            { name: "Female", value: "FEMALE" }
          )
      ),
    callback: textToSpeechCommand,
  },
];

export const commands = [...textCommands];
