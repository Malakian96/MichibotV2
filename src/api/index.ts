import express from "express";
import cors from "cors";
import clientHelper from "../helpers/clientHelper";
import { join } from "../bot/commands/join";
import { play } from "../bot/commands/play";

import fs from "fs";
import path from "path";
import { VoiceChannel } from "discord.js";

// Ruta de los assets
const assetsPath = path.join(__dirname, "..", "..", "assets");

declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

export const start = () => {
  const client = clientHelper.getClient();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(8080, () => console.log("Example app listening on port 8080!"));

  app.get("/test", (_, res) => {
    res.send("test ok");
  });

  app.get("/guilds", (_, res) => {
    if (!client.isReady()) {
      console.error("El bot no está listo aún.");
      res.send([]);
    }
    const guilds = client.guilds.cache.map(
      (guild: import("discord.js").Guild) => guild
    );
    res.send(guilds);
  });

  app.get("/guilds/:id", async (req, res) => {
    if (!client.isReady()) {
      console.error("El bot no está listo aún.");
      res.send([]);
    }

    const sharedGuilds = [];

    for (const guild of client.guilds.cache.values()) {
      try {
        const member = await guild.members
          .fetch(req.params.id)
          .catch(() => null);
        if (!member) continue;

        // Filtrar canales de voz donde el miembro tiene permisos
        const voiceChannels = guild.channels.cache
          .filter(
            (channel) =>
              channel.type === 2 && // 2: Canal de voz
              channel.permissionsFor(member).has(["ViewChannel", "Connect"])
          )
          .map((channel) => ({
            id: channel.id,
            name: channel.name,
          }));

        sharedGuilds.push({
          guildId: guild.id,
          guildName: guild.name,
          voiceChannels,
        });
      } catch (error: any) {
        console.error(
          `Error al procesar la guild ${guild.name}:`,
          error.message
        );
      }
    }

    res.send(sharedGuilds);
  });

  app.post("/play", (req, res) => {
    if (!client.isReady()) {
      console.error("El bot no está listo aún.");
      res.send([]);
    }
    const channel = client.channels.cache.get(req.body.channelId);
    if (!channel) {
      res.send("Channel not found");
      return;
    }
    const connection = join(channel as VoiceChannel);
    play(`${req.body.sound}`, connection);

    res.send(req.body);
  });

  app.get("/audios", (req, res) => {
    fs.readdir(assetsPath, (err, files) => {
      if (err) {
        console.error("Error reading assets directory:", err);
        return res
          .status(500)
          .json({ error: "Error reading assets directory" });
      }

      // Filtrar solo los archivos de audio (opcional)
      const audioFiles = files.filter(
        (file) =>
          [".mp3", ".wav", ".ogg"].includes(path.extname(file)) &&
          !file.includes("tts-output")
      );

      res.json(audioFiles);
    });
  });
};
