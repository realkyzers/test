/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎨 CENTRALIZED EMBED BUILDER SYSTEM
 * Reusable templates and consistent theming for all bot responses
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { EmbedBuilder as DiscordEmbedBuilder } from 'discord.js';
import {
  Colors,
  Emojis,
  Decorations,
  Branding,
  Templates,
  Categories,
  getCategoryColor,
  getCategoryEmoji,
  formatTimestamp,
  boxedTitle,
  bulletList,
} from '../config/theme.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 🏗️ BASE EMBED BUILDER CLASS
// ═══════════════════════════════════════════════════════════════════════════════

export class BotEmbed extends DiscordEmbedBuilder {
  constructor(options = {}) {
    super();
    
    // Apply default styling
    this.setColor(options.color || Colors.PRIMARY);
    this.setTimestamp();
    
    // Apply default footer if not disabled
    if (options.footer !== false) {
      this.setFooter({
        text: options.footerText || Branding.FOOTERS.DEFAULT,
        iconURL: options.footerIcon || null,
      });
    }
    
    // Apply category styling if provided
    if (options.category) {
      this.applyCategory(options.category);
    }
  }
  
  /**
   * Apply category-specific styling
   */
  applyCategory(categoryId) {
    const color = getCategoryColor(categoryId);
    const emoji = getCategoryEmoji(categoryId);
    const category = Categories[categoryId.toUpperCase()];
    
    this.setColor(color);
    
    if (category) {
      this.setFooter({
        text: `${emoji} ${category.name} • ${Branding.BOT_NAME}`,
      });
    }
    
    return this;
  }
  
  /**
   * Set a decorated title with brackets
   */
  setDecoratedTitle(title, emoji = null, style = 'SQUARE') {
    const decoratedTitle = emoji 
      ? `${emoji} ${boxedTitle(title, style)}`
      : boxedTitle(title, style);
    return this.setTitle(decoratedTitle);
  }
  
  /**
   * Set description with decorative separators
   */
  setDecoratedDescription(content, topSeparator = true, bottomSeparator = true) {
    let description = '';
    if (topSeparator) description += `${Decorations.FANCY.SPARKLE}\n\n`;
    description += content;
    if (bottomSeparator) description += `\n\n${Decorations.LINES.THIN}`;
    return this.setDescription(description);
  }
  
  /**
   * Add a separator field
   */
  addSeparator(style = 'THIN') {
    return this.addFields({
      name: '\u200B',
      value: Decorations.LINES[style] || Decorations.LINES.THIN,
      inline: false,
    });
  }
  
  /**
   * Add a bullet list field
   */
  addBulletField(name, items, bullet = Emojis.BULLETS.DOT, inline = false) {
    return this.addFields({
      name,
      value: bulletList(items, bullet),
      inline,
    });
  }
  
  /**
   * Add a tip field
   */
  addTip(text) {
    return this.addFields({
      name: `${Emojis.COMMUNITY.LIGHTBULB} Tip`,
      value: text,
      inline: false,
    });
  }
  
  /**
   * Add a warning field
   */
  addWarning(text) {
    return this.addFields({
      name: `${Emojis.STATUS.WARNING} Warning`,
      value: text,
      inline: false,
    });
  }
  
  /**
   * Add a note field
   */
  addNote(text) {
    return this.addFields({
      name: `${Emojis.STATUS.INFO} Note`,
      value: text,
      inline: false,
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 PRESET EMBED TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Success Embed - For successful operations
 */
export function successEmbed(title, description, options = {}) {
  return new BotEmbed({ color: Colors.SUCCESS, ...options })
    .setTitle(`${Emojis.STATUS.SUCCESS} ${title}`)
    .setDescription(description);
}

/**
 * Error Embed - For error messages
 */
export function errorEmbed(title, description, options = {}) {
  return new BotEmbed({ color: Colors.ERROR, ...options })
    .setTitle(`${Emojis.STATUS.ERROR} ${title}`)
    .setDescription(description || Templates.ERROR.GENERIC);
}

/**
 * Warning Embed - For warnings
 */
export function warningEmbed(title, description, options = {}) {
  return new BotEmbed({ color: Colors.WARNING, ...options })
    .setTitle(`${Emojis.STATUS.WARNING} ${title}`)
    .setDescription(description);
}

/**
 * Info Embed - For informational messages
 */
export function infoEmbed(title, description, options = {}) {
  return new BotEmbed({ color: Colors.INFO, ...options })
    .setTitle(`${Emojis.STATUS.INFO} ${title}`)
    .setDescription(description);
}

/**
 * Loading Embed - For loading states
 */
export function loadingEmbed(message = 'Loading...', options = {}) {
  return new BotEmbed({ color: Colors.INFO, footer: false, ...options })
    .setTitle(`${Emojis.STATUS.LOADING} ${message}`)
    .setDescription(`${Decorations.LINES.THIN}\n\nPlease wait...\n\n${Decorations.LINES.THIN}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 GAMING EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Gaming Category Embed
 */
export function gamingEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.GAMING.MAIN, 
    footerText: Branding.FOOTERS.GAMING,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.GAMING} ${title}`)
    .setDescription(description);
}

/**
 * Roblox Embed
 */
export function robloxEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.GAMING.ROBLOX,
    footerText: `${Emojis.CATEGORIES.ROBLOX} Roblox • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.ROBLOX} ${title}`)
    .setDescription(description);
}

/**
 * Minecraft Embed
 */
export function minecraftEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.GAMING.MINECRAFT,
    footerText: `${Emojis.CATEGORIES.MINECRAFT} Minecraft • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.MINECRAFT} ${title}`)
    .setDescription(description);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 ART EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Art Category Embed
 */
export function artEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.ART.MAIN, 
    footerText: Branding.FOOTERS.ART,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.ART} ${title}`)
    .setDescription(description);
}

/**
 * Showcase Embed - For art showcases
 */
export function showcaseEmbed(title, description, imageUrl = null, options = {}) {
  const embed = new BotEmbed({ 
    color: Colors.ART.SHOWCASE,
    footerText: `${Emojis.ART.FRAME} Art Showcase • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.ART.FRAME} ${title}`)
    .setDescription(description);
  
  if (imageUrl) {
    embed.setImage(imageUrl);
  }
  
  return embed;
}

/**
 * Gallery Embed - For gallery displays
 */
export function galleryEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.ART.GALLERY,
    footerText: `${Emojis.ART.PALETTE} Gallery • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.ART.PALETTE} ${title}`)
    .setDescription(description);
}

/**
 * Art Prompt Embed
 */
export function promptEmbed(prompt, category = 'General', options = {}) {
  return new BotEmbed({ 
    color: Colors.ART.PROMPTS,
    footerText: `${Emojis.ART.MAGIC} Creative Prompts • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.ART.MAGIC} Art Prompt`)
    .setDescription(
      `${Decorations.FANCY.ART}\n\n` +
      `**${Emojis.ART.SPARKLES} Your Prompt:**\n` +
      `> ${prompt}\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields({
      name: `${Emojis.BULLETS.STAR} Category`,
      value: category,
      inline: true,
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👥 COMMUNITY EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Community Category Embed
 */
export function communityEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.COMMUNITY.MAIN, 
    footerText: Branding.FOOTERS.COMMUNITY,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.COMMUNITY} ${title}`)
    .setDescription(description);
}

/**
 * Help Embed
 */
export function helpEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.COMMUNITY.HELP,
    footerText: Branding.FOOTERS.HELP,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.HELP} ${title}`)
    .setDescription(description);
}

/**
 * Moderation Embed
 */
export function moderationEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.COMMUNITY.MODERATION,
    footerText: `${Emojis.GAMING.SHIELD} Moderation • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.GAMING.SHIELD} ${title}`)
    .setDescription(description);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎉 FUN EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fun Category Embed
 */
export function funEmbed(title, description, options = {}) {
  return new BotEmbed({ 
    color: Colors.FUN.MAIN,
    footerText: `${Emojis.CATEGORIES.FUN} Fun & Games • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.FUN} ${title}`)
    .setDescription(description);
}

/**
 * Game Result Embed
 */
export function gameResultEmbed(title, result, winner = null, options = {}) {
  const embed = new BotEmbed({ 
    color: winner ? Colors.SUCCESS : Colors.FUN.GAMES,
    footerText: `${Emojis.GAMING.DICE} Mini Games • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.GAMING.TROPHY} ${title}`)
    .setDescription(result);
  
  if (winner) {
    embed.addFields({
      name: `${Emojis.GAMING.CROWN} Winner`,
      value: winner,
      inline: true,
    });
  }
  
  return embed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📖 LORE & MOMENTS EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Lore Embed
 */
export function loreEmbed(title, content, version = null, options = {}) {
  const embed = new BotEmbed({ 
    color: Colors.LORE,
    footerText: `${Emojis.CATEGORIES.LORE} Server Lore • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.LORE} ${title}${version ? ` (v${version})` : ''}`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      content +
      `\n\n${Decorations.LINES.THIN}`
    );
  
  return embed;
}

/**
 * Moment Embed
 */
export function momentEmbed(title, content, author = null, imageUrl = null, options = {}) {
  const embed = new BotEmbed({ 
    color: Colors.MOMENTS,
    footerText: `${Emojis.CATEGORIES.MOMENTS} Moments • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.CATEGORIES.MOMENTS} ${title}`)
    .setDescription(content);
  
  if (author) {
    embed.addFields({
      name: `${Emojis.COMMUNITY.PEOPLE} Captured by`,
      value: author,
      inline: true,
    });
  }
  
  if (imageUrl) {
    embed.setImage(imageUrl);
  }
  
  return embed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📊 PROFILE & STATS EMBEDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Profile Embed
 */
export function profileEmbed(user, stats = {}, options = {}) {
  const embed = new BotEmbed({ 
    color: Colors.PRIMARY,
    ...options 
  })
    .setTitle(`${Emojis.COMMUNITY.PEOPLE} ${user.username}'s Profile`)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `Welcome to ${user.username}'s profile!\n\n` +
      `${Decorations.LINES.THIN}`
    );
  
  // Add stats if provided
  if (stats.level !== undefined) {
    embed.addFields({
      name: `${Emojis.GAMING.STAR} Level`,
      value: `${stats.level}`,
      inline: true,
    });
  }
  
  if (stats.xp !== undefined) {
    embed.addFields({
      name: `${Emojis.GAMING.LIGHTNING} XP`,
      value: `${stats.xp}`,
      inline: true,
    });
  }
  
  return embed;
}

/**
 * Leaderboard Embed
 */
export function leaderboardEmbed(title, entries, options = {}) {
  const embed = new BotEmbed({ 
    color: Colors.PREMIUM,
    footerText: `${Emojis.GAMING.TROPHY} Leaderboard • ${Branding.BOT_NAME}`,
    ...options 
  })
    .setTitle(`${Emojis.GAMING.TROPHY} ${title}`)
    .setDescription(
      `${Decorations.FANCY.CROWN}\n\n` +
      entries.map((entry, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        return `${medal} **${entry.name}** - ${entry.value}`;
      }).join('\n') +
      `\n\n${Decorations.LINES.THIN}`
    );
  
  return embed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📄 PAGINATED EMBED BUILDER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create paginated embed data
 */
export function createPaginatedEmbeds(items, itemsPerPage, embedBuilder, options = {}) {
  const pages = [];
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  for (let i = 0; i < totalPages; i++) {
    const pageItems = items.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
    const embed = embedBuilder(pageItems, i, totalPages);
    
    // Add page indicator to footer
    const currentFooter = embed.data.footer?.text || Branding.FOOTERS.DEFAULT;
    embed.setFooter({
      text: `Page ${i + 1}/${totalPages} • ${currentFooter}`,
      iconURL: embed.data.footer?.icon_url,
    });
    
    pages.push(embed);
  }
  
  return pages;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 UTILITY EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export {
  Colors,
  Emojis,
  Decorations,
  Branding,
  Templates,
  Categories,
};

export default {
  BotEmbed,
  successEmbed,
  errorEmbed,
  warningEmbed,
  infoEmbed,
  loadingEmbed,
  gamingEmbed,
  robloxEmbed,
  minecraftEmbed,
  artEmbed,
  showcaseEmbed,
  galleryEmbed,
  promptEmbed,
  communityEmbed,
  helpEmbed,
  moderationEmbed,
  funEmbed,
  gameResultEmbed,
  loreEmbed,
  momentEmbed,
  profileEmbed,
  leaderboardEmbed,
  createPaginatedEmbeds,
};
