export async function handleInteractionCreate(interaction) {
  try {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      await command.execute(interaction);
    }

    // Handle modals
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'lore_submission_modal') {
        const { handleLoreSubmissionModal } = await import('../interactions/lore.js');
        await handleLoreSubmissionModal(interaction);
      } else if (interaction.customId === 'moment_submission_modal') {
        const { handleMomentSubmissionModal } = await import('../interactions/moment.js');
        await handleMomentSubmissionModal(interaction);
      }
    }

    // Handle buttons
    if (interaction.isButton()) {
      // Help system buttons
      if (interaction.customId.startsWith('help_')) {
        const { handleHelpButton } = await import('../interactions/help.js');
        await handleHelpButton(interaction);
      }
      // Lore buttons
      else if (interaction.customId.startsWith('lore_accept') || interaction.customId.startsWith('lore_reject')) {
        const { handleLoreButton } = await import('../interactions/lore.js');
        await handleLoreButton(interaction);
      }
      // Moment buttons
      else if (
        interaction.customId.startsWith('moment_accept') ||
        interaction.customId.startsWith('moment_reject')
      ) {
        const { handleMomentButton } = await import('../interactions/moment.js');
        await handleMomentButton(interaction);
      }
    }

    // Handle select menus
    if (interaction.isStringSelectMenu()) {
      // Help system select menus
      if (interaction.customId.startsWith('help_')) {
        const { handleHelpSelectMenu } = await import('../interactions/help.js');
        await handleHelpSelectMenu(interaction);
      }
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    if (!interaction.replied && !interaction.deferred) {
      interaction.reply({
        content: '❌ An error occurred processing your request.',
        ephemeral: true,
      }).catch(console.error);
    }
  }
}
