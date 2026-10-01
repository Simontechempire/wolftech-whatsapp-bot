export default {
  name: 'random',
  aliases: ['rand'],
  description: 'Generate a random number',
  category: 'utility',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    let min = 1;
    let max = 100;

    if (args.length >= 2) {
      min = parseInt(args[0]);
      max = parseInt(args[1]);
    }

    if (Number.isNaN(min) || Number.isNaN(max)) {
      await sock.sendMessage(msg.key.remoteJid, { text: `🎲 Usage: ${prefix}random 1 100` }, { quoted: msg });
      return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    await sock.sendMessage(msg.key.remoteJid, { text: `🎲 Random number (${min}-${max}): *${result}*` }, { quoted: msg });
  }
};
