export default {
  name: 'ping',
  aliases: ['p', 'pong'],
  description: 'Check if the bot is online',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `🏓 Pong! ${context.botName} is online and ready.`
    }, { quoted: msg });
  }
};
