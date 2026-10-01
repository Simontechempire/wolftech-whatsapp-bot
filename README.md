# WOLFTECH WhatsApp Bot

Custom WOLFTECH WhatsApp Bot — recoded and enhanced for easier setup and command management.

## Contact

- Telegram: https://t.me/mrdarkdev
- WhatsApp: +234 916 626 5317

## Overview

This project is a lightweight WhatsApp bot starter built with Baileys and Node.js. It includes:

- QR-based login from the terminal
- Prefix-based command handling
- Auto-loaded commands from the `commands/` folder
- Starter commands: `.ping`, `.help`, `.status`, and `.myjid`
- Simple environment configuration via `.env`

## Quick start

1. Install Node.js 18+
2. Install dependencies:

```bash
npm install
```

3. Copy the example environment file:

```bash
cp .env.example .env
```

4. Edit `.env` and set your bot preferences:

```env
BOT_NAME=WOLFTECH
PREFIX=.
OWNER_NUMBER=2349166265317
MODE=public
```

5. Start the bot:

```bash
npm start
```

6. Scan the QR code in the terminal using WhatsApp > Linked Devices.

## Example commands

```bash
.help
.ping
.status
.myjid
```

## Project structure

```text
wolftech-whatsapp-bot/
├── index.js
├── commands/
│   ├── general/
│   │   ├── ping.js
│   │   ├── help.js
│   │   └── status.js
│   └── utility/
│       └── myjid.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## Notes

- Add new commands by creating files inside the `commands/` folder.
- The bot automatically loads commands recursively from subfolders.
- Set `OWNER_NUMBER` if you want owner-only restrictions.

## License

MIT
