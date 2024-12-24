import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  VoiceConnection,
} from "@discordjs/voice";
import { reply } from "../../helpers/voiceChannelHelper";
import { play } from "./play";
import {
  VoiceChannel,
  GuildMember,
  ChatInputCommandInteraction,
} from "discord.js";

const userActivity = new Map<
  string,
  { lastActivity: number; active: boolean }
>(); // Para rastrear canales y su actividad

export const join = (channel: VoiceChannel): VoiceConnection => {
  const voiceChannel = channel;

  if (!voiceChannel) {
    throw Error("El canal de voz no existe!");
  }
  
  return joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild
      .voiceAdapterCreator as DiscordGatewayAdapterCreator,
    selfDeaf: false,
  });
};
// Función para monitorear actividad de usuarios
function monitorUserActivity(
  connection: VoiceConnection,
  voiceChannel: VoiceChannel
) {
  const receiver = connection.receiver;

  // Escucha cuando un usuario empieza a hablar
  receiver.speaking.on("start", (userId: string) => {
    const user = voiceChannel.members.get(userId);

    if (!user) return; // El usuario no está en el canal (por seguridad)
    console.log(`El usuario ${user.user.tag} está hablando.`);
    userActivity.set(userId, { lastActivity: Date.now(), active: true });
  });

  // Escucha cuando un usuario deja de hablar
  receiver.speaking.on("end", (userId: string) => {
    const user = voiceChannel.members.get(userId);

    if (!user) return;
    console.log(`El usuario ${user.user.tag} dejó de hablar.`);
    userActivity.set(userId, { lastActivity: Date.now(), active: false });
  });

  // Verifica la inactividad individual
  setInterval(() => {
    const now = Date.now();
    for (const [userId, activity] of userActivity.entries()) {
      const user = voiceChannel.members.get(userId);
      if (!user) {
        // Si el usuario ya no está en el canal, elimina su seguimiento
        userActivity.delete(userId);
        continue;
      }

      const timeSinceLastActivity = now - activity.lastActivity;
      if (!activity.active && timeSinceLastActivity > 90000) {
        console.log(
          `El usuario ${user.user.tag} ha estado inactivo durante más de 45 segundos.`
        );
        play("darkusmeow2.mp3", connection, false); // Michibot maúlla
        userActivity.set(userId, { ...activity, lastActivity: now }); // Resetea el temporizador
      }
    }
  }, 5000); // Verifica cada 5 segundos
}

export const joinChannel = (interaction: ChatInputCommandInteraction) => {
  const channel = (interaction.member as GuildMember).voice.channel;
  const connection = join(channel as VoiceChannel);
  reply(interaction, "Michibot joined", true);

  monitorUserActivity(connection, channel as VoiceChannel);
};
