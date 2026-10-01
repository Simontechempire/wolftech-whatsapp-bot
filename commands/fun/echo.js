export default {
  name: 'echo',
  aliases: ['repeat', 'say'],
  description: 'Echo back your message',
  category: 'fun',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const text = args.join(' ') || 'Nothing to echo!';
    await sock.sendMessage(msg.key.remoteJid, {
      text: `📢 ${text}`
    }, { quoted: msg });
  }
};
