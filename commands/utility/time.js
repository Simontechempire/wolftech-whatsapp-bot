export default {
  name: 'time',
  aliases: ['clock', 'now'],
  description: 'Show current time and date',
  category: 'utility',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🕐 *Time:* ${time}\n📅 *Date:* ${date}`
    }, { quoted: msg });
  }
};
