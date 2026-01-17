/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔄 INTERACTION CREATE EVENT HANDLER
 * Handles all Discord interactions: commands, buttons, select menus, modals
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export async function handleInteractionCreate(interaction) {
  try {
    // ═══════════════════════════════════════════════════════════════════════════
    // 📋 SLASH COMMANDS
    // ═══════════════════════════════════════════════════════════════════════════
    
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      await command.execute(interaction);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 📝 MODAL SUBMISSIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    if (interaction.isModalSubmit()) {
      // Lore submission modal
      if (interaction.customId === 'lore_submission_modal') {
        const { handleLoreSubmissionModal } = await import('../interactions/lore.js');
        await handleLoreSubmissionModal(interaction);
      }
      // Moment submission modal
      else if (interaction.customId === 'moment_submission_modal') {
        const { handleMomentSubmissionModal } = await import('../interactions/moment.js');
        await handleMomentSubmissionModal(interaction);
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔘 BUTTON INTERACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    if (interaction.isButton()) {
      const customId = interaction.customId;
      
      // Help system buttons
      if (customId.startsWith('help_')) {
        const { handleHelpInteraction } = await import('../interactions/general.js');
        await handleHelpInteraction(interaction);
      }
      // Gaming buttons
      else if (customId.startsWith('gaming_') || customId.startsWith('roblox_') || customId.startsWith('mc_')) {
        const { handleGamingInteraction } = await import('../interactions/general.js');
        await handleGamingInteraction(interaction);
      }
      // Art buttons
      else if (customId.startsWith('art_')) {
        const { handleArtInteraction } = await import('../interactions/general.js');
        await handleArtInteraction(interaction);
      }
      // Fun/Game buttons
      else if (customId.startsWith('fun_') || customId.startsWith('rps_') || customId.startsWith('trivia_') || customId.startsWith('guess_')) {
        const { handleFunInteraction } = await import('../interactions/general.js');
        await handleFunInteraction(interaction);
      }
      // Lore buttons
      else if (customId.startsWith('lore_accept') || customId.startsWith('lore_reject')) {
        const { handleLoreButton } = await import('../interactions/lore.js');
        await handleLoreButton(interaction);
      }
      // Moment buttons
      else if (customId.startsWith('moment_accept') || customId.startsWith('moment_reject')) {
        const { handleMomentButton } = await import('../interactions/moment.js');
        await handleMomentButton(interaction);
      }
      // Pagination buttons
      else if (customId.startsWith('page_')) {
        const { handlePaginationButton } = await import('../embeds/PaginationHandler.js');
        await handlePaginationButton(interaction);
      }
      // Navigation buttons (generic)
      else if (customId.startsWith('nav_')) {
        await handleNavigationButton(interaction);
      }
      // LFG buttons
      else if (customId.startsWith('lfg_')) {
        await handleLFGButton(interaction);
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 📜 SELECT MENU INTERACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    if (interaction.isStringSelectMenu()) {
      const customId = interaction.customId;
      
      // Help category select
      if (customId === 'help_category' || customId.startsWith('help_')) {
        const { handleHelpInteraction } = await import('../interactions/general.js');
        await handleHelpInteraction(interaction);
      }
      // Gaming platform select
      else if (customId === 'gaming_platform' || customId.startsWith('gaming_') || customId.startsWith('roblox_')) {
        const { handleGamingInteraction } = await import('../interactions/general.js');
        await handleGamingInteraction(interaction);
      }
      // Art prompt category select
      else if (customId === 'art_prompt_category' || customId.startsWith('art_')) {
        const { handleArtInteraction } = await import('../interactions/general.js');
        await handleArtInteraction(interaction);
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔧 AUTOCOMPLETE INTERACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    
    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);
      
      if (command?.autocomplete) {
        await command.autocomplete(interaction);
      }
    }

  } catch (error) {
    console.error('Error handling interaction:', error);
    
    // Send error response if not already replied
    if (!interaction.replied && !interaction.deferred) {
      const errorResponse = {
        content: '❌ An error occurred processing your request. Please try again.',
        ephemeral: true,
      };
      
      if (interaction.isButton() || interaction.isStringSelectMenu()) {
        await interaction.reply(errorResponse).catch(console.error);
      } else {
        await interaction.reply(errorResponse).catch(console.error);
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🧭 GENERIC NAVIGATION HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

async function handleNavigationButton(interaction) {
  const customId = interaction.customId;
  
  if (customId === 'nav_close') {
    return interaction.update({
      content: '✅ Closed.',
      embeds: [],
      components: [],
    });
  }
  
  if (customId === 'nav_home') {
    // Generic home - just acknowledge
    return interaction.deferUpdate();
  }
  
  if (customId === 'nav_refresh') {
    // Generic refresh - just acknowledge
    return interaction.deferUpdate();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👥 LFG (LOOKING FOR GROUP) HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

async function handleLFGButton(interaction) {
  const customId = interaction.customId;
  
  if (customId.startsWith('lfg_join_')) {
    const hostId = customId.replace('lfg_join_', '');
    
    if (interaction.user.id === hostId) {
      return interaction.reply({
        content: '❌ You cannot join your own LFG!',
        ephemeral: true,
      });
    }
    
    return interaction.reply({
      content: `✅ You've expressed interest in joining! The host <@${hostId}> will be notified.`,
      ephemeral: true,
    });
  }
  
  if (customId.startsWith('lfg_info_')) {
    return interaction.reply({
      content: '📋 Contact the host for more information about this gaming session!',
      ephemeral: true,
    });
  }
}

export default { handleInteractionCreate };
