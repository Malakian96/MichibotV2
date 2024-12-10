import express from 'express';
import clientHelper from '../helpers/clientHelper';

export const start = () => {
    const app = express();

    app.listen(3000, () =>
        console.log('Example app listening on port 3000!'),
    );

    app.get('/test', (_, res) => {
        res.send("test ok");
    });

    app.get('/guilds', (_, res) => {
        const client = clientHelper.getClient();
        if (!client.isReady()) {
            console.error("El bot no está listo aún.");
            res.send([]);
        }
        const guilds = client.guilds.cache.map((guild: any) => guild);
        res.send(guilds);
    });
}

