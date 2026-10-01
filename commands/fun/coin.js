export default {
  name: 'coin',
  aliases: ['flip'],
  description: 'Flip a coin',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🪙 Coin flip: *${result}*`
    }, { quoted: msg });
  }
};
