/**
 * Help Command Visual Styling Utilities
 * Provides decorative elements, color schemes, and visual components
 * for a polished Discord bot help system
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 GRADIENT-INSPIRED COLOR SCHEMES
// ═══════════════════════════════════════════════════════════════════════════════

export const Colors = {
  // Primary brand colors
  PRIMARY: 0x5865F2,      // Discord Blurple
  SECONDARY: 0x7289DA,    // Classic Discord Blue
  ACCENT: 0xEB459E,       // Discord Fuchsia
  
  // Category-specific colors (gradient-inspired)
  GENERAL: 0x57F287,      // Green - General commands
  MODERATION: 0xED4245,   // Red - Moderation
  FUN: 0xFEE75C,          // Yellow - Fun/Games
  MUSIC: 0x9B59B6,        // Purple - Music
  UTILITY: 0x3498DB,      // Blue - Utility
  ADMIN: 0xE74C3C,        // Dark Red - Admin
  LORE: 0x1ABC9C,         // Teal - Lore system
  MOMENTS: 0xE91E63,      // Pink - Moments
  
  // Status colors
  SUCCESS: 0x57F287,
  WARNING: 0xFEE75C,
  ERROR: 0xED4245,
  INFO: 0x5865F2,
  
  // Premium/Special
  PREMIUM: 0xF1C40F,      // Gold
  VIP: 0x9B59B6,          // Purple
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 DECORATIVE UNICODE ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

export const Decorations = {
  // Box-drawing separators
  SEPARATOR_THIN: '─────────────────────────────────',
  SEPARATOR_THICK: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
  SEPARATOR_DOUBLE: '═══════════════════════════════════',
  SEPARATOR_DOTTED: '┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄',
  SEPARATOR_DASHED: '╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌',
  
  // Ornamental separators
  SEPARATOR_FANCY: '✦═══════════════════════════════✦',
  SEPARATOR_STARS: '⋆⋅☆⋅⋆━━━━━━━━━━━━━━━━━━━━━⋆⋅☆⋅⋆',
  SEPARATOR_DIAMOND: '◇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◇',
  SEPARATOR_SPARKLE: '✧･ﾟ: *✧･ﾟ:*━━━━━━━━━━━━━*:･ﾟ✧*:･ﾟ✧',
  SEPARATOR_WAVE: '〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️',
  
  // Corner pieces
  CORNER_TL: '╔',
  CORNER_TR: '╗',
  CORNER_BL: '╚',
  CORNER_BR: '╝',
  
  // Line pieces
  LINE_H: '═',
  LINE_V: '║',
  
  // Bullets and markers
  BULLET_DIAMOND: '◆',
  BULLET_CIRCLE: '●',
  BULLET_ARROW: '➤',
  BULLET_STAR: '★',
  BULLET_CHECK: '✓',
  BULLET_CROSS: '✗',
  BULLET_DOT: '•',
  
  // Brackets
  BRACKET_L: '【',
  BRACKET_R: '】',
  ANGLE_L: '《',
  ANGLE_R: '》',
  FANCY_L: '『',
  FANCY_R: '』',
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🏷️ CATEGORY EMOJIS AND THEMES
// ═══════════════════════════════════════════════════════════════════════════════

export const CategoryEmojis = {
  // Main category icons
  GENERAL: '📋',
  MODERATION: '🛡️',
  FUN: '🎮',
  MUSIC: '🎵',
  UTILITY: '⚙️',
  ADMIN: '👑',
  LORE: '📖',
  MOMENTS: '📸',
  HELP: '❓',
  INFO: 'ℹ️',
  
  // Navigation
  HOME: '🏠',
  BACK: '◀️',
  FORWARD: '▶️',
  FIRST: '⏮️',
  LAST: '⏭️',
  REFRESH: '🔄',
  CLOSE: '❌',
  
  // Status indicators
  ONLINE: '🟢',
  IDLE: '🟡',
  DND: '🔴',
  OFFLINE: '⚫',
  
  // Special indicators
  PREMIUM: '✨',
  CROWN: '👑',
  VERIFIED: '✅',
  NEW: '🆕',
  HOT: '🔥',
  BETA: '🧪',
  
  // Utility icons
  CLOCK: '🕐',
  CALENDAR: '📅',
  LINK: '🔗',
  LOCK: '🔒',
  UNLOCK: '🔓',
  SETTINGS: '⚙️',
  SEARCH: '🔍',
  
  // Feedback icons
  SUCCESS: '✅',
  ERROR: '❌',
  WARNING: '⚠️',
  INFO: '💡',
  TIP: '💡',
  NOTE: '📝',
  
  // Interactive
  BUTTON: '🔘',
  DROPDOWN: '📜',
  REACTION: '👆',
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 BUTTON STYLE CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const ButtonStyles = {
  categories: [
    { id: 'general', emoji: '📋', label: 'General', style: 'Primary' },
    { id: 'lore', emoji: '📖', label: 'Lore', style: 'Primary' },
    { id: 'moments', emoji: '📸', label: 'Moments', style: 'Primary' },
    { id: 'admin', emoji: '⚙️', label: 'Admin', style: 'Secondary' },
    { id: 'info', emoji: 'ℹ️', label: 'Info', style: 'Secondary' },
  ],
  
  navigation: [
    { id: 'home', emoji: '🏠', label: 'Home', style: 'Secondary' },
    { id: 'back', emoji: '◀️', label: 'Back', style: 'Secondary' },
    { id: 'close', emoji: '❌', label: 'Close', style: 'Danger' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📜 DROPDOWN MENU CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const DropdownOptions = {
  categories: [
    {
      label: 'General Commands',
      description: 'Basic bot commands and information',
      value: 'general',
      emoji: '📋',
    },
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
      label: 'Configuration',
      description: 'Server setup and admin commands',
      value: 'admin',
      emoji: '⚙️',
    },
    {
      label: 'Bot Information',
      description: 'Stats, credits, and support',
      value: 'info',
      emoji: 'ℹ️',
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ⏳ ANIMATED-STYLE EMOJI SEQUENCES
// ═══════════════════════════════════════════════════════════════════════════════

export const LoadingAnimations = {
  // Loading dots
  DOTS: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  
  // Hourglass animation
  HOURGLASS: ['⏳', '⌛'],
  
  // Clock animation
  CLOCK: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
  
  // Moon phases
  MOON: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
  
  // Spinner
  SPINNER: ['◐', '◓', '◑', '◒'],
  
  // Progress bar components
  PROGRESS_EMPTY: '░',
  PROGRESS_FILLED: '█',
  PROGRESS_PARTIAL: '▓',
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🏅 PERMISSION AND STATUS BADGES
// ═══════════════════════════════════════════════════════════════════════════════

export const Badges = {
  // Permission levels
  PERMISSION_USER: '🔰',
  PERMISSION_MOD: '🛡️',
  PERMISSION_ADMIN: '⚔️',
  PERMISSION_OWNER: '👑',
  
  // Feature badges
  PREMIUM_FEATURE: '✨ Premium',
  NEW_FEATURE: '🆕 New',
  BETA_FEATURE: '🧪 Beta',
  HOT_FEATURE: '🔥 Popular',
  
  // Status badges
  ENABLED: '🟢 Enabled',
  DISABLED: '🔴 Disabled',
  PARTIAL: '🟡 Partial',
  
  // Cooldown indicators
  COOLDOWN_NONE: '⚡ No Cooldown',
  COOLDOWN_SHORT: '⏱️ 5s Cooldown',
  COOLDOWN_MEDIUM: '⏳ 30s Cooldown',
  COOLDOWN_LONG: '⌛ 60s Cooldown',
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📝 TEXT FORMATTING HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

export const TextFormat = {
  /**
   * Create a fancy header with decorative borders
   */
  header: (text, emoji = '✦') => {
    return `${emoji} **${text}** ${emoji}`;
  },
  
  /**
   * Create a boxed title
   */
  boxedTitle: (text) => {
    return `${Decorations.BRACKET_L} ${text} ${Decorations.BRACKET_R}`;
  },
  
  /**
   * Create a command syntax display
   */
  commandSyntax: (command, args = '') => {
    return `\`/${command}${args ? ' ' + args : ''}\``;
  },
  
  /**
   * Create a code block with language
   */
  codeBlock: (content, language = '') => {
    return `\`\`\`${language}\n${content}\n\`\`\``;
  },
  
  /**
   * Create an inline code snippet
   */
  inlineCode: (text) => {
    return `\`${text}\``;
  },
  
  /**
   * Create a tip box
   */
  tip: (text) => {
    return `${CategoryEmojis.TIP} **Tip:** ${text}`;
  },
  
  /**
   * Create a warning box
   */
  warning: (text) => {
    return `${CategoryEmojis.WARNING} **Warning:** ${text}`;
  },
  
  /**
   * Create an info box
   */
  info: (text) => {
    return `${CategoryEmojis.INFO} **Info:** ${text}`;
  },
  
  /**
   * Create a note box
   */
  note: (text) => {
    return `${CategoryEmojis.NOTE} **Note:** ${text}`;
  },
  
  /**
   * Create a progress bar
   */
  progressBar: (current, max, length = 10) => {
    const filled = Math.round((current / max) * length);
    const empty = length - filled;
    return `${LoadingAnimations.PROGRESS_FILLED.repeat(filled)}${LoadingAnimations.PROGRESS_EMPTY.repeat(empty)} ${current}/${max}`;
  },
  
  /**
   * Create a status indicator
   */
  status: (isActive) => {
    return isActive ? `${CategoryEmojis.ONLINE} Active` : `${CategoryEmojis.OFFLINE} Inactive`;
  },
  
  /**
   * Format a timestamp with clock emoji
   */
  timestamp: (date = new Date()) => {
    const hours = date.getHours();
    const clockIndex = hours % 12;
    const clocks = LoadingAnimations.CLOCK;
    return `${clocks[clockIndex]} <t:${Math.floor(date.getTime() / 1000)}:R>`;
  },
  
  /**
   * Create a permission badge
   */
  permissionBadge: (level) => {
    const badges = {
      user: Badges.PERMISSION_USER,
      mod: Badges.PERMISSION_MOD,
      admin: Badges.PERMISSION_ADMIN,
      owner: Badges.PERMISSION_OWNER,
    };
    return badges[level] || badges.user;
  },
  
  /**
   * Create a bullet list
   */
  bulletList: (items, bullet = Decorations.BULLET_DOT) => {
    return items.map(item => `${bullet} ${item}`).join('\n');
  },
  
  /**
   * Create a numbered list
   */
  numberedList: (items) => {
    const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    return items.map((item, i) => `${numberEmojis[i] || `${i + 1}.`} ${item}`).join('\n');
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🖼️ EMBED TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

export const EmbedTemplates = {
  /**
   * Main help embed header
   */
  mainHeader: {
    title: `${CategoryEmojis.HELP} Command Help Center`,
    description: `${Decorations.SEPARATOR_SPARKLE}\n\nWelcome to the help system! Browse commands by category below.\n\n${Decorations.SEPARATOR_SPARKLE}`,
  },
  
  /**
   * Category headers
   */
  categoryHeaders: {
    general: {
      title: `${CategoryEmojis.GENERAL} General Commands`,
      color: Colors.GENERAL,
    },
    lore: {
      title: `${CategoryEmojis.LORE} Lore System`,
      color: Colors.LORE,
    },
    moments: {
      title: `${CategoryEmojis.MOMENTS} Moments`,
      color: Colors.MOMENTS,
    },
    admin: {
      title: `${CategoryEmojis.ADMIN} Administration`,
      color: Colors.ADMIN,
    },
    info: {
      title: `${CategoryEmojis.INFO} Bot Information`,
      color: Colors.INFO,
    },
  },
  
  /**
   * Footer templates
   */
  footers: {
    main: {
      text: `${Decorations.BULLET_STAR} Use the buttons below to navigate ${Decorations.BULLET_STAR}`,
    },
    category: {
      text: `${Decorations.BULLET_DIAMOND} Click a command for more details ${Decorations.BULLET_DIAMOND}`,
    },
    command: {
      text: `${Decorations.BULLET_ARROW} Use /help to return to main menu`,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 THUMBNAIL AND BANNER URLS
// ═══════════════════════════════════════════════════════════════════════════════

export const Images = {
  // Placeholder URLs - replace with actual bot images
  THUMBNAIL: null, // Set to your bot's avatar URL
  BANNER: null,    // Set to your bot's banner URL
  
  // Category icons (optional external images)
  CATEGORY_ICONS: {
    general: null,
    lore: null,
    moments: null,
    admin: null,
    info: null,
  },
};

export default {
  Colors,
  Decorations,
  CategoryEmojis,
  ButtonStyles,
  DropdownOptions,
  LoadingAnimations,
  Badges,
  TextFormat,
  EmbedTemplates,
  Images,
};
