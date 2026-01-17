/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ❓ COMPREHENSIVE HELP COMMAND
 * Interactive help system with category navigation and detailed command info
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { SlashCommandBuilder } from 'discord.js';
import { BotEmbed, helpEmbed } from '../embeds/EmbedBuilder.js';
import { 
  createHelpCategoryButtons,
  createCategorySelectMenu,
  createNavigationButtons,
  createButtonRow,
  createSelectMenu,
} from '../embeds/ComponentBuilder.js';
import { Colors, Emojis, Decorations, Branding, Categories } from '../config/theme.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 📚 COMMAND DATABASE
// ═══════════════════════════════════════════════════════════════════════════════

export const CommandDatabase = {
  // Gaming Commands
  gaming: {
    name: 'gaming',
    description: 'Gaming utilities for Roblox, Minecraft, and more',
    category: 'gaming',
    emoji: Emojis.CATEGORIES.GAMING,
    permission: 'everyone',
    cooldown: null,
    subcommands: [
      { name: 'hub', description: 'Open the gaming hub with all features', usage: '/gaming hub' },
      { name: 'roblox', description: 'Roblox utilities and information', usage: '/gaming roblox <action> [username]' },
      { name: 'minecraft', description: 'Minecraft utilities and information', usage: '/gaming minecraft <action> [query]' },
      { name: 'lfg', description: 'Looking for group - Find players', usage: '/gaming lfg <game> [players] [description]' },
    ],
  },
  
  // Art Commands
  art: {
    name: 'art',
    description: 'Art tools, prompts, and showcase features',
    category: 'art',
    emoji: Emojis.CATEGORIES.ART,
    permission: 'everyone',
    cooldown: null,
    subcommands: [
      { name: 'hub', description: 'Open the art hub with all features', usage: '/art hub' },
      { name: 'prompt', description: 'Get a random art prompt', usage: '/art prompt [category]' },
      { name: 'showcase', description: 'Showcase your artwork', usage: '/art showcase <artwork> <title> [description]' },
      { name: 'palette', description: 'Generate a color palette', usage: '/art palette [mood]' },
      { name: 'challenge', description: 'Get a timed art challenge', usage: '/art challenge [difficulty]' },
      { name: 'tips', description: 'Get random art tips', usage: '/art tips [topic]' },
    ],
  },
  
  // Fun Commands
  fun: {
    name: 'fun',
    description: 'Fun games and interactive features',
    category: 'fun',
    emoji: Emojis.CATEGORIES.FUN,
    permission: 'everyone',
    cooldown: null,
    subcommands: [
      { name: 'rps', description: 'Play Rock Paper Scissors', usage: '/fun rps [opponent]' },
      { name: '8ball', description: 'Ask the magic 8-ball', usage: '/fun 8ball <question>' },
      { name: 'roll', description: 'Roll dice', usage: '/fun roll [dice]' },
      { name: 'flip', description: 'Flip a coin', usage: '/fun flip [times]' },
      { name: 'choose', description: 'Let the bot choose for you', usage: '/fun choose <options>' },
      { name: 'trivia', description: 'Answer a trivia question', usage: '/fun trivia [category]' },
      { name: 'guess', description: 'Guess the number game', usage: '/fun guess [difficulty]' },
      { name: 'rate', description: 'Rate something out of 10', usage: '/fun rate <thing>' },
      { name: 'ship', description: 'Calculate love compatibility', usage: '/fun ship <user1> <user2>' },
    ],
  },
  
  // Lore Commands
  lore: {
    name: 'lore',
    description: 'Manage server lore and stories',
    category: 'lore',
    emoji: Emojis.CATEGORIES.LORE,
    permission: 'everyone',
    cooldown: null,
    subcommands: [
      { name: 'submit', description: 'Submit a new lore entry', usage: '/lore submit' },
      { name: 'view', description: 'View the current lore', usage: '/lore view' },
      { name: 'history', description: 'View lore version history', usage: '/lore history' },
    ],
  },
  
  // Moment Commands
  moment: {
    name: 'moment',
    description: 'Capture and share memorable moments',
    category: 'moments',
    emoji: Emojis.CATEGORIES.MOMENTS,
    permission: 'everyone',
    cooldown: null,
    subcommands: [
      { name: 'submit', description: 'Submit a new moment', usage: '/moment submit' },
      { name: 'view', description: 'View approved moments', usage: '/moment view' },
      { name: 'random', description: 'Get a random moment', usage: '/moment random' },
    ],
  },
  
  // Configure Commands
  configure: {
    name: 'configure',
    description: 'Configure bot settings and channels',
    category: 'admin',
    emoji: Emojis.CATEGORIES.ADMIN,
    permission: 'Administrator',
    cooldown: null,
    subcommands: [
      { name: 'set_lore_submission_channel', description: 'Set lore submission channel', usage: '/configure set_lore_submission_channel <channel>' },
      { name: 'set_moment_submission_channel', description: 'Set moment submission channel', usage: '/configure set_moment_submission_channel <channel>' },
      { name: 'set_verification_channel', description: 'Set verification channel', usage: '/configure set_verification_channel <channel>' },
      { name: 'set_verifier_role', description: 'Set verifier role', usage: '/configure set_verifier_role <role>' },
      { name: 'view', description: 'View current configuration', usage: '/configure view' },
    ],
  },
  
  // Help Command
  help: {
    name: 'help',
    description: 'Display this help menu',
    category: 'community',
    emoji: Emojis.CATEGORIES.HELP,
    permission: 'everyone',
    cooldown: null,
    subcommands: [],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 COMMAND DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Display the interactive help menu with all available commands')
  .addStringOption(opt =>
    opt.setName('command')
      .setDescription('Get detailed help for a specific command')
      .setRequired(false)
      .addChoices(
        { name: '🎮 /gaming - Gaming utilities', value: 'gaming' },
        { name: '🎨 /art - Art tools and prompts', value: 'art' },
        { name: '🎉 /fun - Games and interactions', value: 'fun' },
        { name: '📖 /lore - Lore management', value: 'lore' },
        { name: '📸 /moment - Moment capture', value: 'moment' },
        { name: '⚙️ /configure - Bot configuration', value: 'configure' },
      )
  )
  .addStringOption(opt =>
    opt.setName('category')
      .setDescription('View commands in a specific category')
      .setRequired(false)
      .addChoices(
        { name: '🎮 Gaming', value: 'gaming' },
        { name: '🎨 Art', value: 'art' },
        { name: '🎉 Fun', value: 'fun' },
        { name: '📖 Lore', value: 'lore' },
        { name: '📸 Moments', value: 'moments' },
        { name: '⚙️ Admin', value: 'admin' },
        { name: '👥 Community', value: 'community' },
      )
  );

// ═══════════════════════════════════════════════════════════════════════════════
// ⚡ COMMAND EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

export async function execute(interaction) {
  const commandOption = interaction.options.getString('command');
  const categoryOption = interaction.options.getString('category');
  
  if (commandOption) {
    return showCommandHelp(interaction, commandOption);
  }
  
  if (categoryOption) {
    return showCategoryHelp(interaction, categoryOption);
  }
  
  return showMainHelp(interaction);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🏠 MAIN HELP MENU
// ═══════════════════════════════════════════════════════════════════════════════

async function showMainHelp(interaction) {
  const client = interaction.client;
  
  const embed = new BotEmbed({ color: Colors.PRIMARY })
    .setTitle(`${Emojis.CATEGORIES.HELP} 【 ${Branding.BOT_NAME} Help Center 】`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `Welcome to **${Branding.BOT_NAME}**!\n` +
      `${Branding.BOT_TAGLINE}\n\n` +
      `${Decorations.LINES.THIN}\n\n` +
      `${Emojis.COMMUNITY.LIGHTBULB} **Quick Start:** Use the buttons or dropdown below to explore commands by category.\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `${Emojis.CATEGORIES.GAMING} Gaming`,
        value: `Roblox, Minecraft & more\n\`/gaming\``,
        inline: true,
      },
      {
        name: `${Emojis.CATEGORIES.ART} Art`,
        value: `Prompts, showcases & tools\n\`/art\``,
        inline: true,
      },
      {
        name: `${Emojis.CATEGORIES.FUN} Fun`,
        value: `Games & interactions\n\`/fun\``,
        inline: true,
      },
      {
        name: `${Emojis.CATEGORIES.LORE} Lore`,
        value: `Server storytelling\n\`/lore\``,
        inline: true,
      },
      {
        name: `${Emojis.CATEGORIES.MOMENTS} Moments`,
        value: `Capture memories\n\`/moment\``,
        inline: true,
      },
      {
        name: `${Emojis.CATEGORIES.ADMIN} Admin`,
        value: `Bot configuration\n\`/configure\``,
        inline: true,
      }
    )
    .addFields({
      name: `${Decorations.LINES.THIN}`,
      value: 
        `${Emojis.STATUS.ONLINE} **Bot Status:** Online\n` +
        `${Emojis.GAMING.CONTROLLER} **Commands:** ${Object.keys(CommandDatabase).length} available\n` +
        `${Emojis.COMMUNITY.PEOPLE} **Servers:** ${client.guilds.cache.size}`,
      inline: false,
    })
    .setThumbnail(client.user.displayAvatarURL({ size: 256 }))
    .setFooter({ text: `${Decorations.BULLETS.STAR} ${Branding.FOOTERS.DEFAULT} ${Decorations.BULLETS.STAR}` });

  const categorySelect = createCategorySelectMenu('help_category');
  const [row1, row2] = createHelpCategoryButtons('help_cat');
  const navRow = createNavigationButtons({ home: false, closeId: 'help_close' });

  return interaction.reply({
    embeds: [embed],
    components: [categorySelect, row1, row2, navRow],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📂 CATEGORY HELP
// ═══════════════════════════════════════════════════════════════════════════════

async function showCategoryHelp(interaction, categoryId) {
  const category = Categories[categoryId.toUpperCase()];
  const commands = Object.values(CommandDatabase).filter(cmd => cmd.category === categoryId);
  
  if (commands.length === 0) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} No commands found in this category.`,
      ephemeral: true,
    });
  }
  
  const categoryEmoji = category?.emoji || Emojis.BULLETS.ARROW;
  const categoryColor = category?.color || Colors.PRIMARY;
  const categoryName = category?.name || categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  
  const embed = new BotEmbed({ color: categoryColor })
    .setTitle(`${categoryEmoji} 【 ${categoryName} Commands 】`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `${category?.description || 'Commands in this category.'}\n\n` +
      `${Decorations.LINES.THIN}`
    );
  
  commands.forEach(cmd => {
    const subcommandList = cmd.subcommands.length > 0
      ? cmd.subcommands.map(sub => `\`${sub.name}\``).join(', ')
      : 'No subcommands';
    
    embed.addFields({
      name: `${cmd.emoji} /${cmd.name}`,
      value: 
        `${Emojis.BULLETS.ARROW} ${cmd.description}\n` +
        `${Emojis.BULLETS.DOT} **Subcommands:** ${subcommandList}\n` +
        `${Emojis.BULLETS.DOT} **Permission:** ${cmd.permission}`,
      inline: false,
    });
  });
  
  embed.addFields({
    name: `${Decorations.LINES.THIN}`,
    value: `${Emojis.COMMUNITY.LIGHTBULB} **Tip:** Click a command button below for detailed information!`,
    inline: false,
  });
  
  // Create command buttons
  const commandButtons = createButtonRow(
    commands.slice(0, 4).map(cmd => ({
      customId: `help_cmd_${cmd.name}`,
      label: cmd.name,
      emoji: cmd.emoji,
      style: 1,
    }))
  );
  
  const navRow = createNavigationButtons({ homeId: 'help_home', closeId: 'help_close' });

  return interaction.reply({
    embeds: [embed],
    components: [commandButtons, navRow],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📝 COMMAND HELP
// ═══════════════════════════════════════════════════════════════════════════════

async function showCommandHelp(interaction, commandName) {
  const command = CommandDatabase[commandName];
  
  if (!command) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Command not found.`,
      ephemeral: true,
    });
  }
  
  const category = Categories[command.category.toUpperCase()];
  
  const embed = new BotEmbed({ color: category?.color || Colors.PRIMARY })
    .setTitle(`${command.emoji} /${command.name}`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `${command.description}\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `${Emojis.STATUS.INFO} Command Info`,
        value: 
          `${Emojis.BULLETS.DOT} **Category:** ${category?.name || command.category}\n` +
          `${Emojis.BULLETS.DOT} **Permission:** ${command.permission}\n` +
          `${Emojis.BULLETS.DOT} **Cooldown:** ${command.cooldown ? `${command.cooldown}s` : 'None'}`,
        inline: false,
      }
    );
  
  if (command.subcommands.length > 0) {
    embed.addFields({
      name: `${Decorations.LINES.THIN}`,
      value: `**${Emojis.BULLETS.STAR} Subcommands:**`,
      inline: false,
    });
    
    command.subcommands.forEach((sub, index) => {
      embed.addFields({
        name: `${Emojis.NUMBERS[index + 1] || `${index + 1}.`} ${sub.name}`,
        value: 
          `${Emojis.BULLETS.ARROW} ${sub.description}\n` +
          `\`\`\`\n${sub.usage}\n\`\`\``,
        inline: false,
      });
    });
  }
  
  embed.addFields({
    name: `${Decorations.LINES.THIN}`,
    value: getCommandTips(commandName),
    inline: false,
  });
  
  const navRow = createNavigationButtons({ homeId: 'help_home', closeId: 'help_close' });

  return interaction.reply({
    embeds: [embed],
    components: [navRow],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💡 COMMAND TIPS
// ═══════════════════════════════════════════════════════════════════════════════

function getCommandTips(commandName) {
  const tips = {
    gaming: `${Emojis.COMMUNITY.LIGHTBULB} **Tips:**\n` +
      `${Emojis.BULLETS.DOT} Use \`/gaming hub\` for quick access to all gaming features\n` +
      `${Emojis.BULLETS.DOT} Connect your Roblox/Minecraft accounts for personalized stats\n` +
      `${Emojis.BULLETS.DOT} Use \`/gaming lfg\` to find players for your favorite games`,
    art: `${Emojis.COMMUNITY.LIGHTBULB} **Tips:**\n` +
      `${Emojis.BULLETS.DOT} Use \`/art prompt random\` for surprise inspiration\n` +
      `${Emojis.BULLETS.DOT} Share your finished art with \`/art showcase\`\n` +
      `${Emojis.BULLETS.DOT} Try timed challenges to improve your speed!`,
    fun: `${Emojis.COMMUNITY.LIGHTBULB} **Tips:**\n` +
      `${Emojis.BULLETS.DOT} Challenge friends to Rock Paper Scissors!\n` +
      `${Emojis.BULLETS.DOT} Use dice notation like \`2d6+5\` for complex rolls\n` +
      `${Emojis.BULLETS.DOT} Trivia questions have a 30-second time limit`,
    lore: `${Emojis.COMMUNITY.LIGHTBULB} **Tips:**\n` +
      `${Emojis.BULLETS.DOT} Lore submissions are reviewed before publishing\n` +
      `${Emojis.BULLETS.DOT} Check \`/lore history\` to see how the story evolved\n` +
      `${Emojis.BULLETS.DOT} Keep entries engaging and well-written`,
    moment: `${Emojis.COMMUNITY.LIGHTBULB} **Tips:**\n` +
      `${Emojis.BULLETS.DOT} Include context with your moment submissions\n` +
      `${Emojis.BULLETS.DOT} Use \`/moment random\` for a trip down memory lane\n` +
      `${Emojis.BULLETS.DOT} Moments can include images, quotes, or descriptions`,
    configure: `${Emojis.STATUS.WARNING} **Important:**\n` +
      `${Emojis.BULLETS.DOT} Only administrators can use these commands\n` +
      `${Emojis.BULLETS.DOT} Set up all channels before using lore/moment features\n` +
      `${Emojis.BULLETS.DOT} The verifier role determines who can approve submissions`,
    help: `${Emojis.COMMUNITY.LIGHTBULB} **Tips:**\n` +
      `${Emojis.BULLETS.DOT} Use category buttons for quick navigation\n` +
      `${Emojis.BULLETS.DOT} The dropdown menu shows all available categories\n` +
      `${Emojis.BULLETS.DOT} Click on specific commands for detailed information`,
  };
  
  return tips[commandName] || `${Emojis.COMMUNITY.LIGHTBULB} **Tip:** Explore all available options!`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 EXPORT FOR INTERACTION HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export { showMainHelp, showCategoryHelp, showCommandHelp };
