/**
 * Help Command
 * A comprehensive, beautifully styled help system with interactive navigation
 */

import { SlashCommandBuilder } from 'discord.js';
import {
  buildMainHelpEmbed,
  buildCategoryEmbed,
  buildCommandDetailEmbed,
  buildInfoEmbed,
  buildCategoryButtons,
  buildCategoryDropdown,
  buildNavigationButtons,
  buildCommandDropdown,
  CommandData,
} from '../utils/helpEmbedBuilder.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 COMMAND DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Display the interactive help menu with all available commands')
  .addStringOption(option =>
    option
      .setName('command')
      .setDescription('Get detailed help for a specific command')
      .setRequired(false)
      .addChoices(
        { name: '/lore - Lore management system', value: 'lore' },
        { name: '/moment - Moment capture system', value: 'moment' },
        { name: '/configure - Bot configuration', value: 'configure' },
        { name: '/help - This help menu', value: 'help' },
      )
  )
  .addStringOption(option =>
    option
      .setName('category')
      .setDescription('View commands in a specific category')
      .setRequired(false)
      .addChoices(
        { name: '📖 Lore System', value: 'lore' },
        { name: '📸 Moments', value: 'moments' },
        { name: '⚙️ Administration', value: 'admin' },
        { name: 'ℹ️ Bot Information', value: 'info' },
      )
  );

export const data = helpCommand;

// ═══════════════════════════════════════════════════════════════════════════════
// ⚡ COMMAND EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

export async function execute(interaction) {
  const commandOption = interaction.options.getString('command');
  const categoryOption = interaction.options.getString('category');
  const client = interaction.client;

  try {
    // If a specific command was requested
    if (commandOption) {
      const embed = buildCommandDetailEmbed(commandOption, client);
      
      if (!embed) {
        return interaction.reply({
          content: '❌ Command not found. Use `/help` to see all available commands.',
          ephemeral: true,
        });
      }

      const navigationRow = buildNavigationButtons(true);
      const dropdownRow = buildCategoryDropdown();

      return interaction.reply({
        embeds: [embed],
        components: [dropdownRow, navigationRow],
        ephemeral: false,
      });
    }

    // If a specific category was requested
    if (categoryOption) {
      const embed = categoryOption === 'info' 
        ? buildInfoEmbed(client)
        : buildCategoryEmbed(categoryOption, client);

      const navigationRow = buildNavigationButtons(true);
      const dropdownRow = buildCategoryDropdown();
      const commandDropdown = buildCommandDropdown(categoryOption);

      const components = [dropdownRow];
      if (commandDropdown) {
        components.push(commandDropdown);
      }
      components.push(navigationRow);

      return interaction.reply({
        embeds: [embed],
        components,
        ephemeral: false,
      });
    }

    // Default: Show main help menu
    const embed = buildMainHelpEmbed(client);
    const [categoryButtonRow, navigationButtonRow] = buildCategoryButtons();
    const dropdownRow = buildCategoryDropdown();

    return interaction.reply({
      embeds: [embed],
      components: [dropdownRow, categoryButtonRow, navigationButtonRow],
      ephemeral: false,
    });

  } catch (error) {
    console.error('Error executing help command:', error);
    return interaction.reply({
      content: '❌ An error occurred while displaying the help menu. Please try again.',
      ephemeral: true,
    });
  }
}
