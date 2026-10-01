export default {
  name: 'antiowner',
  aliases: ['anti', 'antiop'],
  description: 'Toggle anti-owner protection (owner-only)',
  category: 'group',
  ownerOnly: true,

  async execute(sock, msg, args, prefix, context) {
    if (!msg.key.remoteJid.endsWith('@g.us')) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command only works inside a group.'
      }, { quoted: msg });
      return;
    }

    const action = (args[0] || '').toLowerCase();
    if (action === 'on' || action === 'enable') {
      await sock.sendMessage(msg.key.remoteJid, { text: '🛡️ Anti-owner protection is now *ON*.' }, { quoted: msg });
      return;
    }

    if (action === 'off' || action === 'disable') {
      await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Anti-owner protection is now *OFF*.' }, { quoted: msg });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, {
      text: `🛡️ *Anti-owner status*\n\nUsage:\n${prefix}antiowner on\n${prefix}antiowner off`
    }, { quoted: msg });
  }
};
