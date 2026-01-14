import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} from 'discord.js';
import {
  getCurrentLore,
  getLoreHistory,
  getConfig,
  createLoreSubmission,
} from '../database.js';

const loreCommand = new SlashCommandBuilder()
  .setName('lore')
  .setDescription('Manage lore submissions and view lore')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('submit')
      .setDescription('Submit a lore entry for verification')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('view')
      .setDescription('View the current lore')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('history')
      .setDescription('View lore version history')
  );

export const data = loreCommand;

export async function execute(interaction) {
  const guildId = interaction.guildId;
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === 'submit') {
    const config = await getConfig(guildId);
    
    if (!config?.lore_submission_channel) {
      return interaction.reply({
        content: '❌ Lore submission channel is not configured.',
        ephemeral: true,
      });
    }

    const modal = new ModalBuilder()
      .setCustomId('lore_submission_modal')
      .setTitle('Submit Lore');

    const titleInput = new TextInputBuilder()
      .setCustomId('lore_title')
      .setLabel('Lore Title')
      .setStyle(TextInputStyle.Short)
      .setMaxLength(255)
      .setRequired(true);

    const contentInput = new TextInputBuilder()
      .setCustomId('lore_content')
      .setLabel('Lore Content')
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(4000)
      .setRequired(true);

    const row1 = new ActionRowBuilder().addComponents(titleInput);
    const row2 = new ActionRowBuilder().addComponents(contentInput);

    modal.addComponents(row1, row2);
    await interaction.showModal(modal);
  } else if (subcommand === 'view') {
    const lore = await getCurrentLore(guildId);

    if (!lore) {
      return interaction.reply({
        content: '📖 No lore has been created yet. Submit one using `/lore submit`!',
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`📖 Current Lore (Version ${lore.current_version})`)
      .setDescription(lore.content)
      .setColor('#5865F2')
      .setTimestamp(lore.updated_at);

    return interaction.reply({ embeds: [embed] });
  } else if (subcommand === 'history') {
    const history = await getLoreHistory(guildId);

    if (history.length === 0) {
      return interaction.reply({
        content: '📜 No lore history available.',
        ephemeral: true,
      });
    }

    const embeds = history.slice(0, 10).map((version) =>
      new EmbedBuilder()
        .setTitle(`Version ${version.version}`)
        .setDescription(version.content.substring(0, 1024))
        .setColor('#5865F2')
        .setTimestamp(version.created_at)
    );

    return interaction.reply({ embeds, ephemeral: true });
  }
}
