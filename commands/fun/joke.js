export default {
  name: 'joke',
  aliases: ['laugh'],
  description: 'Get a random joke',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const jokes = [
      'Why don\'t scientists trust atoms?\nBecause they make up everything!',
      'What did the ocean say to the beach?\nNothing, it just waved.',
      'Why don\'t eggs tell jokes?\nThey\'d crack each other up!',
      'What do you call a fake noodle?\nAn impasta!',
      'Why did the scarecrow win an award?\nHe was outstanding in his field!'
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: `😂 ${joke}` }, { quoted: msg });
  }
};
