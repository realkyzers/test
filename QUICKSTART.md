## Quick Start Guide

### Local Development with Docker

1. **Create .env file:**
```
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
GUILD_ID=your_server_id
```

2. **Start with Docker Compose:**
```bash
docker-compose up --build
```

This will:
- Start a MySQL database automatically
- Set up the bot with correct database connection
- Auto-create all tables on startup
- Show logs in terminal

3. **Stop everything:**
```bash
docker-compose down
```

---

### Deploy to Replit

1. **Import from GitHub:**
   - Go to https://replit.com
   - Click "Create" → "Import from GitHub"
   - Paste your repository URL

2. **Set Environment Variables:**
   - Go to "Secrets" (lock icon)
   - Add these variables:
     - `DISCORD_TOKEN` = your bot token
     - `DISCORD_CLIENT_ID` = your app ID
     - `GUILD_ID` = your server ID
     - `DB_HOST` = your Replit MySQL host (or use Replit's native MySQL)
     - `DB_USER` = your database user
     - `DB_PASSWORD` = your database password
     - `DB_NAME` = database name

3. **Run:**
   - Click "Run" - the bot will start automatically
   - Tables will be created on first run
   - View logs in the console

---

### Deploy to Railway

1. **Push to GitHub**

2. **Create Railway Project:**
   - Go to https://railway.app
   - Create new project
   - Connect your GitHub repo

3. **Add MySQL Service:**
   - Click "Add Service"
   - Select "MySQL"
   - Railway will provide database credentials automatically

4. **Set Environment Variables:**
   - Add `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`, `GUILD_ID`
   - Railway MySQL credentials are auto-provided

5. **Deploy:**
   - Click "Deploy"
   - Bot will start automatically
   - Tables created on first run

---

### Docker Commands

```bash
# Build image
docker build -t lore-bot .

# Run with your own MySQL
docker run --env-file .env -e DB_HOST=your_host lore-bot

# Use docker-compose (recommended for local dev)
docker-compose up -d
docker-compose logs -f
docker-compose down
```
