import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const play = (resourceName, connection, destroy = true) => {
  // Crear un reproductor de audio
  const player = createAudioPlayer();

  // Crear el recurso de audio con el sonido del maullido
  console.log("Playing sound...", resourceName);
  const resource = createAudioResource(
    path.join(__dirname, "../..", "assets", resourceName)
  );

  // Reproducir el audio
  player.play(resource);
  connection.subscribe(player);

  if (destroy) {
    // Desconectar el bot cuando termine de reproducir el sonido
    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
      console.log("El bot se ha desconectado después de reproducir el audio.");
    });
  }
};
