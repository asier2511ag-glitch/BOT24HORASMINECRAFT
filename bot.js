const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'OposicionesPolicia.aternos.me',
        port: 32679,
        username: 'BOT24H',
        version: '1.20.4'
    });

    bot.on('spawn', () => {
        console.log('[NPC] El bot ha aparecido correctamente en el mapa.');
    });

    bot.on('login', () => {
        console.log('[NPC] Conexión establecida con el servidor.');
    });

    setInterval(() => {
        if (!bot || !bot.entity) return;

        try {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 400);

            const yaw = bot.entity.yaw + 0.5;
            const pitch = bot.entity.pitch;
            bot.look(yaw, pitch, true);

            console.log('[NPC] Acción anti-AFK ejecutada.');
        } catch (err) {
            console.log(`[NPC] Error: ${err.message}`);
        }
    }, 30000);

    bot.on('end', (reason) => {
        console.log(`[NPC] Desconectado por: ${reason}. Reintentando en 15 segundos...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => console.log(`[NPC] Error de red: ${err.message}`));
}

createBot();
