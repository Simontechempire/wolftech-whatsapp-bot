export default {
  name: 'countdown',
  aliases: ['timer'],
  description: 'Start a countdown',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    let seconds = parseInt(args[0]) || 5;
    if (seconds > 60) seconds = 60;
    if (seconds < 1) seconds = 1;

    await sock.sendMessage(msg.key.remoteJid, { text: `⏱️ Countdown started: ${seconds}s` }, { quoted: msg });

    for (let i = seconds; i >= 1; i--) {
      await new Promise(r => setTimeout(r, 1000));
      if (i <= 3 || i % 5 === 0) {
        await sock.sendMessage(msg.key.remoteJid, { text: `⏱️ ${i}...` }, { quoted: msg });
      }
    }

    await sock.sendMessage(msg.key.remoteJid, { text: '🎯 Time\'s up!' }, { quoted: msg });
  }
};
