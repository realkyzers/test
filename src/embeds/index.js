/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📦 EMBEDS MODULE INDEX
 * Central export point for all embed-related utilities
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Embed Builder exports
export {
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
  Colors,
  Emojis,
  Decorations,
  Branding,
  Templates,
  Categories,
} from './EmbedBuilder.js';

// Component Builder exports
export {
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
} from './ComponentBuilder.js';

// Pagination Handler exports
export {
  createPagination,
  createPaginationFromEdit,
  handlePaginationButton,
  getSession,
  destroySession,
  updateSessionPages,
  isPaginationButton,
  paginateList,
} from './PaginationHandler.js';

// Default export with all modules
import EmbedBuilder from './EmbedBuilder.js';
import ComponentBuilder from './ComponentBuilder.js';
import PaginationHandler from './PaginationHandler.js';

export default {
  ...EmbedBuilder,
  ...ComponentBuilder,
  ...PaginationHandler,
};
