export default {
  name: 'uptime',
  aliases: ['alive', 'runtime'],
  description: 'Show bot uptime',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const text = `⏱️ *Bot Uptime*\n${hours}h ${minutes}m ${seconds}s\n🟢 Status: Online`;
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
