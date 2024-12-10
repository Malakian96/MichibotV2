import express from 'express';
import cors from 'cors';
import clientHelper from '../helpers/clientHelper';
import { join } from '../bot/commands/join';
import { play } from '../bot/commands/play';

export const start = () => {
    const client = clientHelper.getClient();

    const app = express();

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.listen(3000, () =>
        console.log('Example app listening on port 3000!'),
    );

    app.get('/test', (_, res) => {
        res.send("test ok");
    });

    app.get('/guilds', (_, res) => {
        if (!client.isReady()) {
            console.error("El bot no está listo aún.");
            res.send([]);
        }
        const guilds = client.guilds.cache.map((guild: any) => guild);
        res.send(guilds);
    });

    app.post('/play', (req, res) => {
        if (!client.isReady()) {
            console.error("El bot no está listo aún.");
            res.send([]);
        }
        const channel = client.channels.cache.get(req.body.channelId);
        const connection = join(channel);
        play(`${req.body.audioFileName}.mp3`, connection)
        
        res.send(req.body);
    });

}

