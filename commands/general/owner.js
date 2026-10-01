export default {
  name: 'owner',
  aliases: ['admin', 'creator'],
  description: 'Show owner contact details',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const text = [
      '👨‍💼 *Bot Owner*',
      '',
      '📱 WhatsApp: +234 916 626 5317',
      '✈️ Telegram: https://t.me/mrdarkdev',
      '📢 Channel: https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K',
      '🔗 GitHub: https://github.com/Simontechempire'
    ].join('\n');

    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
