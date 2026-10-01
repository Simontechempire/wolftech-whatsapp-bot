export default {
  name: 'vv',
  aliases: ['viewonce', 'seen'],
  description: 'Send a view-once message',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const text = args.join(' ') || 'This is a view-once message 👀';
    await sock.sendMessage(msg.key.remoteJid, {
      text,
      viewOnce: true
    }, { quoted: msg });
  }
};
