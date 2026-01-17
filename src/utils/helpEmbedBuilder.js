/**
 * Help Embed Builder
 * Creates beautifully styled embeds for the help command system
 */

import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from 'discord.js';
import {
  Colors,
  Decorations,
  CategoryEmojis,
  ButtonStyles,
  DropdownOptions,
  Badges,
  TextFormat,
  EmbedTemplates,
  Images,
} from './helpStyles.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 📚 COMMAND DATA DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const CommandData = {
  lore: {
    name: 'lore',
    description: 'Manage server lore and stories',
    category: 'lore',
    permission: 'user',
    cooldown: null,
    premium: false,
    subcommands: [
      {
        name: 'submit',
        description: 'Submit a new lore entry for verification',
        usage: '/lore submit',
        example: '/lore submit',
        args: [],
      },
      {
        name: 'view',
        description: 'View the current approved lore',
        usage: '/lore view',
        example: '/lore view',
        args: [],
      },
      {
        name: 'history',
        description: 'View the history of lore versions',
        usage: '/lore history',
        example: '/lore history',
        args: [],
      },
    ],
  },
  moment: {
    name: 'moment',
    description: 'Capture and share memorable moments',
    category: 'moments',
    permission: 'user',
    cooldown: null,
    premium: false,
    subcommands: [
      {
        name: 'submit',
        description: 'Submit a new moment for verification',
        usage: '/moment submit',
        example: '/moment submit',
        args: [],
      },
      {
        name: 'view',
        description: 'View approved moments',
        usage: '/moment view',
        example: '/moment view',
        args: [],
      },
      {
        name: 'random',
        description: 'Get a random moment from the collection',
        usage: '/moment random',
        example: '/moment random',
        args: [],
      },
    ],
  },
  configure: {
    name: 'configure',
    description: 'Configure bot settings and channels',
    category: 'admin',
    permission: 'admin',
    cooldown: null,
    premium: false,
    subcommands: [
      {
        name: 'set_lore_submission_channel',
        description: 'Set the channel for lore submissions',
        usage: '/configure set_lore_submission_channel <channel>',
        example: '/configure set_lore_submission_channel #lore-submit',
        args: [{ name: 'channel', type: 'Channel', required: true }],
      },
      {
        name: 'set_moment_submission_channel',
        description: 'Set the channel for moment submissions',
        usage: '/configure set_moment_submission_channel <channel>',
        example: '/configure set_moment_submission_channel #moments-submit',
        args: [{ name: 'channel', type: 'Channel', required: true }],
      },
      {
        name: 'set_verification_channel',
        description: 'Set the channel for verifying submissions',
        usage: '/configure set_verification_channel <channel>',
        example: '/configure set_verification_channel #verify',
        args: [{ name: 'channel', type: 'Channel', required: true }],
      },
      {
        name: 'set_verifier_role',
        description: 'Set the role that can verify submissions',
        usage: '/configure set_verifier_role <role>',
        example: '/configure set_verifier_role @Verifiers',
        args: [{ name: 'role', type: 'Role', required: true }],
      },
      {
        name: 'view',
        description: 'View current bot configuration',
        usage: '/configure view',
        example: '/configure view',
        args: [],
      },
    ],
  },
  help: {
    name: 'help',
    description: 'Display this help menu',
    category: 'general',
    permission: 'user',
    cooldown: null,
    premium: false,
    subcommands: [],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🏠 MAIN HELP EMBED
// ═══════════════════════════════════════════════════════════════════════════════

export function buildMainHelpEmbed(client) {
  const embed = new EmbedBuilder()
    .setColor(Colors.PRIMARY)
    .setTitle(`${CategoryEmojis.HELP} ${Decorations.BRACKET_L} Command Help Center ${Decorations.BRACKET_R}`)
    .setDescription(
      `${Decorations.SEPARATOR_SPARKLE}\n\n` +
      `Welcome to **${client?.user?.username || 'BlackHawks Bot'}**!\n` +
      `Your comprehensive server management companion.\n\n` +
      `${Decorations.SEPARATOR_THIN}\n\n` +
      `${CategoryEmojis.TIP} **Quick Navigation:**\n` +
      `Use the buttons below or the dropdown menu to explore commands by category.\n\n` +
      `${Decorations.SEPARATOR_SPARKLE}`
    );

  // Add category overview fields
  embed.addFields(
    {
      name: `${CategoryEmojis.LORE} Lore System`,
      value: `${Decorations.BULLET_ARROW} Submit & manage server lore\n${Decorations.BULLET_DOT} \`/lore submit\` \`/lore view\``,
      inline: true,
    },
    {
      name: `${CategoryEmojis.MOMENTS} Moments`,
      value: `${Decorations.BULLET_ARROW} Capture memorable moments\n${Decorations.BULLET_DOT} \`/moment submit\` \`/moment view\``,
      inline: true,
    },
    {
      name: '\u200B', // Empty field for spacing
      value: '\u200B',
      inline: true,
    },
    {
      name: `${CategoryEmojis.ADMIN} Administration`,
      value: `${Decorations.BULLET_ARROW} Configure bot settings\n${Decorations.BULLET_DOT} \`/configure\` commands`,
      inline: true,
    },
    {
      name: `${CategoryEmojis.HELP} General`,
      value: `${Decorations.BULLET_ARROW} Help & information\n${Decorations.BULLET_DOT} \`/help\``,
      inline: true,
    },
    {
      name: '\u200B',
      value: '\u200B',
      inline: true,
    }
  );

  // Statistics section
  const totalCommands = Object.keys(CommandData).length;
  const totalSubcommands = Object.values(CommandData).reduce(
    (acc, cmd) => acc + (cmd.subcommands?.length || 0), 0
  );

  embed.addFields({
    name: `${Decorations.SEPARATOR_DIAMOND}`,
    value: 
      `${CategoryEmojis.ONLINE} **Bot Status:** Online\n` +
      `${CategoryEmojis.SETTINGS} **Commands:** ${totalCommands} main commands\n` +
      `${CategoryEmojis.BUTTON} **Subcommands:** ${totalSubcommands} total options`,
    inline: false,
  });

  // Footer with decorative border
  embed.setFooter({
    text: `${Decorations.BULLET_STAR} Select a category to explore commands ${Decorations.BULLET_STAR}`,
    iconURL: client?.user?.displayAvatarURL() || undefined,
  });

  embed.setTimestamp();

  // Set thumbnail if available
  if (client?.user?.displayAvatarURL()) {
    embed.setThumbnail(client.user.displayAvatarURL({ size: 256 }));
  }

  return embed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📖 CATEGORY EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

export function buildCategoryEmbed(category, client) {
  const categoryConfig = EmbedTemplates.categoryHeaders[category];
  const commands = Object.values(CommandData).filter(cmd => cmd.category === category);

  const embed = new EmbedBuilder()
    .setColor(categoryConfig?.color || Colors.PRIMARY)
    .setTitle(categoryConfig?.title || `${CategoryEmojis[category.toUpperCase()] || '📋'} ${category.charAt(0).toUpperCase() + category.slice(1)} Commands`)
    .setDescription(
      `${Decorations.SEPARATOR_FANCY}\n\n` +
      getCategoryDescription(category) +
      `\n\n${Decorations.SEPARATOR_THIN}`
    );

  // Add command fields
  commands.forEach(cmd => {
    const permBadge = TextFormat.permissionBadge(cmd.permission);
    const premiumBadge = cmd.premium ? ` ${CategoryEmojis.PREMIUM}` : '';
    const cooldownBadge = cmd.cooldown ? ` ${Badges.COOLDOWN_SHORT}` : '';

    let fieldValue = `${Decorations.BULLET_ARROW} ${cmd.description}\n`;
    
    if (cmd.subcommands && cmd.subcommands.length > 0) {
      fieldValue += `\n**Subcommands:**\n`;
      cmd.subcommands.forEach(sub => {
        fieldValue += `${Decorations.BULLET_DOT} \`${sub.name}\` - ${sub.description}\n`;
      });
    }

    fieldValue += `\n${permBadge} Required Permission${cooldownBadge}${premiumBadge}`;

    embed.addFields({
      name: `${getCategoryCommandEmoji(category)} /${cmd.name}`,
      value: fieldValue,
      inline: false,
    });
  });

  // Add tips section
  embed.addFields({
    name: `${Decorations.SEPARATOR_DIAMOND}`,
    value: getCategoryTips(category),
    inline: false,
  });

  embed.setFooter({
    text: `${Decorations.BULLET_DIAMOND} Click a button to see detailed command info ${Decorations.BULLET_DIAMOND}`,
    iconURL: client?.user?.displayAvatarURL() || undefined,
  });

  embed.setTimestamp();

  if (client?.user?.displayAvatarURL()) {
    embed.setThumbnail(client.user.displayAvatarURL({ size: 256 }));
  }

  return embed;
}

function getCategoryDescription(category) {
  const descriptions = {
    general: `${CategoryEmojis.INFO} General commands for basic bot interaction and information.`,
    lore: `${CategoryEmojis.LORE} The Lore System allows your community to collaboratively build and maintain server lore. Submit stories, view approved content, and explore the history of your server's narrative.`,
    moments: `${CategoryEmojis.MOMENTS} Capture and preserve memorable moments from your server. Submit screenshots, quotes, or memorable events for the community to enjoy.`,
    admin: `${CategoryEmojis.ADMIN} Administrative commands for server setup and configuration. These commands require Administrator permissions.`,
    info: `${CategoryEmojis.INFO} Information about the bot, including statistics, credits, and support links.`,
  };
  return descriptions[category] || 'Commands in this category.';
}

function getCategoryCommandEmoji(category) {
  const emojis = {
    general: '📋',
    lore: '📖',
    moments: '📸',
    admin: '⚙️',
    info: 'ℹ️',
  };
  return emojis[category] || '📋';
}

function getCategoryTips(category) {
  const tips = {
    general: `${CategoryEmojis.TIP} **Tip:** Use \`/help <command>\` for detailed information about any command!`,
    lore: `${CategoryEmojis.TIP} **Tip:** Lore submissions go through a verification process. Make sure your content follows server guidelines!\n${CategoryEmojis.WARNING} **Note:** Only verified lore appears in \`/lore view\`.`,
    moments: `${CategoryEmojis.TIP} **Tip:** Moments are perfect for preserving funny quotes, epic gaming moments, or memorable conversations!\n${CategoryEmojis.INFO} **Info:** Use \`/moment random\` to relive a random memory.`,
    admin: `${CategoryEmojis.WARNING} **Important:** These commands require Administrator permissions.\n${CategoryEmojis.TIP} **Tip:** Set up all channels before using the lore and moment systems.`,
    info: `${CategoryEmojis.TIP} **Tip:** Join our support server for help and updates!`,
  };
  return tips[category] || `${CategoryEmojis.TIP} **Tip:** Explore all available commands!`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📝 DETAILED COMMAND EMBED
// ═══════════════════════════════════════════════════════════════════════════════

export function buildCommandDetailEmbed(commandName, client) {
  const command = CommandData[commandName];
  if (!command) return null;

  const categoryConfig = EmbedTemplates.categoryHeaders[command.category];
  const permBadge = TextFormat.permissionBadge(command.permission);

  const embed = new EmbedBuilder()
    .setColor(categoryConfig?.color || Colors.PRIMARY)
    .setTitle(`${getCategoryCommandEmoji(command.category)} /${command.name}`)
    .setDescription(
      `${Decorations.SEPARATOR_FANCY}\n\n` +
      `${command.description}\n\n` +
      `${Decorations.SEPARATOR_THIN}`
    );

  // Permission and status info
  embed.addFields({
    name: `${CategoryEmojis.INFO} Command Info`,
    value: 
      `${Decorations.BULLET_DOT} **Category:** ${command.category.charAt(0).toUpperCase() + command.category.slice(1)}\n` +
      `${Decorations.BULLET_DOT} **Permission:** ${permBadge}\n` +
      `${Decorations.BULLET_DOT} **Cooldown:** ${command.cooldown ? `⏳ ${command.cooldown}s` : '⚡ None'}\n` +
      `${Decorations.BULLET_DOT} **Premium:** ${command.premium ? `${CategoryEmojis.PREMIUM} Yes` : '🔓 No'}`,
    inline: false,
  });

  // Subcommands
  if (command.subcommands && command.subcommands.length > 0) {
    embed.addFields({
      name: `${Decorations.SEPARATOR_DIAMOND}`,
      value: '\u200B',
      inline: false,
    });

    command.subcommands.forEach((sub, index) => {
      const argsList = sub.args && sub.args.length > 0
        ? sub.args.map(arg => `\`<${arg.name}>\` - ${arg.type}${arg.required ? ' (Required)' : ' (Optional)'}`).join('\n')
        : 'No arguments required';

      embed.addFields({
        name: `${getNumberEmoji(index + 1)} ${sub.name}`,
        value: 
          `${Decorations.BULLET_ARROW} ${sub.description}\n\n` +
          `**Usage:**\n\`\`\`\n${sub.usage}\n\`\`\`\n` +
          `**Example:**\n\`\`\`\n${sub.example}\n\`\`\`\n` +
          `**Arguments:**\n${argsList}`,
        inline: false,
      });
    });
  }

  // Tips section
  embed.addFields({
    name: `${Decorations.SEPARATOR_DIAMOND}`,
    value: getCommandTips(commandName),
    inline: false,
  });

  embed.setFooter({
    text: `${Decorations.BULLET_ARROW} Use the buttons to navigate ${Decorations.BULLET_ARROW}`,
    iconURL: client?.user?.displayAvatarURL() || undefined,
  });

  embed.setTimestamp();

  if (client?.user?.displayAvatarURL()) {
    embed.setThumbnail(client.user.displayAvatarURL({ size: 256 }));
  }

  return embed;
}

function getNumberEmoji(num) {
  const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
  return emojis[num - 1] || `${num}.`;
}

function getCommandTips(commandName) {
  const tips = {
    lore: `${CategoryEmojis.TIP} **Tips:**\n` +
      `${Decorations.BULLET_DOT} Lore submissions are reviewed by verifiers before being published\n` +
      `${Decorations.BULLET_DOT} Keep your lore entries engaging and well-written\n` +
      `${Decorations.BULLET_DOT} Check \`/lore history\` to see how the lore has evolved`,
    moment: `${CategoryEmojis.TIP} **Tips:**\n` +
      `${Decorations.BULLET_DOT} Include context with your moment submissions\n` +
      `${Decorations.BULLET_DOT} Moments can include images, quotes, or descriptions\n` +
      `${Decorations.BULLET_DOT} Use \`/moment random\` for a trip down memory lane`,
    configure: `${CategoryEmojis.WARNING} **Important:**\n` +
      `${Decorations.BULLET_DOT} Only administrators can use these commands\n` +
      `${Decorations.BULLET_DOT} Set up all channels before using lore/moment features\n` +
      `${Decorations.BULLET_DOT} The verifier role determines who can approve submissions`,
    help: `${CategoryEmojis.TIP} **Tips:**\n` +
      `${Decorations.BULLET_DOT} Use the category buttons for quick navigation\n` +
      `${Decorations.BULLET_DOT} The dropdown menu shows all available categories\n` +
      `${Decorations.BULLET_DOT} Click on specific commands for detailed information`,
  };
  return tips[commandName] || `${CategoryEmojis.TIP} **Tip:** Explore all available options!`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ℹ️ INFO EMBED
// ═══════════════════════════════════════════════════════════════════════════════

export function buildInfoEmbed(client) {
  const embed = new EmbedBuilder()
    .setColor(Colors.INFO)
    .setTitle(`${CategoryEmojis.INFO} ${Decorations.BRACKET_L} Bot Information ${Decorations.BRACKET_R}`)
    .setDescription(
      `${Decorations.SEPARATOR_SPARKLE}\n\n` +
      `**${client?.user?.username || 'BlackHawks Bot'}** is a comprehensive server management bot ` +
      `designed to help communities build and preserve their stories and memories.\n\n` +
      `${Decorations.SEPARATOR_THIN}`
    );

  // Statistics
  embed.addFields(
    {
      name: `${CategoryEmojis.ONLINE} Bot Statistics`,
      value: 
        `${Decorations.BULLET_DOT} **Servers:** ${client?.guilds?.cache?.size || 0}\n` +
        `${Decorations.BULLET_DOT} **Users:** ${client?.users?.cache?.size || 0}\n` +
        `${Decorations.BULLET_DOT} **Uptime:** ${getUptime(client)}`,
      inline: true,
    },
    {
      name: `${CategoryEmojis.SETTINGS} Technical Info`,
      value: 
        `${Decorations.BULLET_DOT} **Version:** 1.0.0\n` +
        `${Decorations.BULLET_DOT} **Library:** discord.js v14\n` +
        `${Decorations.BULLET_DOT} **Node.js:** ${process.version}`,
      inline: true,
    }
  );

  // Features
  embed.addFields({
    name: `${Decorations.SEPARATOR_DIAMOND}`,
    value: '\u200B',
    inline: false,
  });

  embed.addFields({
    name: `${CategoryEmojis.PREMIUM} Features`,
    value: 
      `${Decorations.BULLET_STAR} **Lore System** - Collaborative storytelling\n` +
      `${Decorations.BULLET_STAR} **Moments** - Memory preservation\n` +
      `${Decorations.BULLET_STAR} **Verification** - Quality control system\n` +
      `${Decorations.BULLET_STAR} **History** - Version tracking`,
    inline: false,
  });

  // Credits
  embed.addFields({
    name: `${CategoryEmojis.CROWN} Credits`,
    value: 
      `${Decorations.BULLET_DOT} Developed with ❤️ for the BlackHawks community\n` +
      `${Decorations.BULLET_DOT} Built with discord.js and MySQL`,
    inline: false,
  });

  embed.setFooter({
    text: `${Decorations.BULLET_STAR} Thank you for using ${client?.user?.username || 'our bot'}! ${Decorations.BULLET_STAR}`,
    iconURL: client?.user?.displayAvatarURL() || undefined,
  });

  embed.setTimestamp();

  if (client?.user?.displayAvatarURL()) {
    embed.setThumbnail(client.user.displayAvatarURL({ size: 256 }));
  }

  return embed;
}

function getUptime(client) {
  if (!client?.uptime) return 'Unknown';
  
  const totalSeconds = Math.floor(client.uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  
  return parts.length > 0 ? parts.join(' ') : 'Just started';
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔘 BUTTON COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

export function buildCategoryButtons() {
  const row1 = new ActionRowBuilder();
  const row2 = new ActionRowBuilder();

  // Category buttons
  row1.addComponents(
    new ButtonBuilder()
      .setCustomId('help_category_lore')
      .setLabel('Lore')
      .setEmoji('📖')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('help_category_moments')
      .setLabel('Moments')
      .setEmoji('📸')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('help_category_admin')
      .setLabel('Admin')
      .setEmoji('⚙️')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('help_category_info')
      .setLabel('Info')
      .setEmoji('ℹ️')
      .setStyle(ButtonStyle.Secondary),
  );

  // Navigation buttons
  row2.addComponents(
    new ButtonBuilder()
      .setCustomId('help_home')
      .setLabel('Home')
      .setEmoji('🏠')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('help_close')
      .setLabel('Close')
      .setEmoji('❌')
      .setStyle(ButtonStyle.Danger),
  );

  return [row1, row2];
}

export function buildNavigationButtons(showBack = true) {
  const row = new ActionRowBuilder();

  if (showBack) {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId('help_home')
        .setLabel('Home')
        .setEmoji('🏠')
        .setStyle(ButtonStyle.Success),
    );
  }

  row.addComponents(
    new ButtonBuilder()
      .setCustomId('help_close')
      .setLabel('Close')
      .setEmoji('❌')
      .setStyle(ButtonStyle.Danger),
  );

  return row;
}

export function buildCommandButtons(category) {
  const commands = Object.values(CommandData).filter(cmd => cmd.category === category);
  const row = new ActionRowBuilder();

  commands.slice(0, 4).forEach(cmd => {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`help_command_${cmd.name}`)
        .setLabel(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1))
        .setEmoji(getCategoryCommandEmoji(cmd.category))
        .setStyle(ButtonStyle.Primary),
    );
  });

  return row;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📜 DROPDOWN MENU COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

export function buildCategoryDropdown() {
  const row = new ActionRowBuilder();

  const select = new StringSelectMenuBuilder()
    .setCustomId('help_category_select')
    .setPlaceholder('📋 Select a category to explore...')
    .addOptions(
      {
        label: 'Lore System',
        description: 'Submit and manage server lore',
        value: 'lore',
        emoji: '📖',
      },
      {
        label: 'Moments',
        description: 'Capture and share memorable moments',
        value: 'moments',
        emoji: '📸',
      },
      {
        label: 'Administration',
        description: 'Server setup and configuration',
        value: 'admin',
        emoji: '⚙️',
      },
      {
        label: 'Bot Information',
        description: 'Stats, credits, and support',
        value: 'info',
        emoji: 'ℹ️',
      },
      {
        label: '🏠 Return Home',
        description: 'Go back to the main help menu',
        value: 'home',
        emoji: '🏠',
      },
    );

  row.addComponents(select);
  return row;
}

export function buildCommandDropdown(category) {
  const commands = Object.values(CommandData).filter(cmd => cmd.category === category);
  
  if (commands.length === 0) return null;

  const row = new ActionRowBuilder();

  const options = commands.map(cmd => ({
    label: `/${cmd.name}`,
    description: cmd.description.substring(0, 100),
    value: cmd.name,
    emoji: getCategoryCommandEmoji(cmd.category),
  }));

  // Add home option
  options.push({
    label: '🏠 Return Home',
    description: 'Go back to the main help menu',
    value: 'home',
    emoji: '🏠',
  });

  const select = new StringSelectMenuBuilder()
    .setCustomId('help_command_select')
    .setPlaceholder('📋 Select a command for details...')
    .addOptions(options);

  row.addComponents(select);
  return row;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ⏳ LOADING EMBED
// ═══════════════════════════════════════════════════════════════════════════════

export function buildLoadingEmbed() {
  return new EmbedBuilder()
    .setColor(Colors.INFO)
    .setTitle(`${CategoryEmojis.CLOCK} Loading...`)
    .setDescription(
      `${Decorations.SEPARATOR_THIN}\n\n` +
      `⏳ Please wait while we fetch the information...\n\n` +
      `${Decorations.SEPARATOR_THIN}`
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ❌ ERROR EMBED
// ═══════════════════════════════════════════════════════════════════════════════

export function buildErrorEmbed(message) {
  return new EmbedBuilder()
    .setColor(Colors.ERROR)
    .setTitle(`${CategoryEmojis.ERROR} Error`)
    .setDescription(
      `${Decorations.SEPARATOR_THIN}\n\n` +
      `${CategoryEmojis.WARNING} ${message}\n\n` +
      `${Decorations.SEPARATOR_THIN}`
    )
    .setFooter({
      text: `${Decorations.BULLET_ARROW} Please try again or contact support`,
    });
}

export default {
  CommandData,
  buildMainHelpEmbed,
  buildCategoryEmbed,
  buildCommandDetailEmbed,
  buildInfoEmbed,
  buildCategoryButtons,
  buildNavigationButtons,
  buildCommandButtons,
  buildCategoryDropdown,
  buildCommandDropdown,
  buildLoadingEmbed,
  buildErrorEmbed,
};
