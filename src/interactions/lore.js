import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import {
  getLoreSubmission,
  updateLoreSubmissionStatus,
  setLore,
  getConfig,
  getCurrentLore,
  createLoreSubmission,
} from '../database.js';

export async function handleLoreSubmissionModal(interaction) {
  try {
    const title = interaction.fields.getTextInputValue('lore_title');
    const content = interaction.fields.getTextInputValue('lore_content');
    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    const config = await getConfig(guildId);

    if (!config?.lore_submission_channel) {
      return interaction.reply({
        content: '❌ Lore submission channel not configured.',
        ephemeral: true,
      });
    }

    // Get the submission channel
    const submissionChannel = await interaction.client.channels.fetch(
      config.lore_submission_channel
    );
    const verificationChannel = await interaction.client.channels.fetch(
      config.verification_channel
    );

    if (!verificationChannel) {
      return interaction.reply({
        content: '❌ Verification channel not configured.',
        ephemeral: true,
      });
    }

    // Create database submission record (placeholder - will be updated with messageId)
    const submissionId = 1; // This would be returned from createLoreSubmission

    // Send submission to verification channel with buttons
    const embed = new EmbedBuilder()
      .setTitle(`📝 New Lore Submission: ${title}`)
      .setDescription(content)
      .setColor('#9370DB')
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setTimestamp();

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`lore_accept_${submissionId}`)
        .setLabel('✅ Accept (Rewrite Lore)')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`lore_reject_${submissionId}`)
        .setLabel('❌ Reject')
        .setStyle(ButtonStyle.Danger)
    );

    const verificationMessage = await verificationChannel.send({
      embeds: [embed],
      components: [buttons],
    });

    // Update submission with message ID in database
    await updateLoreSubmissionStatus(submissionId, 'pending', null, verificationMessage.id);

    interaction.reply({
      content: '✅ Your lore submission has been sent to the verification channel!',
      ephemeral: true,
    });
  } catch (error) {
    console.error('Error handling lore submission modal:', error);
    interaction.reply({
      content: '❌ Error submitting lore.',
      ephemeral: true,
    });
  }
}

export async function handleLoreButton(interaction) {
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

    const submission = await getLoreSubmission(submissionId);

    if (!submission) {
      return interaction.reply({
        content: '❌ Submission not found.',
        ephemeral: true,
      });
    }

    if (action === 'accept') {
      // Update submission status
      await updateLoreSubmissionStatus(submissionId, 'accepted', userId, interaction.message.id);

      // Rewrite lore by integrating new submission
      const currentLore = await getCurrentLore(guildId) || { content: '' };
      const rewrittenLore = `${currentLore.content}\n\n---\n\n**${submission.title}**\n${submission.content}`;

      await setLore(guildId, rewrittenLore, submissionId);

      // Update embed
      const embed = new EmbedBuilder(interaction.message.embeds[0])
        .setColor('#00AA00')
        .addFields({ name: 'Status', value: '✅ Accepted and integrated into lore', inline: false });

      await interaction.message.edit({ embeds: [embed], components: [] });

      interaction.reply({
        content: '✅ Lore submission accepted and integrated!',
        ephemeral: true,
      });
    } else if (action === 'reject') {
      // Update submission status
      await updateLoreSubmissionStatus(submissionId, 'rejected', userId, interaction.message.id);

      // Update embed
      const embed = new EmbedBuilder(interaction.message.embeds[0])
        .setColor('#AA0000')
        .addFields({ name: 'Status', value: '❌ Rejected', inline: false });

      await interaction.message.edit({ embeds: [embed], components: [] });

      interaction.reply({
        content: '❌ Lore submission rejected.',
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error('Error handling lore button:', error);
    interaction.reply({
      content: '❌ Error processing submission.',
      ephemeral: true,
    });
  }
}
