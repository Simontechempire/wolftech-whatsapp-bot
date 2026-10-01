export default {
  name: 'help',
  aliases: ['menu', 'commands', 'cmd'],
  description: 'Show available bot commands',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const commandList = context.commandList || [];
    const lines = commandList.map(cmd => `${prefix}${cmd.name} — ${cmd.description}`);

    const text = [
      `🐺 *${context.botName} Help Menu*`,
      '',
      `Total Commands: ${commandList.length}`,
      '',
      ...lines.slice(0, 50),
      '',
      `📢 Channel: ${context.whatsappChannelUrl}`,
      `🎯 Prefix: ${prefix}`,
      `📱 Mode: ${context.mode}`
    ].join('\n');

    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
