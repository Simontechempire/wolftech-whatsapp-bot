# WOLFTECH WhatsApp Bot

Custom WOLFTECH WhatsApp Bot — recoded and enhanced for easier setup, command management, and channel integration.

## 🎯 Features

- ✅ QR-based login from terminal
- ✅ Prefix-based command handling
- ✅ Auto-loaded commands from `commands/` folder
- ✅ WhatsApp channel auto-join on bot connection
- ✅ Starter commands: `.ping`, `.help`, `.status`, `.myjid`, `.channel`
- ✅ Simple environment configuration via `.env`
- ✅ Deploy-ready for Railway, Render, Heroku

## 📱 Contact

- **Telegram:** https://t.me/mrdarkdev
- **WhatsApp:** +234 916 626 5317
- **WhatsApp Channel:** https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A WhatsApp account (personal or dedicated bot number)
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Simontechempire/wolftech-whatsapp-bot.git
cd wolftech-whatsapp-bot
```

2. Install dependencies:

```bash
npm install
```

3. Copy the example environment file:

```bash
cp .env.example .env
```

4. Edit `.env` and configure your bot:

```env
BOT_NAME=WOLFTECH
PREFIX=.
OWNER_NUMBER=2349166265317
MODE=public
WHATSAPP_CHANNEL_URL=https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K
AUTO_JOIN_CHANNEL=true
```

5. Start the bot:

```bash
npm start
```

6. Scan the QR code in the terminal using WhatsApp > Linked Devices

---

## 📋 Available Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `.ping` | `.p`, `.pong` | Check if bot is online |
| `.help` | `.menu`, `.commands` | Show available commands |
| `.status` | `.info` | Display bot status and settings |
| `.myjid` | `.jid` | Show your WhatsApp JID |
| `.channel` | `.ch`, `.join` | Get WhatsApp channel link |

---

## 🌐 Deployment

### Railway

1. Fork this repository
2. Connect to Railway
3. Set environment variables:
   - `BOT_NAME=WOLFTECH`
   - `PREFIX=.`
   - `OWNER_NUMBER=2349166265317`
   - `WHATSAPP_CHANNEL_URL=https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K`
   - `AUTO_JOIN_CHANNEL=true`
4. Deploy with `npm start`

### Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables same as Railway
4. Deploy

### Local / VPS

```bash
npm install -g pm2
pm2 start index.js --name wolftech
pm2 startup
pm2 save
```

---

## 📁 Project Structure

```text
wolftech-whatsapp-bot/
├── index.js                 # Bot core & connection handler
├── commands/
│   ├── general/
│   │   ├── ping.js
│   │   ├── help.js
│   │   ├── status.js
│   │   └── channel.js
│   └── utility/
│       └── myjid.js
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

---

## ✨ Auto-Join Channel Feature

When `AUTO_JOIN_CHANNEL=true`, the bot will:
1. Send a welcome message to the owner on connection
2. Include the WhatsApp channel link
3. Allow users to join via `.channel` command

---

## 📝 Creating Custom Commands

1. Create a new file in `commands/category/`:

```javascript
export default {
  name: 'mycommand',
  aliases: ['mc'],
  description: 'My custom command',
  category: 'general',
  ownerOnly: false,

  async execute(sock, msg, args, prefix, context) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: 'Hello from my command!'
    }, { quoted: msg });
  }
};
```

2. Save and restart the bot — it loads automatically!

---

## 🔐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BOT_NAME` | WOLFTECH | Bot display name |
| `PREFIX` | . | Command prefix |
| `OWNER_NUMBER` | (empty) | Owner's WhatsApp number (no country code needed) |
| `MODE` | public | Bot mode: `public`, `private`, `group-only` |
| `WHATSAPP_CHANNEL_URL` | (channel link) | WhatsApp channel URL |
| `AUTO_JOIN_CHANNEL` | true | Auto-join channel on connection |

---

## 🛡️ Bot Modes

- **public** — Everyone can use commands
- **private** — Only owner can use commands
- **group-only** — Only works in group chats
- **maintenance** — Limited mode (owner only)

---

## 📄 License

MIT — Free to use, modify, and distribute.

---

## ⭐ Support

If this project helped you, consider:
- Starring the repo ⭐
- Forking it 🍴
- Joining our WhatsApp channel 📢
- Reporting issues 🐛

Join our community:
- **Channel:** https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K
- **Telegram:** https://t.me/mrdarkdev

Made with ❤️ by [Simontechempire](https://github.com/Simontechempire)
