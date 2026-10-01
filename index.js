import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import chalk from 'chalk';
import qrcode from 'qrcode-terminal';
import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers
} from '@whiskeysockets/baileys';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prefix = process.env.PREFIX || '.';
const botName = process.env.BOT_NAME || 'WOLFTECH';
const ownerNumber = normalizeNumber(process.env.OWNER_NUMBER || '');
const mode = (process.env.MODE || 'public').toLowerCase();
const sessionPath = process.env.SESSION_PATH || path.join(__dirname, 'session');
const whatsappChannelUrl = process.env.WHATSAPP_CHANNEL_URL || 'https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K';
const autoJoinChannel = (process.env.AUTO_JOIN_CHANNEL || 'true').toLowerCase() === 'true';

const commandMap = new Map();
const aliasMap = new Map();
const categories = new Map();

function normalizeNumber(value = '') {
  return String(value).replace(/\D/g, '') || '';
}

function getRemoteNumber(jid = '') {
  if (!jid) return '';
  return jid.split('@')[0] || '';
}

function isOwner(senderJid = '') {
  if (!ownerNumber) return true;
  return getRemoteNumber(senderJid) === ownerNumber;
}

function logInfo(message) {
  console.log(chalk.cyan(`[${botName}] ${message}`));
}

function logSuccess(message) {
  console.log(chalk.green(`[${botName}] ${message}`));
}

function logWarn(message) {
  console.log(chalk.yellow(`[${botName}] ${message}`));
}

async function loadCommandsFromFolder(folderPath) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);

    if (entry.isDirectory()) {
      await loadCommandsFromFolder(fullPath);
      continue;
    }

    if (!entry.name.endsWith('.js') || entry.name.includes('.disabled.') || entry.name.startsWith('_')) {
      continue;
    }

    try {
      const imported = await import(pathToFileURL(fullPath).href + `?t=${Date.now()}`);
      const mod = imported.default || imported;
      if (!mod || typeof mod !== 'object' || !mod.name) continue;

      const normalizedName = String(mod.name).toLowerCase();
      const category = String(mod.category || path.basename(path.dirname(fullPath))).toLowerCase();
      const aliases = Array.isArray(mod.aliases) ? mod.aliases : [];

      commandMap.set(normalizedName, mod);
      categories.set(category, (categories.get(category) || new Set()));
      categories.get(category).add(normalizedName);

      for (const alias of aliases) {
        aliasMap.set(String(alias).toLowerCase(), mod);
      }

      logInfo(`Loaded command: ${normalizedName} [${category}]`);
    } catch (error) {
      console.error(chalk.red(`Failed to load command ${fullPath}:`), error);
    }
  }
}

function getCommandList() {
  const list = [];
  for (const [name, command] of commandMap.entries()) {
    list.push({
      name,
      description: command.description || 'No description provided',
      category: command.category || 'general'
    });
  }
  return list.sort((a, b) => a.name.localeCompare(b.name));
}

async function sendText(sock, jid, text, quotedMsg = null) {
  if (!jid) return;
  await sock.sendMessage(jid, { text }, quotedMsg ? { quoted: quotedMsg } : undefined);
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: false,
    auth: state,
    browser: Browsers.ubuntu('WOLFTECH'),
    syncFullHistory: false
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
      console.log(chalk.magenta('🔗 Scan the QR code with WhatsApp > Linked Devices'));
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      logWarn(`Connection closed. Code: ${statusCode}. Reconnecting...`);
      if (statusCode !== DisconnectReason.loggedOut) {
        setTimeout(startBot, 3000);
      }
    }

    if (connection === 'open') {
      logSuccess(`Connected successfully as ${sock.user?.id || 'bot'}`);
      
      // Auto-join channel on connection
      if (autoJoinChannel && whatsappChannelUrl) {
        try {
          logInfo(`📢 Channel: ${whatsappChannelUrl}`);
          // Send welcome message to owner
          if (ownerNumber) {
            await sendText(sock, `${ownerNumber}@s.whatsapp.net`, 
              `🐺 ${botName} is online!\n\n📢 Channel: ${whatsappChannelUrl}\n\nUse ${prefix}help to see available commands.`);
          }
        } catch (error) {
          console.error(chalk.red('Error on connection:'), error);
        }
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message || msg.key.fromMe) return;

    const remoteJid = msg.key.remoteJid;
    if (!remoteJid) return;

    const rawText = msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption || '';

    if (!rawText.trim()) return;

    const sender = msg.key.participant || remoteJid;
    const senderNumber = getRemoteNumber(sender);
    const isOwnerUser = isOwner(sender);
    const normalizedText = rawText.trim();

    if (!normalizedText.startsWith(prefix)) {
      return;
    }

    const trimmed = normalizedText.slice(prefix.length).trim();
    const [commandName, ...args] = trimmed.split(/\s+/);
    const commandKey = (commandName || '').toLowerCase();

    if (!commandKey) return;

    const matchedCommand = commandMap.get(commandKey) || aliasMap.get(commandKey);
    if (!matchedCommand) return;

    const context = {
      botName,
      prefix,
      ownerNumber,
      mode,
      isOwner: isOwnerUser,
      senderNumber,
      remoteJid: remoteJid,
      commandList: getCommandList(),
      categories,
      whatsappChannelUrl
    };

    if (matchedCommand.ownerOnly && !isOwnerUser) {
      await sendText(sock, remoteJid, '🔒 This command is restricted to the bot owner.', msg);
      return;
    }

    if (mode === 'private' && !isOwnerUser) {
      await sendText(sock, remoteJid, '⚠️ Bot is in private mode. Only the owner can use it.', msg);
      return;
    }

    try {
      await matchedCommand.execute(sock, msg, args, prefix, context);
    } catch (error) {
      console.error(chalk.red('Command execution failed:'), error);
      await sendText(sock, remoteJid, '❌ An error occurred while processing your command.', msg);
    }
  });
}

async function main() {
  console.log(chalk.bold.green(`🐺 ${botName} is starting...`));
  console.log(chalk.dim(`Prefix: ${prefix} | Mode: ${mode} | Owner: ${ownerNumber || 'not set'}`));
  console.log(chalk.dim(`Channel: ${whatsappChannelUrl} | Auto-join: ${autoJoinChannel ? 'enabled' : 'disabled'}`));

  const commandsDir = path.join(__dirname, 'commands');
  if (fs.existsSync(commandsDir)) {
    await loadCommandsFromFolder(commandsDir);
  } else {
    logWarn('No commands folder found.');
  }

  await startBot();
}

main().catch(err => {
  console.error(chalk.red('Fatal error:'), err);
  process.exit(1);
});
