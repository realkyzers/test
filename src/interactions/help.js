/**
 * Help Interaction Handler
 * Handles button clicks and select menu interactions for the help system
 */

import {
  buildMainHelpEmbed,
  buildCategoryEmbed,
  buildCommandDetailEmbed,
  buildInfoEmbed,
  buildCategoryButtons,
  buildCategoryDropdown,
  buildNavigationButtons,
  buildCommandDropdown,
  buildErrorEmbed,
} from '../utils/helpEmbedBuilder.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 🔘 BUTTON HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function handleHelpButton(interaction) {
  const customId = interaction.customId;
  const client = interaction.client;

  try {
    // Handle category buttons
    if (customId.startsWith('help_category_')) {
      const category = customId.replace('help_category_', '');
      
      const embed = category === 'info'
        ? buildInfoEmbed(client)
        : buildCategoryEmbed(category, client);

      const navigationRow = buildNavigationButtons(true);
      const dropdownRow = buildCategoryDropdown();
      const commandDropdown = buildCommandDropdown(category);

      const components = [dropdownRow];
      if (commandDropdown) {
        components.push(commandDropdown);
      }
      components.push(navigationRow);

      return interaction.update({
        embeds: [embed],
        components,
      });
    }

    // Handle command detail buttons
    if (customId.startsWith('help_command_')) {
      const commandName = customId.replace('help_command_', '');
      const embed = buildCommandDetailEmbed(commandName, client);

      if (!embed) {
        return interaction.update({
          embeds: [buildErrorEmbed('Command not found.')],
          components: [buildNavigationButtons(true)],
        });
      }

      const navigationRow = buildNavigationButtons(true);
      const dropdownRow = buildCategoryDropdown();

      return interaction.update({
        embeds: [embed],
        components: [dropdownRow, navigationRow],
      });
    }

    // Handle home button
    if (customId === 'help_home') {
      const embed = buildMainHelpEmbed(client);
      const [categoryButtonRow, navigationButtonRow] = buildCategoryButtons();
      const dropdownRow = buildCategoryDropdown();

      return interaction.update({
        embeds: [embed],
        components: [dropdownRow, categoryButtonRow, navigationButtonRow],
      });
    }

    // Handle close button
    if (customId === 'help_close') {
      return interaction.update({
        content: '✅ Help menu closed. Use `/help` to open it again!',
        embeds: [],
        components: [],
      });
    }

    // Handle back button
    if (customId === 'help_back') {
      const embed = buildMainHelpEmbed(client);
      const [categoryButtonRow, navigationButtonRow] = buildCategoryButtons();
      const dropdownRow = buildCategoryDropdown();

      return interaction.update({
        embeds: [embed],
        components: [dropdownRow, categoryButtonRow, navigationButtonRow],
      });
    }

  } catch (error) {
    console.error('Error handling help button:', error);
    
    if (!interaction.replied && !interaction.deferred) {
      return interaction.reply({
        content: '❌ An error occurred. Please try again.',
        ephemeral: true,
      });
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📜 SELECT MENU HANDLER
// ═══════════════════════════════════════════════════════════════════════════════

export async function handleHelpSelectMenu(interaction) {
  const customId = interaction.customId;
  const selectedValue = interaction.values[0];
  const client = interaction.client;

  try {
    // Handle category selection
    if (customId === 'help_category_select') {
      // Handle home selection
      if (selectedValue === 'home') {
        const embed = buildMainHelpEmbed(client);
        const [categoryButtonRow, navigationButtonRow] = buildCategoryButtons();
        const dropdownRow = buildCategoryDropdown();

        return interaction.update({
          embeds: [embed],
          components: [dropdownRow, categoryButtonRow, navigationButtonRow],
        });
      }

      // Handle category selection
      const embed = selectedValue === 'info'
        ? buildInfoEmbed(client)
        : buildCategoryEmbed(selectedValue, client);

      const navigationRow = buildNavigationButtons(true);
      const dropdownRow = buildCategoryDropdown();
      const commandDropdown = buildCommandDropdown(selectedValue);

      const components = [dropdownRow];
      if (commandDropdown) {
        components.push(commandDropdown);
      }
      components.push(navigationRow);

      return interaction.update({
        embeds: [embed],
        components,
      });
    }

    // Handle command selection
    if (customId === 'help_command_select') {
      // Handle home selection
      if (selectedValue === 'home') {
        const embed = buildMainHelpEmbed(client);
        const [categoryButtonRow, navigationButtonRow] = buildCategoryButtons();
        const dropdownRow = buildCategoryDropdown();

        return interaction.update({
          embeds: [embed],
          components: [dropdownRow, categoryButtonRow, navigationButtonRow],
        });
      }

      // Handle command selection
      const embed = buildCommandDetailEmbed(selectedValue, client);

      if (!embed) {
        return interaction.update({
          embeds: [buildErrorEmbed('Command not found.')],
          components: [buildNavigationButtons(true)],
        });
      }

      const navigationRow = buildNavigationButtons(true);
      const dropdownRow = buildCategoryDropdown();

      return interaction.update({
        embeds: [embed],
        components: [dropdownRow, navigationRow],
      });
    }

  } catch (error) {
    console.error('Error handling help select menu:', error);
    
    if (!interaction.replied && !interaction.deferred) {
      return interaction.reply({
        content: '❌ An error occurred. Please try again.',
        ephemeral: true,
      });
    }
  }
}

export default {
  handleHelpButton,
  handleHelpSelectMenu,
};
