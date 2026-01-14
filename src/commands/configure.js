import { SlashCommandBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import { setConfig, getConfig } from '../database.js';

const configCommand = new SlashCommandBuilder()
  .setName('configure')
  .setDescription('Configure bot channels and roles (Admin only)')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand((subcommand) =>
    subcommand
      .setName('set_lore_submission_channel')
      .setDescription('Set the lore submission channel')
      .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('The channel for lore submissions')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('set_moment_submission_channel')
      .setDescription('Set the moment submission channel')
      .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('The channel for moment submissions')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('set_verification_channel')
      .setDescription('Set the verification channel')
      .addChannelOption((option) =>
        option
          .setName('channel')
          .setDescription('The channel for verifying submissions')
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('set_verifier_role')
      .setDescription('Set the role that can verify submissions')
      .addRoleOption((option) =>
        option
          .setName('role')
          .setDescription('The role for verifiers')
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('view')
      .setDescription('View current configuration')
  );

export const data = configCommand;

export async function execute(interaction) {
  const guildId = interaction.guildId;
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === 'view') {
    const config = await getConfig(guildId);

    if (!config) {
      return interaction.reply({
        content: '⚙️ No configuration found. Run setup commands to configure the bot.',
        ephemeral: true,
      });
    }

    const configText = `
**Current Configuration:**
• Lore Submission Channel: ${config.lore_submission_channel ? `<#${config.lore_submission_channel}>` : 'Not set'}
• Moment Submission Channel: ${config.moment_submission_channel ? `<#${config.moment_submission_channel}>` : 'Not set'}
• Verification Channel: ${config.verification_channel ? `<#${config.verification_channel}>` : 'Not set'}
• Verifier Role: ${config.verifier_role_id ? `<@&${config.verifier_role_id}>` : 'Not set'}
    `;

    return interaction.reply({ content: configText, ephemeral: true });
  }

  const channelId = interaction.options.getChannel('channel')?.id;
  const roleId = interaction.options.getRole('role')?.id;

  const configData = {
    lore_submission_channel:
      subcommand === 'set_lore_submission_channel' ? channelId : undefined,
    moment_submission_channel:
      subcommand === 'set_moment_submission_channel' ? channelId : undefined,
    verification_channel:
      subcommand === 'set_verification_channel' ? channelId : undefined,
    verifier_role_id: subcommand === 'set_verifier_role' ? roleId : undefined,
  };

  await setConfig(guildId, configData);

  const settingNames = {
    set_lore_submission_channel: 'Lore Submission Channel',
    set_moment_submission_channel: 'Moment Submission Channel',
    set_verification_channel: 'Verification Channel',
    set_verifier_role: 'Verifier Role',
  };

  interaction.reply({
    content: `✅ ${settingNames[subcommand]} has been configured!`,
    ephemeral: true,
  });
}
