export default {
  name: 'hello',
  aliases: ['hi', 'hey'],
  description: 'Get a greeting from the bot',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const greetings = [
      '👋 Hey there! How can I help you?',
      '🤖 Hello! What do you need?',
      '💬 Hi! Type .help for commands.',
      '😊 Greetings! I am ready.'
    ];

    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: greeting }, { quoted: msg });
  }
};
