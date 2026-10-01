export default {
  name: 'dice',
  aliases: ['roll'],
  description: 'Roll a dice (1-6)',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const roll = Math.floor(Math.random() * 6) + 1;
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🎲 You rolled: *${roll}*`
    }, { quoted: msg });
  }
};
