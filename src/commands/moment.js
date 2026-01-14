import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getMoments, getRandomMoment, getConfig, createMomentSubmission } from '../database.js';

const momentCommand = new SlashCommandBuilder()
  .setName('moment')
  .setDescription('Manage and view moments (memories)')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('submit')
      .setDescription('Submit a moment for verification')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('list')
      .setDescription('List all accepted moments')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('random')
      .setDescription('Get a random moment')
  );

export const data = momentCommand;

export async function execute(interaction) {
  const guildId = interaction.guildId;
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === 'submit') {
    const config = await getConfig(guildId);
    
    if (!config?.moment_submission_channel) {
      return interaction.reply({
        content: '❌ Moment submission channel is not configured.',
        ephemeral: true,
      });
    }

    await interaction.showModal({
      customId: 'moment_submission_modal',
      title: 'Submit a Moment',
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              customId: 'moment_content',
              label: 'Describe your moment',
              style: 2,
              max_length: 2000,
              required: true,
            },
          ],
        },
      ],
    });
  } else if (subcommand === 'list') {
    const moments = await getMoments(guildId, 10);

    if (moments.length === 0) {
      return interaction.reply({
        content: '💭 No moments recorded yet.',
        ephemeral: true,
      });
    }

    const embeds = moments.map((moment, index) =>
      new EmbedBuilder()
        .setTitle(`Moment ${index + 1}`)
        .setDescription(moment.content)
        .setColor('#FFA500')
        .setFooter({ text: `Submitted by <@${moment.submitted_by}>` })
        .setTimestamp(moment.created_at)
    );

    return interaction.reply({ embeds });
  } else if (subcommand === 'random') {
    const moment = await getRandomMoment(guildId);

    if (!moment) {
      return interaction.reply({
        content: '💭 No moments available yet.',
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('🎲 Random Moment')
      .setDescription(moment.content)
      .setColor('#FFA500')
      .setFooter({ text: `Submitted by <@${moment.submitted_by}>` })
      .setTimestamp(moment.created_at);

    return interaction.reply({ embeds: [embed] });
  }
}
