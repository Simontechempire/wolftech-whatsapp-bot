export default {
  name: 'channel',
  aliases: ['ch', 'join', 'link'],
  description: 'Get WhatsApp channel link and instructions',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const channelUrl = context.whatsappChannelUrl || 'https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K';
    
    const text = [
      `📢 *${context.botName} Channel*`,
      '',
      `Join our WhatsApp channel for updates, announcements, and more!`,
      '',
      `🔗 *Link:* ${channelUrl}`,
      '',
      `📱 *Contact:*`,
      `☎️ WhatsApp: +234 916 626 5317`,
      `✈️ Telegram: https://t.me/mrdarkdev`,
      '',
      `🎯 Use ${prefix}help to see all commands`
    ].join('\n');

    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
