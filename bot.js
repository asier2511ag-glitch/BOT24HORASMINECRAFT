const mineflayer = require('mineflayer');
const http = require('http');

// Servidor HTTP falso para mantener vivo Render
http.createServer((req, res) => {
  res.write("Bot 24/7 activo");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mastiff.aternos.host',
    port: 32679,
    username: 'BOT24H'
  });

  bot.on('spawn', () => {
    console.log('[NPC] El bot ha aparecido correctamente en Aternos.');
    setTimeout(() => {
      setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }, 30000);
    }, 3000);
  });

  bot.on('error', (err) => console.log('[Error de red]:', err.message));
  bot.on('end', () => {
    console.log('[NPC] Desconectado. Reintentando en 15 segundos...');
    setTimeout(createBot, 15000);
  });
}

createBot();
