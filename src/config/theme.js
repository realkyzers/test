/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎨 BLACKHAWKS BOT - UNIFIED THEME CONFIGURATION
 * Gaming & Art Community Visual Design System
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 COLOR PALETTE - Gaming & Art Inspired
// ═══════════════════════════════════════════════════════════════════════════════

export const Colors = {
  // Primary Brand Colors
  PRIMARY: 0x7C3AED,        // Deep Purple - Main brand color
  SECONDARY: 0x3B82F6,      // Electric Blue - Secondary accent
  ACCENT: 0xF97316,         // Warm Orange - Highlight color
  
  // Gaming Category Colors
  GAMING: {
    MAIN: 0x8B5CF6,         // Vivid Purple - Gaming main
    ROBLOX: 0xE11D48,       // Roblox Red
    MINECRAFT: 0x22C55E,    // Minecraft Green
    GENERAL: 0x6366F1,      // Indigo - General gaming
  },
  
  // Art Category Colors
  ART: {
    MAIN: 0xEC4899,         // Pink - Art main
    SHOWCASE: 0xF472B6,     // Light Pink - Showcases
    GALLERY: 0xA855F7,      // Purple - Galleries
    PROMPTS: 0xFBBF24,      // Amber - Creative prompts
  },
  
  // Community Category Colors
  COMMUNITY: {
    MAIN: 0x06B6D4,         // Cyan - Community main
    HELP: 0x14B8A6,         // Teal - Help
    INFO: 0x0EA5E9,         // Sky Blue - Information
    MODERATION: 0xEF4444,   // Red - Moderation
  },
  
  // Fun Category Colors
  FUN: {
    MAIN: 0xFBBF24,         // Amber - Fun main
    GAMES: 0xF59E0B,        // Orange - Mini games
    SOCIAL: 0x84CC16,       // Lime - Social interactions
  },
  
  // Lore & Moments (Existing)
  LORE: 0x1ABC9C,           // Teal - Lore system
  MOMENTS: 0xE91E63,        // Pink - Moments
  
  // Status Colors
  SUCCESS: 0x22C55E,        // Green
  WARNING: 0xFBBF24,        // Amber
  ERROR: 0xEF4444,          // Red
  INFO: 0x3B82F6,           // Blue
  
  // Special Colors
  PREMIUM: 0xFFD700,        // Gold
  FEATURED: 0xA855F7,       // Purple
  NEW: 0x22D3EE,            // Cyan
  
  // Gradient-inspired pairs (for visual reference)
  GRADIENTS: {
    GAMING: [0x7C3AED, 0x3B82F6],      // Purple to Blue
    ART: [0xEC4899, 0xF97316],          // Pink to Orange
    COMMUNITY: [0x06B6D4, 0x22C55E],   // Cyan to Green
    FUN: [0xFBBF24, 0xF97316],          // Amber to Orange
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 EMOJI SYSTEM - Visual Hierarchy
// ═══════════════════════════════════════════════════════════════════════════════

export const Emojis = {
  // Category Icons
  CATEGORIES: {
    GAMING: '🎮',
    ROBLOX: '🟥',
    MINECRAFT: '⛏️',
    ART: '🎨',
    COMMUNITY: '👥',
    FUN: '🎉',
    LORE: '📖',
    MOMENTS: '📸',
    HELP: '❓',
    ADMIN: '⚙️',
  },
  
  // Gaming Emojis
  GAMING: {
    CONTROLLER: '🎮',
    TROPHY: '🏆',
    MEDAL: '🎖️',
    STAR: '⭐',
    FIRE: '🔥',
    LIGHTNING: '⚡',
    SWORD: '⚔️',
    SHIELD: '🛡️',
    CROWN: '👑',
    DICE: '🎲',
    TARGET: '🎯',
    ROCKET: '🚀',
  },
  
  // Art Emojis
  ART: {
    PALETTE: '🎨',
    BRUSH: '🖌️',
    PENCIL: '✏️',
    FRAME: '🖼️',
    SPARKLES: '✨',
    RAINBOW: '🌈',
    CAMERA: '📷',
    CANVAS: '🎭',
    MAGIC: '🪄',
    HEART: '💜',
  },
  
  // Community Emojis
  COMMUNITY: {
    PEOPLE: '👥',
    WAVE: '👋',
    HANDSHAKE: '🤝',
    HEART: '❤️',
    STAR: '🌟',
    MEGAPHONE: '📢',
    BELL: '🔔',
    BOOK: '📚',
    LIGHTBULB: '💡',
    CHAT: '💬',
  },
  
  // Status Emojis
  STATUS: {
    ONLINE: '🟢',
    IDLE: '🟡',
    DND: '🔴',
    OFFLINE: '⚫',
    SUCCESS: '✅',
    ERROR: '❌',
    WARNING: '⚠️',
    INFO: 'ℹ️',
    LOADING: '⏳',
    DONE: '✔️',
  },
  
  // Navigation Emojis
  NAV: {
    HOME: '🏠',
    BACK: '◀️',
    FORWARD: '▶️',
    FIRST: '⏮️',
    LAST: '⏭️',
    UP: '🔼',
    DOWN: '🔽',
    REFRESH: '🔄',
    CLOSE: '❌',
    MENU: '📋',
  },
  
  // Special Emojis
  SPECIAL: {
    PREMIUM: '💎',
    VIP: '👑',
    NEW: '🆕',
    HOT: '🔥',
    FEATURED: '⭐',
    VERIFIED: '✅',
    LOCKED: '🔒',
    UNLOCKED: '🔓',
    GIFT: '🎁',
    PARTY: '🎊',
  },
  
  // Decorative Bullets
  BULLETS: {
    ARROW: '➤',
    DIAMOND: '◆',
    CIRCLE: '●',
    STAR: '★',
    DOT: '•',
    DASH: '─',
    SPARKLE: '✦',
  },
  
  // Number Emojis
  NUMBERS: ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
  
  // Letter Emojis (for reactions)
  LETTERS: {
    A: '🅰️', B: '🅱️', O: '🅾️',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎀 DECORATIVE ELEMENTS - Unicode Art
// ═══════════════════════════════════════════════════════════════════════════════

export const Decorations = {
  // Line Separators
  LINES: {
    THIN: '─────────────────────────────────',
    THICK: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    DOUBLE: '═══════════════════════════════════',
    DOTTED: '┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄',
    DASHED: '╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌',
  },
  
  // Fancy Separators
  FANCY: {
    STARS: '⋆⋅☆⋅⋆━━━━━━━━━━━━━━━━━━━━━⋆⋅☆⋅⋆',
    SPARKLE: '✧･ﾟ: *✧･ﾟ:*━━━━━━━━━━━━━*:･ﾟ✧*:･ﾟ✧',
    DIAMOND: '◇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◇',
    GAMING: '🎮═══════════════════════════🎮',
    ART: '🎨═══════════════════════════🎨',
    CROWN: '👑═══════════════════════════👑',
  },
  
  // Brackets
  BRACKETS: {
    SQUARE: ['【', '】'],
    ANGLE: ['《', '》'],
    FANCY: ['『', '』'],
    ROUND: ['（', '）'],
    STAR: ['★', '★'],
  },
  
  // Box Drawing
  BOX: {
    TL: '╔', TR: '╗', BL: '╚', BR: '╝',
    H: '═', V: '║',
    T: '╦', B: '╩', L: '╠', R: '╣',
    CROSS: '╬',
  },
  
  // Progress Bar Components
  PROGRESS: {
    EMPTY: '░',
    PARTIAL: '▒',
    FILLED: '█',
    START_EMPTY: '▱',
    START_FILLED: '▰',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🏷️ BRANDING - Server Identity
// ═══════════════════════════════════════════════════════════════════════════════

export const Branding = {
  // Bot Identity
  BOT_NAME: 'BlackHawks Bot',
  BOT_TAGLINE: 'Your Gaming & Art Community Companion',
  VERSION: '2.0.0',
  
  // Server Identity
  SERVER_NAME: 'BlackHawks',
  SERVER_TAGLINE: 'Gaming • Art • Community',
  
  // Footer Templates
  FOOTERS: {
    DEFAULT: '✦ BlackHawks Bot • Gaming & Art Community ✦',
    GAMING: '🎮 BlackHawks Gaming Hub 🎮',
    ART: '🎨 BlackHawks Art Gallery 🎨',
    COMMUNITY: '👥 BlackHawks Community 👥',
    HELP: '❓ Use /help for more commands',
    TIP: '💡 Tip: ',
  },
  
  // Author Templates
  AUTHORS: {
    DEFAULT: { name: 'BlackHawks Bot', iconURL: null },
    GAMING: { name: '🎮 Gaming Hub', iconURL: null },
    ART: { name: '🎨 Art Gallery', iconURL: null },
    COMMUNITY: { name: '👥 Community', iconURL: null },
  },
  
  // URLs (set these to actual URLs)
  URLS: {
    WEBSITE: null,
    SUPPORT: null,
    INVITE: null,
    GITHUB: null,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📝 TEXT TEMPLATES - Consistent Messaging
// ═══════════════════════════════════════════════════════════════════════════════

export const Templates = {
  // Success Messages
  SUCCESS: {
    GENERIC: (action) => `${Emojis.STATUS.SUCCESS} Successfully ${action}!`,
    SAVED: (item) => `${Emojis.STATUS.SUCCESS} ${item} has been saved!`,
    CREATED: (item) => `${Emojis.STATUS.SUCCESS} ${item} has been created!`,
    DELETED: (item) => `${Emojis.STATUS.SUCCESS} ${item} has been deleted!`,
    UPDATED: (item) => `${Emojis.STATUS.SUCCESS} ${item} has been updated!`,
  },
  
  // Error Messages
  ERROR: {
    GENERIC: `${Emojis.STATUS.ERROR} An error occurred. Please try again.`,
    NOT_FOUND: (item) => `${Emojis.STATUS.ERROR} ${item} not found.`,
    NO_PERMISSION: `${Emojis.STATUS.ERROR} You don't have permission to do this.`,
    COOLDOWN: (time) => `${Emojis.STATUS.WARNING} Please wait ${time} before using this again.`,
    INVALID_INPUT: `${Emojis.STATUS.ERROR} Invalid input. Please check and try again.`,
  },
  
  // Info Messages
  INFO: {
    LOADING: `${Emojis.STATUS.LOADING} Loading...`,
    PROCESSING: `${Emojis.STATUS.LOADING} Processing your request...`,
    EMPTY: (item) => `${Emojis.STATUS.INFO} No ${item} found.`,
    TIP: (text) => `${Emojis.COMMUNITY.LIGHTBULB} **Tip:** ${text}`,
    NOTE: (text) => `${Emojis.STATUS.INFO} **Note:** ${text}`,
  },
  
  // Warning Messages
  WARNING: {
    GENERIC: (text) => `${Emojis.STATUS.WARNING} **Warning:** ${text}`,
    CONFIRM: (action) => `${Emojis.STATUS.WARNING} Are you sure you want to ${action}?`,
    IRREVERSIBLE: `${Emojis.STATUS.WARNING} This action cannot be undone.`,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ⏱️ ANIMATION SEQUENCES
// ═══════════════════════════════════════════════════════════════════════════════

export const Animations = {
  // Loading Dots
  DOTS: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  
  // Hourglass
  HOURGLASS: ['⏳', '⌛'],
  
  // Clock
  CLOCK: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
  
  // Spinner
  SPINNER: ['◐', '◓', '◑', '◒'],
  
  // Moon Phases
  MOON: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
  
  // Gaming Loading
  GAMING: ['🎮', '🕹️', '👾', '🎯', '🎲'],
  
  // Art Loading
  ART: ['🎨', '🖌️', '✏️', '🖼️', '✨'],
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 COMMAND CATEGORIES CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export const Categories = {
  GAMING: {
    id: 'gaming',
    name: 'Gaming',
    description: 'Roblox, Minecraft, and gaming utilities',
    emoji: Emojis.CATEGORIES.GAMING,
    color: Colors.GAMING.MAIN,
  },
  ART: {
    id: 'art',
    name: 'Art',
    description: 'Showcase, galleries, and creative prompts',
    emoji: Emojis.CATEGORIES.ART,
    color: Colors.ART.MAIN,
  },
  COMMUNITY: {
    id: 'community',
    name: 'Community',
    description: 'Help, information, and moderation',
    emoji: Emojis.CATEGORIES.COMMUNITY,
    color: Colors.COMMUNITY.MAIN,
  },
  FUN: {
    id: 'fun',
    name: 'Fun',
    description: 'Games, interactions, and entertainment',
    emoji: Emojis.CATEGORIES.FUN,
    color: Colors.FUN.MAIN,
  },
  LORE: {
    id: 'lore',
    name: 'Lore',
    description: 'Server lore and storytelling',
    emoji: Emojis.CATEGORIES.LORE,
    color: Colors.LORE,
  },
  MOMENTS: {
    id: 'moments',
    name: 'Moments',
    description: 'Capture and share memories',
    emoji: Emojis.CATEGORIES.MOMENTS,
    color: Colors.MOMENTS,
  },
  ADMIN: {
    id: 'admin',
    name: 'Admin',
    description: 'Server configuration and management',
    emoji: Emojis.CATEGORIES.ADMIN,
    color: Colors.COMMUNITY.MODERATION,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 🔧 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create a progress bar string
 */
export function createProgressBar(current, max, length = 10, style = 'default') {
  const percentage = Math.min(current / max, 1);
  const filled = Math.round(percentage * length);
  const empty = length - filled;
  
  const styles = {
    default: { filled: Decorations.PROGRESS.FILLED, empty: Decorations.PROGRESS.EMPTY },
    minimal: { filled: Decorations.PROGRESS.START_FILLED, empty: Decorations.PROGRESS.START_EMPTY },
  };
  
  const { filled: f, empty: e } = styles[style] || styles.default;
  return `${f.repeat(filled)}${e.repeat(empty)} ${Math.round(percentage * 100)}%`;
}

/**
 * Format a timestamp with clock emoji
 */
export function formatTimestamp(date = new Date(), format = 'R') {
  const timestamp = Math.floor(date.getTime() / 1000);
  const clockIndex = date.getHours() % 12;
  return `${Animations.CLOCK[clockIndex]} <t:${timestamp}:${format}>`;
}

/**
 * Create a boxed title
 */
export function boxedTitle(text, style = 'SQUARE') {
  const [left, right] = Decorations.BRACKETS[style] || Decorations.BRACKETS.SQUARE;
  return `${left} ${text} ${right}`;
}

/**
 * Create a bullet list
 */
export function bulletList(items, bullet = Emojis.BULLETS.DOT) {
  return items.map(item => `${bullet} ${item}`).join('\n');
}

/**
 * Create a numbered list with emoji numbers
 */
export function numberedList(items) {
  return items.map((item, i) => `${Emojis.NUMBERS[i + 1] || `${i + 1}.`} ${item}`).join('\n');
}

/**
 * Get category configuration by ID
 */
export function getCategory(categoryId) {
  return Object.values(Categories).find(cat => cat.id === categoryId) || null;
}

/**
 * Get color for a category
 */
export function getCategoryColor(categoryId) {
  const category = getCategory(categoryId);
  return category?.color || Colors.PRIMARY;
}

/**
 * Get emoji for a category
 */
export function getCategoryEmoji(categoryId) {
  const category = getCategory(categoryId);
  return category?.emoji || '📋';
}

export default {
  Colors,
  Emojis,
  Decorations,
  Branding,
  Templates,
  Animations,
  Categories,
  createProgressBar,
  formatTimestamp,
  boxedTitle,
  bulletList,
  numberedList,
  getCategory,
  getCategoryColor,
  getCategoryEmoji,
};
