/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔘 COMPONENT BUILDER SYSTEM
 * Reusable button rows, select menus, and interactive components
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} from 'discord.js';
import { Emojis, Categories } from '../config/theme.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 🔘 BUTTON BUILDERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create a single button
 */
export function createButton(options) {
  const button = new ButtonBuilder()
    .setCustomId(options.customId)
    .setStyle(options.style || ButtonStyle.Primary);
  
  if (options.label) button.setLabel(options.label);
  if (options.emoji) button.setEmoji(options.emoji);
  if (options.disabled) button.setDisabled(true);
  if (options.url) {
    button.setURL(options.url);
    button.setStyle(ButtonStyle.Link);
  }
  
  return button;
}

/**
 * Create a row of buttons
 */
export function createButtonRow(buttons) {
  const row = new ActionRowBuilder();
  buttons.forEach(btn => {
    if (btn instanceof ButtonBuilder) {
      row.addComponents(btn);
    } else {
      row.addComponents(createButton(btn));
    }
  });
  return row;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📍 NAVIGATION BUTTONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create pagination buttons
 */
export function createPaginationButtons(currentPage, totalPages, prefix = 'page') {
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;
  
  return createButtonRow([
    {
      customId: `${prefix}_first`,
      emoji: Emojis.NAV.FIRST,
      style: ButtonStyle.Secondary,
      disabled: isFirst,
    },
    {
      customId: `${prefix}_prev`,
      emoji: Emojis.NAV.BACK,
      style: ButtonStyle.Primary,
      disabled: isFirst,
    },
    {
      customId: `${prefix}_indicator`,
      label: `${currentPage + 1}/${totalPages}`,
      style: ButtonStyle.Secondary,
      disabled: true,
    },
    {
      customId: `${prefix}_next`,
      emoji: Emojis.NAV.FORWARD,
      style: ButtonStyle.Primary,
      disabled: isLast,
    },
    {
      customId: `${prefix}_last`,
      emoji: Emojis.NAV.LAST,
      style: ButtonStyle.Secondary,
      disabled: isLast,
    },
  ]);
}

/**
 * Create simple navigation buttons (home, back, close)
 */
export function createNavigationButtons(options = {}) {
  const buttons = [];
  
  if (options.home !== false) {
    buttons.push({
      customId: options.homeId || 'nav_home',
      label: 'Home',
      emoji: Emojis.NAV.HOME,
      style: ButtonStyle.Success,
    });
  }
  
  if (options.back) {
    buttons.push({
      customId: options.backId || 'nav_back',
      label: 'Back',
      emoji: Emojis.NAV.BACK,
      style: ButtonStyle.Secondary,
    });
  }
  
  if (options.refresh) {
    buttons.push({
      customId: options.refreshId || 'nav_refresh',
      emoji: Emojis.NAV.REFRESH,
      style: ButtonStyle.Secondary,
    });
  }
  
  if (options.close !== false) {
    buttons.push({
      customId: options.closeId || 'nav_close',
      label: 'Close',
      emoji: Emojis.NAV.CLOSE,
      style: ButtonStyle.Danger,
    });
  }
  
  return createButtonRow(buttons);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 CATEGORY BUTTONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create category selection buttons
 */
export function createCategoryButtons(prefix = 'category', selectedCategory = null) {
  const categories = [
    { id: 'gaming', emoji: Emojis.CATEGORIES.GAMING, label: 'Gaming', style: ButtonStyle.Primary },
    { id: 'art', emoji: Emojis.CATEGORIES.ART, label: 'Art', style: ButtonStyle.Primary },
    { id: 'community', emoji: Emojis.CATEGORIES.COMMUNITY, label: 'Community', style: ButtonStyle.Secondary },
    { id: 'fun', emoji: Emojis.CATEGORIES.FUN, label: 'Fun', style: ButtonStyle.Secondary },
  ];
  
  return createButtonRow(
    categories.map(cat => ({
      customId: `${prefix}_${cat.id}`,
      label: cat.label,
      emoji: cat.emoji,
      style: selectedCategory === cat.id ? ButtonStyle.Success : cat.style,
    }))
  );
}

/**
 * Create help category buttons (extended)
 */
export function createHelpCategoryButtons(prefix = 'help_cat') {
  const row1 = createButtonRow([
    { customId: `${prefix}_gaming`, label: 'Gaming', emoji: Emojis.CATEGORIES.GAMING, style: ButtonStyle.Primary },
    { customId: `${prefix}_art`, label: 'Art', emoji: Emojis.CATEGORIES.ART, style: ButtonStyle.Primary },
    { customId: `${prefix}_community`, label: 'Community', emoji: Emojis.CATEGORIES.COMMUNITY, style: ButtonStyle.Primary },
    { customId: `${prefix}_fun`, label: 'Fun', emoji: Emojis.CATEGORIES.FUN, style: ButtonStyle.Primary },
  ]);
  
  const row2 = createButtonRow([
    { customId: `${prefix}_lore`, label: 'Lore', emoji: Emojis.CATEGORIES.LORE, style: ButtonStyle.Secondary },
    { customId: `${prefix}_moments`, label: 'Moments', emoji: Emojis.CATEGORIES.MOMENTS, style: ButtonStyle.Secondary },
    { customId: `${prefix}_admin`, label: 'Admin', emoji: Emojis.CATEGORIES.ADMIN, style: ButtonStyle.Secondary },
  ]);
  
  return [row1, row2];
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✅ CONFIRMATION BUTTONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create confirm/cancel buttons
 */
export function createConfirmButtons(prefix = 'confirm') {
  return createButtonRow([
    {
      customId: `${prefix}_yes`,
      label: 'Confirm',
      emoji: Emojis.STATUS.SUCCESS,
      style: ButtonStyle.Success,
    },
    {
      customId: `${prefix}_no`,
      label: 'Cancel',
      emoji: Emojis.STATUS.ERROR,
      style: ButtonStyle.Danger,
    },
  ]);
}

/**
 * Create accept/reject buttons (for moderation)
 */
export function createModerationButtons(prefix = 'mod', itemId = '') {
  return createButtonRow([
    {
      customId: `${prefix}_accept_${itemId}`,
      label: 'Accept',
      emoji: Emojis.STATUS.SUCCESS,
      style: ButtonStyle.Success,
    },
    {
      customId: `${prefix}_reject_${itemId}`,
      label: 'Reject',
      emoji: Emojis.STATUS.ERROR,
      style: ButtonStyle.Danger,
    },
  ]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎲 GAME BUTTONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create game action buttons
 */
export function createGameButtons(actions, prefix = 'game') {
  return createButtonRow(
    actions.map(action => ({
      customId: `${prefix}_${action.id}`,
      label: action.label,
      emoji: action.emoji,
      style: action.style || ButtonStyle.Primary,
      disabled: action.disabled || false,
    }))
  );
}

/**
 * Create Rock Paper Scissors buttons
 */
export function createRPSButtons(prefix = 'rps') {
  return createButtonRow([
    { customId: `${prefix}_rock`, emoji: '🪨', label: 'Rock', style: ButtonStyle.Secondary },
    { customId: `${prefix}_paper`, emoji: '📄', label: 'Paper', style: ButtonStyle.Secondary },
    { customId: `${prefix}_scissors`, emoji: '✂️', label: 'Scissors', style: ButtonStyle.Secondary },
  ]);
}

/**
 * Create number guess buttons (1-10)
 */
export function createNumberButtons(prefix = 'num', start = 1, end = 5) {
  const buttons = [];
  for (let i = start; i <= end; i++) {
    buttons.push({
      customId: `${prefix}_${i}`,
      label: `${i}`,
      style: ButtonStyle.Secondary,
    });
  }
  return createButtonRow(buttons);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📜 SELECT MENU BUILDERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create a select menu
 */
export function createSelectMenu(options) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(options.customId)
    .setPlaceholder(options.placeholder || 'Select an option...');
  
  if (options.minValues) menu.setMinValues(options.minValues);
  if (options.maxValues) menu.setMaxValues(options.maxValues);
  if (options.disabled) menu.setDisabled(true);
  
  menu.addOptions(options.options.map(opt => ({
    label: opt.label,
    value: opt.value,
    description: opt.description,
    emoji: opt.emoji,
    default: opt.default || false,
  })));
  
  return new ActionRowBuilder().addComponents(menu);
}

/**
 * Create category select menu
 */
export function createCategorySelectMenu(customId = 'category_select', includeHome = true) {
  const options = Object.values(Categories).map(cat => ({
    label: cat.name,
    value: cat.id,
    description: cat.description,
    emoji: cat.emoji,
  }));
  
  if (includeHome) {
    options.unshift({
      label: 'Home',
      value: 'home',
      description: 'Return to main menu',
      emoji: Emojis.NAV.HOME,
    });
  }
  
  return createSelectMenu({
    customId,
    placeholder: `${Emojis.NAV.MENU} Select a category...`,
    options,
  });
}

/**
 * Create command select menu for a category
 */
export function createCommandSelectMenu(commands, customId = 'command_select') {
  const options = commands.map(cmd => ({
    label: `/${cmd.name}`,
    value: cmd.name,
    description: cmd.description?.substring(0, 100) || 'No description',
    emoji: cmd.emoji || Emojis.BULLETS.ARROW,
  }));
  
  options.push({
    label: 'Back to Categories',
    value: 'back',
    description: 'Return to category selection',
    emoji: Emojis.NAV.BACK,
  });
  
  return createSelectMenu({
    customId,
    placeholder: `${Emojis.NAV.MENU} Select a command...`,
    options,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 ART-SPECIFIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create art prompt category select
 */
export function createPromptCategorySelect(customId = 'prompt_category') {
  return createSelectMenu({
    customId,
    placeholder: `${Emojis.ART.PALETTE} Select prompt category...`,
    options: [
      { label: 'Character Design', value: 'character', emoji: '👤', description: 'Design a character' },
      { label: 'Environment', value: 'environment', emoji: '🏞️', description: 'Create a scene or landscape' },
      { label: 'Object/Item', value: 'object', emoji: '📦', description: 'Design an object or item' },
      { label: 'Abstract', value: 'abstract', emoji: '🌀', description: 'Abstract or conceptual art' },
      { label: 'Fan Art', value: 'fanart', emoji: '⭐', description: 'Based on existing media' },
      { label: 'Random', value: 'random', emoji: '🎲', description: 'Surprise me!' },
    ],
  });
}

/**
 * Create gallery navigation buttons
 */
export function createGalleryButtons(currentIndex, totalItems, prefix = 'gallery') {
  return createButtonRow([
    {
      customId: `${prefix}_prev`,
      emoji: Emojis.NAV.BACK,
      style: ButtonStyle.Primary,
      disabled: currentIndex === 0,
    },
    {
      customId: `${prefix}_info`,
      label: `${currentIndex + 1}/${totalItems}`,
      style: ButtonStyle.Secondary,
      disabled: true,
    },
    {
      customId: `${prefix}_next`,
      emoji: Emojis.NAV.FORWARD,
      style: ButtonStyle.Primary,
      disabled: currentIndex === totalItems - 1,
    },
    {
      customId: `${prefix}_like`,
      emoji: Emojis.ART.HEART,
      style: ButtonStyle.Secondary,
    },
  ]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 GAMING-SPECIFIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create game platform select
 */
export function createPlatformSelect(customId = 'platform_select') {
  return createSelectMenu({
    customId,
    placeholder: `${Emojis.CATEGORIES.GAMING} Select platform...`,
    options: [
      { label: 'Roblox', value: 'roblox', emoji: Emojis.CATEGORIES.ROBLOX, description: 'Roblox games and utilities' },
      { label: 'Minecraft', value: 'minecraft', emoji: Emojis.CATEGORIES.MINECRAFT, description: 'Minecraft tools and info' },
      { label: 'General Gaming', value: 'general', emoji: Emojis.CATEGORIES.GAMING, description: 'General gaming features' },
    ],
  });
}

/**
 * Create Roblox game type select
 */
export function createRobloxGameSelect(customId = 'roblox_game') {
  return createSelectMenu({
    customId,
    placeholder: `${Emojis.CATEGORIES.ROBLOX} Select game type...`,
    options: [
      { label: 'Simulator', value: 'simulator', emoji: '🎯', description: 'Simulator games' },
      { label: 'Roleplay', value: 'roleplay', emoji: '🎭', description: 'Roleplay games' },
      { label: 'Obby', value: 'obby', emoji: '🏃', description: 'Obstacle courses' },
      { label: 'Tycoon', value: 'tycoon', emoji: '🏭', description: 'Tycoon games' },
      { label: 'Horror', value: 'horror', emoji: '👻', description: 'Horror games' },
      { label: 'PvP', value: 'pvp', emoji: '⚔️', description: 'Player vs Player' },
    ],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Disable all buttons in a row
 */
export function disableButtons(row) {
  row.components.forEach(component => {
    if (component instanceof ButtonBuilder) {
      component.setDisabled(true);
    }
  });
  return row;
}

/**
 * Disable all components in multiple rows
 */
export function disableAllComponents(rows) {
  return rows.map(row => {
    const newRow = ActionRowBuilder.from(row);
    newRow.components.forEach(component => {
      component.setDisabled(true);
    });
    return newRow;
  });
}

/**
 * Create a link button
 */
export function createLinkButton(label, url, emoji = null) {
  const button = new ButtonBuilder()
    .setLabel(label)
    .setURL(url)
    .setStyle(ButtonStyle.Link);
  
  if (emoji) button.setEmoji(emoji);
  
  return button;
}

/**
 * Create a row with link buttons
 */
export function createLinkButtonRow(links) {
  return createButtonRow(
    links.map(link => createLinkButton(link.label, link.url, link.emoji))
  );
}

export default {
  createButton,
  createButtonRow,
  createPaginationButtons,
  createNavigationButtons,
  createCategoryButtons,
  createHelpCategoryButtons,
  createConfirmButtons,
  createModerationButtons,
  createGameButtons,
  createRPSButtons,
  createNumberButtons,
  createSelectMenu,
  createCategorySelectMenu,
  createCommandSelectMenu,
  createPromptCategorySelect,
  createGalleryButtons,
  createPlatformSelect,
  createRobloxGameSelect,
  disableButtons,
  disableAllComponents,
  createLinkButton,
  createLinkButtonRow,
};
