export default {
  name: 'sticker',
  aliases: ['stk', 'emoji'],
  description: 'Send random emoji reaction',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const reactions = ['😂', '😍', '🤦', '👏', '🔥', '💯', '✨', '🎉', '😎', '🚀'];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    await sock.sendMessage(msg.key.remoteJid, { text: reaction }, { quoted: msg });
  }
};
