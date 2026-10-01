# Deployment Guide — WOLFTECH WhatsApp Bot

This guide covers deploying WOLFTECH to Railway, Render, Heroku, and other cloud platforms.

## Environment Variables Required

Before deploying, ensure these are set in your platform:

```
BOT_NAME=WOLFTECH
PREFIX=.
OWNER_NUMBER=2349166265317
MODE=public
WHATSAPP_CHANNEL_URL=https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K
AUTO_JOIN_CHANNEL=true
PORT=3000
SESSION_PATH=./session
```

---

## Railway Deployment

1. **Fork the repository** on GitHub
2. **Go to Railway.app** and sign in
3. **New Project** → Select "Deploy from GitHub repo"
4. **Authorize and select** `wolftech-whatsapp-bot`
5. **Add environment variables:**
   - `BOT_NAME=WOLFTECH`
   - `PREFIX=.`
   - `OWNER_NUMBER=2349166265317`
   - `WHATSAPP_CHANNEL_URL=https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K`
   - `AUTO_JOIN_CHANNEL=true`
6. **Deploy** — Railway will auto-detect `npm start`

### Notes:
- Railway auto-restarts on failure
- Free tier includes 5GB/month
- Perfect for small bots

---

## Render Deployment

1. **Push code to GitHub**
2. **Go to Render.com** and sign in
3. **New** → **Web Service**
4. **Connect GitHub repository** and select `wolftech-whatsapp-bot`
5. **Configure:**
   - Name: `wolftech-bot`
   - Environment: `Node`
   - Build command: `npm install`
   - Start command: `npm start`
6. **Add environment variables** (same as Railway)
7. **Create Web Service**

### Notes:
- Free tier auto-pauses after 15 min inactivity
- Use a cron job to keep it alive
- Good for testing/dev

---

## Heroku Deployment

1. **Install Heroku CLI**: `brew install heroku` (or download)
2. **Login**: `heroku login`
3. **Create app**: `heroku create wolftech-bot`
4. **Set variables**:
   ```bash
   heroku config:set BOT_NAME=WOLFTECH
   heroku config:set PREFIX=.
   heroku config:set OWNER_NUMBER=2349166265317
   heroku config:set WHATSAPP_CHANNEL_URL=https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K
   heroku config:set AUTO_JOIN_CHANNEL=true
   ```
5. **Deploy**:
   ```bash
   git push heroku main
   ```
6. **View logs**: `heroku logs --tail`

### Notes:
- Heroku free tier is now paid
- Good for production deployments

---

## Local VPS Deployment

### Using PM2 (Process Manager)

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Clone the repo
git clone https://github.com/Simontechempire/wolftech-whatsapp-bot.git
cd wolftech-whatsapp-bot

# Install dependencies
npm install

# Install PM2 globally
npm install -g pm2

# Create .env file
cp .env.example .env
nano .env  # Edit with your settings

# Start with PM2
pm2 start index.js --name wolftech

# Auto-restart on reboot
pm2 startup
pm2 save

# View logs
pm2 logs wolftech

# Manage
pm2 stop wolftech
pm2 restart wolftech
pm2 delete wolftech
```

---

## Quick Comparison

| Platform | Cost | Uptime | Setup | Best For |
|----------|------|--------|-------|----------|
| Railway | $5/mo | 24/7 | 5 min | Small bots |
| Render | Free | 15 min pause | 5 min | Testing |
| Heroku | Paid | 24/7 | 5 min | Production |
| VPS | $5-20/mo | 24/7 | 15 min | Full control |

---

## Troubleshooting

### Bot not responding on Railway/Render

- Check environment variables are set correctly
- View logs: `Railway Logs` or `Render Logs`
- Ensure `BOT_NAME` and `PREFIX` are correct

### "SESSION_PATH not found"

- Create `session/` folder in root
- Or set `SESSION_PATH=./session` in `.env`

### QR code not scanning

- Ensure you're scanning within 30 seconds
- Clean session: delete `session/` folder and restart
- Check terminal output for QR code

### Auto-join not working

- Verify `AUTO_JOIN_CHANNEL=true`
- Check `WHATSAPP_CHANNEL_URL` is valid
- Bot must be online and connected

---

## Support

For issues or questions:
- **Telegram:** https://t.me/mrdarkdev
- **WhatsApp:** +234 916 626 5317
- **Channel:** https://whatsapp.com/channel/0029VbElMTUBPzjU6oxPoO3K

