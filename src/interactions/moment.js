import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import {
  createMomentSubmission,
  getMomentSubmission,
  updateMomentSubmissionStatus,
  createMoment,
  getConfig,
} from '../database.js';

export async function handleMomentSubmissionModal(interaction) {
  try {
    const content = interaction.fields.getTextInputValue('moment_content');
    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    const config = await getConfig(guildId);

    if (!config?.moment_submission_channel) {
      return interaction.reply({
        content: '❌ Moment submission channel not configured.',
        ephemeral: true,
      });
    }

    if (!config?.verification_channel) {
      return interaction.reply({
        content: '❌ Verification channel not configured.',
        ephemeral: true,
      });
    }

    // Create submission record
    const submissionId = await createMomentSubmission(guildId, userId, content);

    // Send to verification channel
    const verificationChannel = await interaction.client.channels.fetch(
      config.verification_channel
    );

    const embed = new EmbedBuilder()
      .setTitle('💭 New Moment Submission')
      .setDescription(content)
      .setColor('#FFD700')
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setFooter({ text: `Submission ID: ${submissionId}` })
      .setTimestamp();

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`moment_accept_${submissionId}`)
        .setLabel('✅ Accept')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`moment_reject_${submissionId}`)
        .setLabel('❌ Reject')
        .setStyle(ButtonStyle.Danger)
    );

    const verificationMessage = await verificationChannel.send({
      embeds: [embed],
      components: [buttons],
    });

    // Update with message ID
    await updateMomentSubmissionStatus(submissionId, 'pending', null, verificationMessage.id);

    interaction.reply({
      content: '✅ Your moment has been submitted for verification!',
      ephemeral: true,
    });
  } catch (error) {
    console.error('Error handling moment submission modal:', error);
    interaction.reply({
      content: '❌ Error submitting moment.',
      ephemeral: true,
    });
  }
}

export async function handleMomentButton(interaction) {
  try {
    const [action, submissionId] = interaction.customId.split('_').slice(1);
    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    const config = await getConfig(guildId);

    // Check if user has verifier role
    if (!interaction.member.roles.cache.has(config.verifier_role_id)) {
      return interaction.reply({
        content: '❌ You do not have permission to verify submissions.',
        ephemeral: true,
      });
    }

    const submission = await getMomentSubmission(submissionId);

    if (!submission) {
      return interaction.reply({
        content: '❌ Submission not found.',
        ephemeral: true,
      });
    }

    if (action === 'accept') {
      // Create moment record
      const momentId = await createMoment(guildId, submission.content, submission.user_id, userId);

      // Update submission status
      await updateMomentSubmissionStatus(submissionId, 'accepted', userId, interaction.message.id, momentId);

      // Update embed
      const embed = new EmbedBuilder(interaction.message.embeds[0])
        .setColor('#00AA00')
        .addFields({ name: 'Status', value: '✅ Accepted', inline: false });

      await interaction.message.edit({ embeds: [embed], components: [] });

      interaction.reply({
        content: '✅ Moment accepted and added to the archive!',
        ephemeral: true,
      });
    } else if (action === 'reject') {
      // Update submission status
      await updateMomentSubmissionStatus(submissionId, 'rejected', userId, interaction.message.id);

      // Update embed
      const embed = new EmbedBuilder(interaction.message.embeds[0])
        .setColor('#AA0000')
        .addFields({ name: 'Status', value: '❌ Rejected', inline: false });

      await interaction.message.edit({ embeds: [embed], components: [] });

      interaction.reply({
        content: '❌ Moment submission rejected.',
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error('Error handling moment button:', error);
    interaction.reply({
      content: '❌ Error processing submission.',
      ephemeral: true,
    });
  }
}

async function getMomentSubmission(submissionId) {
  // This would be implemented in database.js
  // For now, placeholder
  return null;
}
