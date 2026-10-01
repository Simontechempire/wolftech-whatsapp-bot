export default {
  name: 'calc',
  aliases: ['calculate', 'math'],
  description: 'Simple calculator',
  category: 'utility',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    if (!args.length) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🧮 Usage: ${prefix}calc 5+3\nSupported: +, -, *, /, %`
      }, { quoted: msg });
      return;
    }

    const expression = args.join('');
    if (!/^[\d+\-*/%().\s]+$/.test(expression)) {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Invalid expression.' }, { quoted: msg });
      return;
    }

    try {
      // eslint-disable-next-line no-eval
      const result = eval(expression);
      await sock.sendMessage(msg.key.remoteJid, { text: `🧮 ${expression} = ${result}` }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { text: '❌ Invalid calculation.' }, { quoted: msg });
    }
  }
};
