/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📄 PAGINATION HANDLER
 * Manages paginated embeds with interactive navigation
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { createPaginationButtons, createNavigationButtons, disableAllComponents } from './ComponentBuilder.js';

// Store active pagination sessions
const paginationSessions = new Map();

// Session timeout (5 minutes)
const SESSION_TIMEOUT = 5 * 60 * 1000;

/**
 * Pagination Session Class
 */
class PaginationSession {
  constructor(options) {
    this.userId = options.userId;
    this.messageId = options.messageId;
    this.pages = options.pages;
    this.currentPage = options.currentPage || 0;
    this.prefix = options.prefix || 'page';
    this.additionalComponents = options.additionalComponents || [];
    this.onPageChange = options.onPageChange || null;
    this.timeout = null;
    
    this.resetTimeout();
  }
  
  resetTimeout() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      paginationSessions.delete(this.messageId);
    }, SESSION_TIMEOUT);
  }
  
  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.resetTimeout();
      return true;
    }
    return false;
  }
  
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.resetTimeout();
      return true;
    }
    return false;
  }
  
  firstPage() {
    if (this.currentPage !== 0) {
      this.currentPage = 0;
      this.resetTimeout();
      return true;
    }
    return false;
  }
  
  lastPage() {
    if (this.currentPage !== this.pages.length - 1) {
      this.currentPage = this.pages.length - 1;
      this.resetTimeout();
      return true;
    }
    return false;
  }
  
  goToPage(page) {
    if (page >= 0 && page < this.pages.length && page !== this.currentPage) {
      this.currentPage = page;
      this.resetTimeout();
      return true;
    }
    return false;
  }
  
  getCurrentEmbed() {
    return this.pages[this.currentPage];
  }
  
  getComponents() {
    const components = [];
    
    // Add pagination buttons
    if (this.pages.length > 1) {
      components.push(createPaginationButtons(this.currentPage, this.pages.length, this.prefix));
    }
    
    // Add additional components
    components.push(...this.additionalComponents);
    
    return components;
  }
  
  destroy() {
    if (this.timeout) clearTimeout(this.timeout);
    paginationSessions.delete(this.messageId);
  }
}

/**
 * Create a new pagination session
 */
export async function createPagination(interaction, pages, options = {}) {
  if (pages.length === 0) {
    throw new Error('Pages array cannot be empty');
  }
  
  const prefix = options.prefix || 'page';
  const ephemeral = options.ephemeral || false;
  const additionalComponents = options.additionalComponents || [];
  
  // Build initial components
  const components = [];
  if (pages.length > 1) {
    components.push(createPaginationButtons(0, pages.length, prefix));
  }
  components.push(...additionalComponents);
  
  // Send initial message
  const response = await interaction.reply({
    embeds: [pages[0]],
    components,
    ephemeral,
    fetchReply: true,
  });
  
  // Create session
  const session = new PaginationSession({
    userId: interaction.user.id,
    messageId: response.id,
    pages,
    currentPage: 0,
    prefix,
    additionalComponents,
    onPageChange: options.onPageChange,
  });
  
  paginationSessions.set(response.id, session);
  
  return session;
}

/**
 * Create pagination from an existing message (for edits)
 */
export async function createPaginationFromEdit(interaction, pages, options = {}) {
  if (pages.length === 0) {
    throw new Error('Pages array cannot be empty');
  }
  
  const prefix = options.prefix || 'page';
  const additionalComponents = options.additionalComponents || [];
  
  // Build initial components
  const components = [];
  if (pages.length > 1) {
    components.push(createPaginationButtons(0, pages.length, prefix));
  }
  components.push(...additionalComponents);
  
  // Update message
  await interaction.update({
    embeds: [pages[0]],
    components,
  });
  
  // Create session
  const session = new PaginationSession({
    userId: interaction.user.id,
    messageId: interaction.message.id,
    pages,
    currentPage: 0,
    prefix,
    additionalComponents,
    onPageChange: options.onPageChange,
  });
  
  paginationSessions.set(interaction.message.id, session);
  
  return session;
}

/**
 * Handle pagination button interaction
 */
export async function handlePaginationButton(interaction) {
  const session = paginationSessions.get(interaction.message.id);
  
  if (!session) {
    // Session expired
    await interaction.update({
      components: disableAllComponents(interaction.message.components),
    });
    return false;
  }
  
  // Check if user owns this session
  if (session.userId !== interaction.user.id) {
    await interaction.reply({
      content: '❌ This pagination belongs to someone else.',
      ephemeral: true,
    });
    return false;
  }
  
  const action = interaction.customId.replace(`${session.prefix}_`, '');
  let changed = false;
  
  switch (action) {
    case 'first':
      changed = session.firstPage();
      break;
    case 'prev':
      changed = session.prevPage();
      break;
    case 'next':
      changed = session.nextPage();
      break;
    case 'last':
      changed = session.lastPage();
      break;
    default:
      // Check if it's a page number
      const pageNum = parseInt(action);
      if (!isNaN(pageNum)) {
        changed = session.goToPage(pageNum - 1);
      }
  }
  
  if (changed) {
    // Call onPageChange callback if provided
    if (session.onPageChange) {
      await session.onPageChange(session.currentPage, session);
    }
    
    await interaction.update({
      embeds: [session.getCurrentEmbed()],
      components: session.getComponents(),
    });
  } else {
    // Acknowledge but don't update
    await interaction.deferUpdate();
  }
  
  return true;
}

/**
 * Get a pagination session by message ID
 */
export function getSession(messageId) {
  return paginationSessions.get(messageId);
}

/**
 * Destroy a pagination session
 */
export function destroySession(messageId) {
  const session = paginationSessions.get(messageId);
  if (session) {
    session.destroy();
  }
}

/**
 * Update pages in an existing session
 */
export function updateSessionPages(messageId, newPages) {
  const session = paginationSessions.get(messageId);
  if (session) {
    session.pages = newPages;
    if (session.currentPage >= newPages.length) {
      session.currentPage = newPages.length - 1;
    }
    return true;
  }
  return false;
}

/**
 * Check if a custom ID is a pagination button
 */
export function isPaginationButton(customId, prefix = 'page') {
  const actions = ['first', 'prev', 'next', 'last', 'indicator'];
  return actions.some(action => customId === `${prefix}_${action}`) ||
         customId.match(new RegExp(`^${prefix}_\\d+$`));
}

/**
 * Create a simple paginated list
 */
export function paginateList(items, itemsPerPage, formatItem) {
  const pages = [];
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  for (let i = 0; i < totalPages; i++) {
    const pageItems = items.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
    const formattedItems = pageItems.map((item, index) => 
      formatItem(item, i * itemsPerPage + index)
    );
    pages.push(formattedItems.join('\n'));
  }
  
  return pages;
}

/**
 * Create paginated embeds from a list
 */
export function createPaginatedEmbeds(items, itemsPerPage, embedBuilder) {
  const pages = [];
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  for (let i = 0; i < totalPages; i++) {
    const pageItems = items.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
    const embed = embedBuilder(pageItems, i, totalPages, items.length);
    pages.push(embed);
  }
  
  return pages;
}

export default {
  createPagination,
  createPaginationFromEdit,
  handlePaginationButton,
  getSession,
  destroySession,
  updateSessionPages,
  isPaginationButton,
  paginateList,
  createPaginatedEmbeds,
};
