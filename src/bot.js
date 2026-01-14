import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import { initializeDatabase } from './database.js';
import { registerCommands, registerEvents } from './utils/loader.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Ready event
client.once('ready', async () => {
  console.log(`✓ Bot logged in as ${client.user.tag}`);
  console.log(`✓ Bot is ready in ${client.guilds.cache.size} guild(s)`);
  
  // Set bot status
  client.user.setPresence({
    activities: [{ name: '/lore submit', type: 'LISTENING' }],
    status: 'online',
  });
});

// Main initialization
async function main() {
  try {
    // Initialize database
    console.log('📦 Initializing database...');
    await initializeDatabase();

    // Register commands and events
    console.log('📋 Registering commands...');
    await registerCommands(client);

    console.log('📢 Registering events...');
    await registerEvents(client);

    // Login to Discord
    console.log('🔐 Logging in to Discord...');
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error('❌ Fatal error during startup:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await client.destroy();
  process.exit(0);
});

main();
