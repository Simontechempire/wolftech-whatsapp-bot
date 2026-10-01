export default {
  name: 'status',
  aliases: ['info', 'stats'],
  description: 'Show bot status and settings',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const status = [
      `🐺 *${context.botName} Status*`,
      '',
      `✅ Bot is online and running`,
      `🎯 Prefix: ${prefix}`,
      `🔧 Mode: ${context.mode}`,
      `👤 Owner Configured: ${context.ownerNumber ? 'Yes' : 'No'}`,
      `📱 Your Number: ${context.senderNumber || 'unknown'}`,
      `🔗 Channel: ${context.whatsappChannelUrl}`,
      ``,
      `📋 Commands: ${context.commandList.length}`,
      `⏰ Timestamp: ${new Date().toLocaleString()}`
    ].join('\n');

    await sock.sendMessage(msg.key.remoteJid, { text: status }, { quoted: msg });
  }
};
