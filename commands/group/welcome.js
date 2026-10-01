export default {
  name: 'welcome',
  aliases: ['greet', 'welcomemsg'],
  description: 'Show a group welcome message',
  category: 'group',
  ownerOnly: true,

  async execute(sock, msg, args, prefix, context) {
    if (!msg.key.remoteJid.endsWith('@g.us')) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command only works inside a group.'
      }, { quoted: msg });
      return;
    }

    const welcome = `🎉 *Welcome to the group!* 🎉\n\nHi there! Welcome to our community.\nPlease follow the group rules and be respectful.\n\nEnjoy your stay ��`;
    await sock.sendMessage(msg.key.remoteJid, { text: welcome }, { quoted: msg });
  }
};
