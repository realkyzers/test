/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔘 GENERAL INTERACTION HANDLER
 * Handles buttons and select menus for gaming, art, fun, and help commands
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { BotEmbed, gamingEmbed, robloxEmbed, artEmbed, funEmbed } from '../embeds/EmbedBuilder.js';
import { 
  createNavigationButtons,
  createButtonRow,
  createRPSButtons,
  createPlatformSelect,
  createRobloxGameSelect,
  createPromptCategorySelect,
  disableAllComponents,
} from '../embeds/ComponentBuilder.js';
import { Colors, Emojis, Decorations, Branding, Categories } from '../config/theme.js';
import { showMainHelp, showCategoryHelp, showCommandHelp, CommandDatabase } from '../commands/help.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 GAMING INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export async function handleGamingInteraction(interaction) {
  const customId = interaction.customId;
  
  // Platform select
  if (customId === 'gaming_platform') {
    const platform = interaction.values[0];
    
    if (platform === 'roblox') {
      const embed = robloxEmbed(
        'Roblox Hub',
        `${Decorations.FANCY.GAMING}\n\n` +
        `Welcome to the Roblox section!\n` +
        `Select an option below to get started.\n\n` +
        `${Decorations.LINES.THIN}`
      )
        .addFields(
          { name: `${Emojis.BULLETS.ARROW} Profile Lookup`, value: 'Search for Roblox players', inline: true },
          { name: `${Emojis.BULLETS.ARROW} Game Info`, value: 'Explore popular games', inline: true },
          { name: `${Emojis.BULLETS.ARROW} Random Game`, value: 'Get a game suggestion', inline: true },
        );
      
      const gameSelect = createRobloxGameSelect('roblox_game_type');
      const navRow = createNavigationButtons({ homeId: 'gaming_hub', closeId: 'gaming_close' });
      
      return interaction.update({
        embeds: [embed],
        components: [gameSelect, navRow],
      });
    }
    
    if (platform === 'minecraft') {
      const embed = new BotEmbed({ color: Colors.GAMING.MINECRAFT })
        .setTitle(`${Emojis.CATEGORIES.MINECRAFT} Minecraft Hub`)
        .setDescription(
          `${Decorations.FANCY.GAMING}\n\n` +
          `Welcome to the Minecraft section!\n` +
          `Use \`/gaming minecraft\` commands to access features.\n\n` +
          `${Decorations.LINES.THIN}`
        )
        .addFields(
          { name: `${Emojis.BULLETS.ARROW} Player Lookup`, value: '`/gaming minecraft player <username>`', inline: false },
          { name: `${Emojis.BULLETS.ARROW} Server Status`, value: '`/gaming minecraft server <ip>`', inline: false },
          { name: `${Emojis.BULLETS.ARROW} Skin Viewer`, value: '`/gaming minecraft skin <username>`', inline: false },
        );
      
      const navRow = createNavigationButtons({ homeId: 'gaming_hub', closeId: 'gaming_close' });
      
      return interaction.update({
        embeds: [embed],
        components: [navRow],
      });
    }
    
    // General gaming
    const embed = gamingEmbed(
      'General Gaming',
      `${Decorations.FANCY.GAMING}\n\n` +
      `General gaming features and utilities.\n\n` +
      `${Decorations.LINES.THIN}`
    )
      .addFields(
        { name: `${Emojis.BULLETS.ARROW} Looking for Group`, value: '`/gaming lfg <game>`', inline: false },
        { name: `${Emojis.BULLETS.ARROW} Game Sessions`, value: 'Coming soon!', inline: false },
      );
    
    const navRow = createNavigationButtons({ homeId: 'gaming_hub', closeId: 'gaming_close' });
    
    return interaction.update({
      embeds: [embed],
      components: [navRow],
    });
  }
  
  // Gaming hub button
  if (customId === 'gaming_hub') {
    const embed = new BotEmbed({ color: Colors.GAMING.MAIN })
      .setTitle(`${Emojis.CATEGORIES.GAMING} 【 Gaming Hub 】`)
      .setDescription(
        `${Decorations.FANCY.GAMING}\n\n` +
        `Welcome to the **BlackHawks Gaming Hub**!\n` +
        `Your one-stop destination for all gaming features.\n\n` +
        `${Decorations.LINES.THIN}`
      )
      .addFields(
        { name: `${Emojis.CATEGORIES.ROBLOX} Roblox`, value: 'Profile lookups, game info', inline: true },
        { name: `${Emojis.CATEGORIES.MINECRAFT} Minecraft`, value: 'Player lookups, server status', inline: true },
        { name: `${Emojis.GAMING.CONTROLLER} General`, value: 'LFG, game sessions', inline: true },
      );
    
    const platformSelect = createPlatformSelect('gaming_platform');
    const navRow = createNavigationButtons({ home: false, closeId: 'gaming_close' });
    
    return interaction.update({
      embeds: [embed],
      components: [platformSelect, navRow],
    });
  }
  
  // Close button
  if (customId === 'gaming_close') {
    return interaction.update({
      content: `${Emojis.STATUS.SUCCESS} Gaming hub closed. Use \`/gaming hub\` to open it again!`,
      embeds: [],
      components: [],
    });
  }
  
  // Random game button
  if (customId === 'roblox_random_again') {
    const games = [
      { name: 'Adopt Me!', genre: 'Roleplay', players: '500K+' },
      { name: 'Blox Fruits', genre: 'Adventure', players: '300K+' },
      { name: 'Murder Mystery 2', genre: 'Horror', players: '100K+' },
      { name: 'Tower of Hell', genre: 'Obby', players: '150K+' },
      { name: 'Brookhaven', genre: 'Roleplay', players: '400K+' },
    ];
    
    const randomGame = games[Math.floor(Math.random() * games.length)];
    
    const embed = robloxEmbed(
      '🎲 Random Game Suggestion',
      `${Decorations.FANCY.GAMING}\n\n` +
      `Here's a random game for you to try!\n\n` +
      `${Decorations.LINES.THIN}`
    )
      .addFields({
        name: `${Emojis.GAMING.STAR} ${randomGame.name}`,
        value: `**Genre:** ${randomGame.genre}\n**Active Players:** ${randomGame.players}`,
        inline: false,
      });
    
    const buttons = createButtonRow([
      { customId: 'roblox_random_again', label: 'Another Game', emoji: Emojis.GAMING.DICE, style: 1 },
      { customId: 'gaming_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
    ]);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 ART INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ArtPrompts = {
  character: [
    'A mysterious traveler with a glowing lantern in a dark forest',
    'A cyberpunk street vendor selling exotic fruits',
    'An ancient guardian made of living stone and moss',
  ],
  environment: [
    'A floating city above the clouds at sunset',
    'An underwater temple with bioluminescent coral',
    'A cozy treehouse village in an enchanted forest',
  ],
  object: [
    'A music box that plays memories instead of songs',
    'A sword forged from crystallized starlight',
    'A potion bottle containing a miniature storm',
  ],
  abstract: [
    'The feeling of nostalgia as a landscape',
    'Music visualized as flowing colors',
    'The concept of time as a physical space',
  ],
  fanart: [
    'Your favorite character in a different art style',
    'A crossover between two of your favorite series',
    'A villain redemption scene',
  ],
};

export async function handleArtInteraction(interaction) {
  const customId = interaction.customId;
  
  // Prompt category select
  if (customId === 'art_prompt_category') {
    let category = interaction.values[0];
    
    if (category === 'random') {
      const categories = Object.keys(ArtPrompts);
      category = categories[Math.floor(Math.random() * categories.length)];
    }
    
    const prompts = ArtPrompts[category];
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    const categoryNames = {
      character: 'Character Design',
      environment: 'Environment',
      object: 'Object/Item',
      abstract: 'Abstract',
      fanart: 'Fan Art',
    };
    
    const embed = new BotEmbed({ color: Colors.ART.PROMPTS })
      .setTitle(`${Emojis.ART.MAGIC} Art Prompt`)
      .setDescription(
        `${Decorations.FANCY.ART}\n\n` +
        `**${Emojis.ART.SPARKLES} Your Prompt:**\n` +
        `> ${prompt}\n\n` +
        `${Decorations.LINES.THIN}`
      )
      .addFields(
        { name: `${Emojis.BULLETS.STAR} Category`, value: categoryNames[category], inline: true },
        { name: `${Emojis.GAMING.DICE} Difficulty`, value: '⭐'.repeat(Math.floor(Math.random() * 5) + 1), inline: true },
      );
    
    const buttons = createButtonRow([
      { customId: 'art_prompt_new', label: 'New Prompt', emoji: Emojis.NAV.REFRESH, style: 1 },
      { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
    ]);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // New prompt button
  if (customId === 'art_prompt_new' || customId.startsWith('art_prompt_')) {
    const categories = Object.keys(ArtPrompts);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const prompts = ArtPrompts[category];
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    const categoryNames = {
      character: 'Character Design',
      environment: 'Environment',
      object: 'Object/Item',
      abstract: 'Abstract',
      fanart: 'Fan Art',
    };
    
    const embed = new BotEmbed({ color: Colors.ART.PROMPTS })
      .setTitle(`${Emojis.ART.MAGIC} Art Prompt`)
      .setDescription(
        `${Decorations.FANCY.ART}\n\n` +
        `**${Emojis.ART.SPARKLES} Your Prompt:**\n` +
        `> ${prompt}\n\n` +
        `${Decorations.LINES.THIN}`
      )
      .addFields(
        { name: `${Emojis.BULLETS.STAR} Category`, value: categoryNames[category], inline: true },
        { name: `${Emojis.GAMING.DICE} Difficulty`, value: '⭐'.repeat(Math.floor(Math.random() * 5) + 1), inline: true },
      );
    
    const buttons = createButtonRow([
      { customId: 'art_prompt_new', label: 'New Prompt', emoji: Emojis.NAV.REFRESH, style: 1 },
      { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
    ]);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // Palette buttons
  if (customId === 'art_palette_new' || customId.startsWith('art_palette_')) {
    const palettes = [
      ['#FF6B6B', '#FFA07A', '#FFD93D', '#FF8C42', '#E85D04'],
      ['#48CAE4', '#00B4D8', '#0077B6', '#023E8A', '#03045E'],
      ['#FF006E', '#8338EC', '#3A86FF', '#06D6A0', '#FFD60A'],
    ];
    
    const palette = palettes[Math.floor(Math.random() * palettes.length)];
    const colorBlocks = palette.map(color => `\`${color}\``).join(' ');
    
    const embed = new BotEmbed({ color: parseInt(palette[0].replace('#', ''), 16) })
      .setTitle(`${Emojis.ART.PALETTE} Color Palette`)
      .setDescription(
        `${Decorations.FANCY.ART}\n\n` +
        `${colorBlocks}\n\n` +
        `${Decorations.LINES.THIN}`
      )
      .addFields({
        name: `${Emojis.ART.BRUSH} Colors`,
        value: palette.map((color, i) => `${Emojis.NUMBERS[i + 1]} ${color}`).join('\n'),
        inline: true,
      });
    
    const buttons = createButtonRow([
      { customId: 'art_palette_new', label: 'New Palette', emoji: Emojis.NAV.REFRESH, style: 1 },
      { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
    ]);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // Close button
  if (customId === 'art_close') {
    return interaction.update({
      content: `${Emojis.STATUS.SUCCESS} Art hub closed. Use \`/art hub\` to open it again!`,
      embeds: [],
      components: [],
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎉 FUN INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export async function handleFunInteraction(interaction) {
  const customId = interaction.customId;
  
  // Rock Paper Scissors
  if (customId.startsWith('rps_bot_')) {
    const choice = customId.split('_').pop();
    const choices = ['rock', 'paper', 'scissors'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    
    let result, color;
    if (choice === botChoice) {
      result = "It's a tie!";
      color = Colors.WARNING;
    } else if (
      (choice === 'rock' && botChoice === 'scissors') ||
      (choice === 'paper' && botChoice === 'rock') ||
      (choice === 'scissors' && botChoice === 'paper')
    ) {
      result = 'You win! 🎉';
      color = Colors.SUCCESS;
    } else {
      result = 'You lose! 😢';
      color = Colors.ERROR;
    }
    
    const embed = new BotEmbed({ color })
      .setTitle(`${Emojis.GAMING.TROPHY} Rock Paper Scissors - Result`)
      .setDescription(
        `${Decorations.FANCY.GAMING}\n\n` +
        `**Your choice:** ${emojis[choice]} ${choice}\n` +
        `**Bot's choice:** ${emojis[botChoice]} ${botChoice}\n\n` +
        `**${result}**\n\n` +
        `${Decorations.LINES.THIN}`
      );
    
    const buttons = createButtonRow([
      { customId: `rps_bot_${interaction.user.id}_rematch`, label: 'Play Again', emoji: Emojis.NAV.REFRESH, style: 1 },
      { customId: 'fun_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
    ]);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // RPS Rematch
  if (customId.includes('_rematch')) {
    const embed = funEmbed(
      'Rock Paper Scissors',
      `${Decorations.FANCY.GAMING}\n\n` +
      `Choose your weapon!\n\n` +
      `${Decorations.LINES.THIN}`
    );
    
    const buttons = createRPSButtons(`rps_bot_${interaction.user.id}`);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // Trivia answers
  if (customId.startsWith('trivia_')) {
    const isCorrect = customId.includes('correct');
    
    const embed = new BotEmbed({ color: isCorrect ? Colors.SUCCESS : Colors.ERROR })
      .setTitle(isCorrect ? `${Emojis.STATUS.SUCCESS} Correct!` : `${Emojis.STATUS.ERROR} Wrong!`)
      .setDescription(
        `${Decorations.FANCY.SPARKLE}\n\n` +
        (isCorrect ? 'Great job! You got it right! 🎉' : 'Better luck next time! 😢') +
        `\n\n${Decorations.LINES.THIN}`
      );
    
    const buttons = createButtonRow([
      { customId: 'fun_trivia_new', label: 'New Question', emoji: Emojis.NAV.REFRESH, style: 1 },
      { customId: 'fun_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
    ]);
    
    return interaction.update({
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // Close button
  if (customId === 'fun_close') {
    return interaction.update({
      content: `${Emojis.STATUS.SUCCESS} Game closed. Use \`/fun\` commands to play again!`,
      embeds: [],
      components: [],
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ❓ HELP INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export async function handleHelpInteraction(interaction) {
  const customId = interaction.customId;
  
  // Category select menu
  if (customId === 'help_category') {
    const category = interaction.values[0];
    
    if (category === 'home') {
      // Rebuild main help
      const client = interaction.client;
      
      const embed = new BotEmbed({ color: Colors.PRIMARY })
        .setTitle(`${Emojis.CATEGORIES.HELP} 【 ${Branding.BOT_NAME} Help Center 】`)
        .setDescription(
          `${Decorations.FANCY.SPARKLE}\n\n` +
          `Welcome to **${Branding.BOT_NAME}**!\n` +
          `${Branding.BOT_TAGLINE}\n\n` +
          `${Decorations.LINES.THIN}`
        )
        .addFields(
          { name: `${Emojis.CATEGORIES.GAMING} Gaming`, value: '`/gaming`', inline: true },
          { name: `${Emojis.CATEGORIES.ART} Art`, value: '`/art`', inline: true },
          { name: `${Emojis.CATEGORIES.FUN} Fun`, value: '`/fun`', inline: true },
          { name: `${Emojis.CATEGORIES.LORE} Lore`, value: '`/lore`', inline: true },
          { name: `${Emojis.CATEGORIES.MOMENTS} Moments`, value: '`/moment`', inline: true },
          { name: `${Emojis.CATEGORIES.ADMIN} Admin`, value: '`/configure`', inline: true },
        )
        .setThumbnail(client.user.displayAvatarURL({ size: 256 }));
      
      const { createCategorySelectMenu, createHelpCategoryButtons, createNavigationButtons } = await import('../embeds/ComponentBuilder.js');
      const categorySelect = createCategorySelectMenu('help_category');
      const [row1, row2] = createHelpCategoryButtons('help_cat');
      const navRow = createNavigationButtons({ home: false, closeId: 'help_close' });
      
      return interaction.update({
        embeds: [embed],
        components: [categorySelect, row1, row2, navRow],
      });
    }
    
    // Show category
    return showCategoryHelpUpdate(interaction, category);
  }
  
  // Category buttons
  if (customId.startsWith('help_cat_')) {
    const category = customId.replace('help_cat_', '');
    return showCategoryHelpUpdate(interaction, category);
  }
  
  // Command buttons
  if (customId.startsWith('help_cmd_')) {
    const commandName = customId.replace('help_cmd_', '');
    return showCommandHelpUpdate(interaction, commandName);
  }
  
  // Home button
  if (customId === 'help_home') {
    const client = interaction.client;
    
    const embed = new BotEmbed({ color: Colors.PRIMARY })
      .setTitle(`${Emojis.CATEGORIES.HELP} 【 ${Branding.BOT_NAME} Help Center 】`)
      .setDescription(
        `${Decorations.FANCY.SPARKLE}\n\n` +
        `Welcome to **${Branding.BOT_NAME}**!\n` +
        `${Branding.BOT_TAGLINE}\n\n` +
        `${Decorations.LINES.THIN}`
      )
      .addFields(
        { name: `${Emojis.CATEGORIES.GAMING} Gaming`, value: '`/gaming`', inline: true },
        { name: `${Emojis.CATEGORIES.ART} Art`, value: '`/art`', inline: true },
        { name: `${Emojis.CATEGORIES.FUN} Fun`, value: '`/fun`', inline: true },
        { name: `${Emojis.CATEGORIES.LORE} Lore`, value: '`/lore`', inline: true },
        { name: `${Emojis.CATEGORIES.MOMENTS} Moments`, value: '`/moment`', inline: true },
        { name: `${Emojis.CATEGORIES.ADMIN} Admin`, value: '`/configure`', inline: true },
      )
      .setThumbnail(client.user.displayAvatarURL({ size: 256 }));
    
    const { createCategorySelectMenu, createHelpCategoryButtons, createNavigationButtons } = await import('../embeds/ComponentBuilder.js');
    const categorySelect = createCategorySelectMenu('help_category');
    const [row1, row2] = createHelpCategoryButtons('help_cat');
    const navRow = createNavigationButtons({ home: false, closeId: 'help_close' });
    
    return interaction.update({
      embeds: [embed],
      components: [categorySelect, row1, row2, navRow],
    });
  }
  
  // Close button
  if (customId === 'help_close') {
    return interaction.update({
      content: `${Emojis.STATUS.SUCCESS} Help menu closed. Use \`/help\` to open it again!`,
      embeds: [],
      components: [],
    });
  }
}

async function showCategoryHelpUpdate(interaction, categoryId) {
  const category = Categories[categoryId.toUpperCase()];
  const commands = Object.values(CommandDatabase).filter(cmd => cmd.category === categoryId);
  
  if (commands.length === 0) {
    return interaction.update({
      content: `${Emojis.STATUS.ERROR} No commands found in this category.`,
      embeds: [],
      components: [],
    });
  }
  
  const embed = new BotEmbed({ color: category?.color || Colors.PRIMARY })
    .setTitle(`${category?.emoji || '📋'} 【 ${category?.name || categoryId} Commands 】`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `${category?.description || 'Commands in this category.'}\n\n` +
      `${Decorations.LINES.THIN}`
    );
  
  commands.forEach(cmd => {
    embed.addFields({
      name: `${cmd.emoji} /${cmd.name}`,
      value: `${Emojis.BULLETS.ARROW} ${cmd.description}`,
      inline: false,
    });
  });
  
  const commandButtons = createButtonRow(
    commands.slice(0, 4).map(cmd => ({
      customId: `help_cmd_${cmd.name}`,
      label: cmd.name,
      emoji: cmd.emoji,
      style: 1,
    }))
  );
  
  const navRow = createNavigationButtons({ homeId: 'help_home', closeId: 'help_close' });
  
  return interaction.update({
    embeds: [embed],
    components: [commandButtons, navRow],
  });
}

async function showCommandHelpUpdate(interaction, commandName) {
  const command = CommandDatabase[commandName];
  
  if (!command) {
    return interaction.update({
      content: `${Emojis.STATUS.ERROR} Command not found.`,
      embeds: [],
      components: [],
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
    .addFields({
      name: `${Emojis.STATUS.INFO} Command Info`,
      value: 
        `${Emojis.BULLETS.DOT} **Category:** ${category?.name || command.category}\n` +
        `${Emojis.BULLETS.DOT} **Permission:** ${command.permission}`,
      inline: false,
    });
  
  if (command.subcommands.length > 0) {
    command.subcommands.slice(0, 5).forEach((sub, index) => {
      embed.addFields({
        name: `${Emojis.NUMBERS[index + 1]} ${sub.name}`,
        value: `${sub.description}\n\`${sub.usage}\``,
        inline: false,
      });
    });
  }
  
  const navRow = createNavigationButtons({ homeId: 'help_home', closeId: 'help_close' });
  
  return interaction.update({
    embeds: [embed],
    components: [navRow],
  });
}

export default {
  handleGamingInteraction,
  handleArtInteraction,
  handleFunInteraction,
  handleHelpInteraction,
};
