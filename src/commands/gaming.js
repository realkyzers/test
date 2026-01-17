/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎮 GAMING COMMANDS
 * Roblox, Minecraft, and general gaming utilities
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { SlashCommandBuilder } from 'discord.js';
import { gamingEmbed, robloxEmbed, minecraftEmbed, BotEmbed } from '../embeds/EmbedBuilder.js';
import { 
  createPlatformSelect, 
  createRobloxGameSelect,
  createNavigationButtons,
  createButtonRow,
} from '../embeds/ComponentBuilder.js';
import { Colors, Emojis, Decorations, Branding } from '../config/theme.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 COMMAND DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

export const data = new SlashCommandBuilder()
  .setName('gaming')
  .setDescription('Gaming utilities for Roblox, Minecraft, and more')
  .addSubcommand(sub =>
    sub.setName('hub')
      .setDescription('Open the gaming hub with all gaming features')
  )
  .addSubcommand(sub =>
    sub.setName('roblox')
      .setDescription('Roblox utilities and information')
      .addStringOption(opt =>
        opt.setName('action')
          .setDescription('What would you like to do?')
          .setRequired(true)
          .addChoices(
            { name: '👤 Profile Lookup', value: 'profile' },
            { name: '🎮 Game Info', value: 'game' },
            { name: '📊 Server Stats', value: 'stats' },
            { name: '🎲 Random Game', value: 'random' },
          )
      )
      .addStringOption(opt =>
        opt.setName('username')
          .setDescription('Roblox username (for profile lookup)')
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
    sub.setName('minecraft')
      .setDescription('Minecraft utilities and information')
      .addStringOption(opt =>
        opt.setName('action')
          .setDescription('What would you like to do?')
          .setRequired(true)
          .addChoices(
            { name: '👤 Player Lookup', value: 'player' },
            { name: '🖥️ Server Status', value: 'server' },
            { name: '🎨 Skin Viewer', value: 'skin' },
            { name: '📖 Crafting Recipe', value: 'recipe' },
          )
      )
      .addStringOption(opt =>
        opt.setName('query')
          .setDescription('Username, server IP, or item name')
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
    sub.setName('lfg')
      .setDescription('Looking for group - Find players to play with')
      .addStringOption(opt =>
        opt.setName('game')
          .setDescription('What game are you playing?')
          .setRequired(true)
      )
      .addIntegerOption(opt =>
        opt.setName('players')
          .setDescription('How many players do you need?')
          .setRequired(false)
          .setMinValue(1)
          .setMaxValue(50)
      )
      .addStringOption(opt =>
        opt.setName('description')
          .setDescription('Additional details about your session')
          .setRequired(false)
      )
  );

// ═══════════════════════════════════════════════════════════════════════════════
// ⚡ COMMAND EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();
  
  switch (subcommand) {
    case 'hub':
      return handleGamingHub(interaction);
    case 'roblox':
      return handleRoblox(interaction);
    case 'minecraft':
      return handleMinecraft(interaction);
    case 'lfg':
      return handleLFG(interaction);
    default:
      return interaction.reply({
        content: '❌ Unknown subcommand.',
        ephemeral: true,
      });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 GAMING HUB
// ═══════════════════════════════════════════════════════════════════════════════

async function handleGamingHub(interaction) {
  const embed = new BotEmbed({ color: Colors.GAMING.MAIN })
    .setTitle(`${Emojis.CATEGORIES.GAMING} 【 Gaming Hub 】`)
    .setDescription(
      `${Decorations.FANCY.GAMING}\n\n` +
      `Welcome to the **BlackHawks Gaming Hub**!\n` +
      `Your one-stop destination for all gaming features.\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `${Emojis.CATEGORIES.ROBLOX} Roblox`,
        value: 
          `${Emojis.BULLETS.ARROW} Profile lookups\n` +
          `${Emojis.BULLETS.ARROW} Game information\n` +
          `${Emojis.BULLETS.ARROW} Random game finder`,
        inline: true,
      },
      {
        name: `${Emojis.CATEGORIES.MINECRAFT} Minecraft`,
        value: 
          `${Emojis.BULLETS.ARROW} Player lookups\n` +
          `${Emojis.BULLETS.ARROW} Server status\n` +
          `${Emojis.BULLETS.ARROW} Skin viewer`,
        inline: true,
      },
      {
        name: `${Emojis.GAMING.CONTROLLER} General`,
        value: 
          `${Emojis.BULLETS.ARROW} Looking for group\n` +
          `${Emojis.BULLETS.ARROW} Game sessions\n` +
          `${Emojis.BULLETS.ARROW} Community events`,
        inline: true,
      }
    )
    .addFields({
      name: `${Decorations.LINES.THIN}`,
      value: `${Emojis.COMMUNITY.LIGHTBULB} **Tip:** Use the dropdown below to select a platform!`,
      inline: false,
    })
    .setFooter({ text: Branding.FOOTERS.GAMING })
    .setThumbnail(interaction.client.user.displayAvatarURL({ size: 256 }));

  const platformSelect = createPlatformSelect('gaming_platform');
  const navButtons = createNavigationButtons({ home: false, closeId: 'gaming_close' });

  return interaction.reply({
    embeds: [embed],
    components: [platformSelect, navButtons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🟥 ROBLOX COMMANDS
// ═══════════════════════════════════════════════════════════════════════════════

async function handleRoblox(interaction) {
  const action = interaction.options.getString('action');
  const username = interaction.options.getString('username');
  
  switch (action) {
    case 'profile':
      return handleRobloxProfile(interaction, username);
    case 'game':
      return handleRobloxGame(interaction);
    case 'stats':
      return handleRobloxStats(interaction);
    case 'random':
      return handleRobloxRandom(interaction);
    default:
      return interaction.reply({
        content: '❌ Unknown action.',
        ephemeral: true,
      });
  }
}

async function handleRobloxProfile(interaction, username) {
  if (!username) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please provide a Roblox username!`,
      ephemeral: true,
    });
  }

  // Note: In production, you would fetch real data from Roblox API
  const embed = robloxEmbed(
    `Player Profile: ${username}`,
    `${Decorations.FANCY.GAMING}\n\n` +
    `Viewing profile information for **${username}**\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.GAMING.STAR} Account Info`,
        value: 
          `${Emojis.BULLETS.DOT} **Username:** ${username}\n` +
          `${Emojis.BULLETS.DOT} **Display Name:** ${username}\n` +
          `${Emojis.BULLETS.DOT} **Account Age:** Unknown`,
        inline: true,
      },
      {
        name: `${Emojis.GAMING.TROPHY} Statistics`,
        value: 
          `${Emojis.BULLETS.DOT} **Friends:** --\n` +
          `${Emojis.BULLETS.DOT} **Followers:** --\n` +
          `${Emojis.BULLETS.DOT} **Following:** --`,
        inline: true,
      }
    )
    .addTip('Connect your Roblox account for more detailed stats!');

  const buttons = createButtonRow([
    { customId: 'roblox_refresh', label: 'Refresh', emoji: Emojis.NAV.REFRESH, style: 2 },
    { customId: 'roblox_games', label: 'View Games', emoji: Emojis.GAMING.CONTROLLER, style: 1 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

async function handleRobloxGame(interaction) {
  const embed = robloxEmbed(
    'Game Information',
    `${Decorations.FANCY.GAMING}\n\n` +
    `Select a game category to explore popular Roblox games!\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.GAMING.FIRE} Popular Categories`,
        value: 
          `${Emojis.BULLETS.STAR} Simulators\n` +
          `${Emojis.BULLETS.STAR} Roleplay\n` +
          `${Emojis.BULLETS.STAR} Obbies\n` +
          `${Emojis.BULLETS.STAR} Tycoons\n` +
          `${Emojis.BULLETS.STAR} Horror\n` +
          `${Emojis.BULLETS.STAR} PvP`,
        inline: false,
      }
    );

  const gameSelect = createRobloxGameSelect('roblox_game_type');
  const navButtons = createNavigationButtons({ homeId: 'gaming_hub', closeId: 'gaming_close' });

  return interaction.reply({
    embeds: [embed],
    components: [gameSelect, navButtons],
  });
}

async function handleRobloxStats(interaction) {
  const embed = robloxEmbed(
    'Server Gaming Stats',
    `${Decorations.FANCY.GAMING}\n\n` +
    `Gaming statistics for **${interaction.guild.name}**\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.GAMING.TROPHY} Top Games`,
        value: 
          `${Emojis.NUMBERS[1]} Adopt Me!\n` +
          `${Emojis.NUMBERS[2]} Blox Fruits\n` +
          `${Emojis.NUMBERS[3]} Murder Mystery 2\n` +
          `${Emojis.NUMBERS[4]} Tower of Hell\n` +
          `${Emojis.NUMBERS[5]} Brookhaven`,
        inline: true,
      },
      {
        name: `${Emojis.COMMUNITY.PEOPLE} Active Players`,
        value: 
          `${Emojis.BULLETS.DOT} **Today:** --\n` +
          `${Emojis.BULLETS.DOT} **This Week:** --\n` +
          `${Emojis.BULLETS.DOT} **Total:** --`,
        inline: true,
      }
    )
    .addNote('Stats are updated daily. Connect your account to contribute!');

  return interaction.reply({
    embeds: [embed],
  });
}

async function handleRobloxRandom(interaction) {
  const games = [
    { name: 'Adopt Me!', genre: 'Roleplay', players: '500K+' },
    { name: 'Blox Fruits', genre: 'Adventure', players: '300K+' },
    { name: 'Murder Mystery 2', genre: 'Horror', players: '100K+' },
    { name: 'Tower of Hell', genre: 'Obby', players: '150K+' },
    { name: 'Brookhaven', genre: 'Roleplay', players: '400K+' },
    { name: 'Arsenal', genre: 'FPS', players: '50K+' },
    { name: 'Jailbreak', genre: 'Action', players: '80K+' },
    { name: 'Royal High', genre: 'Roleplay', players: '100K+' },
  ];
  
  const randomGame = games[Math.floor(Math.random() * games.length)];
  
  const embed = robloxEmbed(
    '🎲 Random Game Suggestion',
    `${Decorations.FANCY.GAMING}\n\n` +
    `Here's a random game for you to try!\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.GAMING.STAR} ${randomGame.name}`,
        value: 
          `${Emojis.BULLETS.DOT} **Genre:** ${randomGame.genre}\n` +
          `${Emojis.BULLETS.DOT} **Active Players:** ${randomGame.players}`,
        inline: false,
      }
    )
    .addTip('Click the button below to get another suggestion!');

  const buttons = createButtonRow([
    { customId: 'roblox_random_again', label: 'Another Game', emoji: Emojis.GAMING.DICE, style: 1 },
    { customId: 'gaming_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ⛏️ MINECRAFT COMMANDS
// ═══════════════════════════════════════════════════════════════════════════════

async function handleMinecraft(interaction) {
  const action = interaction.options.getString('action');
  const query = interaction.options.getString('query');
  
  switch (action) {
    case 'player':
      return handleMinecraftPlayer(interaction, query);
    case 'server':
      return handleMinecraftServer(interaction, query);
    case 'skin':
      return handleMinecraftSkin(interaction, query);
    case 'recipe':
      return handleMinecraftRecipe(interaction, query);
    default:
      return interaction.reply({
        content: '❌ Unknown action.',
        ephemeral: true,
      });
  }
}

async function handleMinecraftPlayer(interaction, username) {
  if (!username) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please provide a Minecraft username!`,
      ephemeral: true,
    });
  }

  const embed = minecraftEmbed(
    `Player: ${username}`,
    `${Decorations.FANCY.GAMING}\n\n` +
    `Viewing Minecraft profile for **${username}**\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.GAMING.STAR} Player Info`,
        value: 
          `${Emojis.BULLETS.DOT} **Username:** ${username}\n` +
          `${Emojis.BULLETS.DOT} **UUID:** Loading...\n` +
          `${Emojis.BULLETS.DOT} **Name History:** --`,
        inline: false,
      }
    )
    .setThumbnail(`https://mc-heads.net/avatar/${username}/256`);

  const buttons = createButtonRow([
    { customId: 'mc_skin', label: 'View Skin', emoji: '👤', style: 1 },
    { customId: 'mc_history', label: 'Name History', emoji: '📜', style: 2 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

async function handleMinecraftServer(interaction, serverIp) {
  if (!serverIp) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please provide a server IP address!`,
      ephemeral: true,
    });
  }

  const embed = minecraftEmbed(
    `Server Status`,
    `${Decorations.FANCY.GAMING}\n\n` +
    `Checking status for **${serverIp}**\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.STATUS.LOADING} Status`,
        value: 'Fetching server information...',
        inline: false,
      }
    )
    .addNote('Server status checks may take a few seconds.');

  return interaction.reply({
    embeds: [embed],
  });
}

async function handleMinecraftSkin(interaction, username) {
  if (!username) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please provide a Minecraft username!`,
      ephemeral: true,
    });
  }

  const embed = minecraftEmbed(
    `Skin Viewer: ${username}`,
    `${Decorations.FANCY.GAMING}\n\n` +
    `Viewing skin for **${username}**\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .setImage(`https://mc-heads.net/body/${username}/256`)
    .setThumbnail(`https://mc-heads.net/avatar/${username}/128`);

  const buttons = createButtonRow([
    { customId: 'mc_download_skin', label: 'Download', emoji: '📥', style: 1 },
    { customId: 'mc_3d_view', label: '3D View', emoji: '🔄', style: 2 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

async function handleMinecraftRecipe(interaction, item) {
  if (!item) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please provide an item name!`,
      ephemeral: true,
    });
  }

  const embed = minecraftEmbed(
    `Crafting Recipe: ${item}`,
    `${Decorations.FANCY.GAMING}\n\n` +
    `Searching for crafting recipe: **${item}**\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields({
      name: `${Emojis.STATUS.INFO} Recipe`,
      value: 'Recipe lookup feature coming soon!',
      inline: false,
    })
    .addTip('Try searching for common items like "diamond_sword" or "enchanting_table"');

  return interaction.reply({
    embeds: [embed],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👥 LOOKING FOR GROUP
// ═══════════════════════════════════════════════════════════════════════════════

async function handleLFG(interaction) {
  const game = interaction.options.getString('game');
  const players = interaction.options.getInteger('players') || 1;
  const description = interaction.options.getString('description') || 'No additional details provided.';
  
  const embed = new BotEmbed({ color: Colors.GAMING.GENERAL })
    .setTitle(`${Emojis.COMMUNITY.MEGAPHONE} Looking for Group`)
    .setDescription(
      `${Decorations.FANCY.GAMING}\n\n` +
      `**${interaction.user.username}** is looking for players!\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `${Emojis.GAMING.CONTROLLER} Game`,
        value: game,
        inline: true,
      },
      {
        name: `${Emojis.COMMUNITY.PEOPLE} Players Needed`,
        value: `${players}`,
        inline: true,
      },
      {
        name: `${Emojis.STATUS.ONLINE} Status`,
        value: 'Open',
        inline: true,
      },
      {
        name: `${Emojis.COMMUNITY.CHAT} Details`,
        value: description,
        inline: false,
      }
    )
    .setThumbnail(interaction.user.displayAvatarURL({ size: 128 }))
    .setFooter({ text: `${Branding.FOOTERS.GAMING} • React to join!` });

  const buttons = createButtonRow([
    { customId: `lfg_join_${interaction.user.id}`, label: 'Join', emoji: Emojis.STATUS.SUCCESS, style: 3 },
    { customId: `lfg_info_${interaction.user.id}`, label: 'More Info', emoji: Emojis.STATUS.INFO, style: 2 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}
