export default {
  name: 'myjid',
  aliases: ['jid', 'id'],
  description: 'Show your WhatsApp JID',
  category: 'utility',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = [
      `🔑 *Your WhatsApp JID*`,
      '',
      `\`\`\`${sender}\`\`\``,
      '',
      `This is your unique WhatsApp identifier.`
    ].join('\n');

    await sock.sendMessage(msg.key.remoteJid, {
      text
    }, { quoted: msg });
  }
};
