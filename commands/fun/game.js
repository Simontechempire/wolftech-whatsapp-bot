export default {
  name: 'game',
  aliases: ['play', 'trivia'],
  description: 'Play a small trivia game',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const games = [
      { q: 'What is the capital of France?', a: 'paris' },
      { q: 'Which planet is the largest?', a: 'jupiter' },
      { q: 'What is 2 + 2?', a: '4' },
      { q: 'Who wrote Romeo and Juliet?', a: 'shakespeare' },
      { q: 'What is the smallest prime number?', a: '2' }
    ];

    const game = games[Math.floor(Math.random() * games.length)];
    await sock.sendMessage(msg.key.remoteJid, {
      text: `🎮 *Trivia Game*\n\n❓ ${game.q}\n\nReply with your answer!`
    }, { quoted: msg });
  }
};
