/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎨 ART COMMANDS
 * Showcase, galleries, prompts, and creative tools
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { artEmbed, showcaseEmbed, galleryEmbed, promptEmbed, BotEmbed } from '../embeds/EmbedBuilder.js';
import { 
  createPromptCategorySelect,
  createGalleryButtons,
  createNavigationButtons,
  createButtonRow,
  createSelectMenu,
} from '../embeds/ComponentBuilder.js';
import { Colors, Emojis, Decorations, Branding } from '../config/theme.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 ART PROMPTS DATABASE
// ═══════════════════════════════════════════════════════════════════════════════

const ArtPrompts = {
  character: [
    'A mysterious traveler with a glowing lantern in a dark forest',
    'A cyberpunk street vendor selling exotic fruits',
    'An ancient guardian made of living stone and moss',
    'A young mage discovering their powers for the first time',
    'A steampunk inventor with mechanical wings',
    'A warrior from a forgotten civilization',
    'A friendly ghost running a cozy tea shop',
    'A dragon disguised as a human librarian',
    'A time-traveling detective from the 1920s',
    'An alien botanist studying Earth plants',
  ],
  environment: [
    'A floating city above the clouds at sunset',
    'An underwater temple with bioluminescent coral',
    'A cozy treehouse village in an enchanted forest',
    'A post-apocalyptic garden reclaiming a city',
    'A crystal cave with rainbow light reflections',
    'A space station orbiting a gas giant',
    'A magical library that extends infinitely',
    'A desert oasis with impossible waterfalls',
    'A neon-lit alley in a rainy cyberpunk city',
    'A peaceful meadow with giant mushrooms',
  ],
  object: [
    'A music box that plays memories instead of songs',
    'A sword forged from crystallized starlight',
    'A potion bottle containing a miniature storm',
    'An ancient map that shows hidden paths',
    'A mechanical bird that delivers secret messages',
    'A mirror that shows alternate realities',
    'A book that writes itself as you read',
    'A compass that points to your heart\'s desire',
    'A lantern that reveals invisible things',
    'A key that can open any door, but only once',
  ],
  abstract: [
    'The feeling of nostalgia as a landscape',
    'Music visualized as flowing colors',
    'The concept of time as a physical space',
    'Dreams merging with reality',
    'Emotions as weather patterns',
    'The sound of silence given form',
    'Hope growing from despair',
    'The space between heartbeats',
    'Memories fading like watercolors',
    'The weight of unspoken words',
  ],
  fanart: [
    'Your favorite character in a different art style',
    'A crossover between two of your favorite series',
    'A villain redemption scene',
    'Characters from different universes meeting',
    'A "what if" scenario from your favorite story',
    'Your favorite character in modern clothing',
    'A group photo of characters who never met',
    'Your favorite scene reimagined',
    'Characters swapping roles or powers',
    'A peaceful moment for usually busy characters',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 COMMAND DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

export const data = new SlashCommandBuilder()
  .setName('art')
  .setDescription('Art tools, prompts, and showcase features')
  .addSubcommand(sub =>
    sub.setName('hub')
      .setDescription('Open the art hub with all creative features')
  )
  .addSubcommand(sub =>
    sub.setName('prompt')
      .setDescription('Get a random art prompt for inspiration')
      .addStringOption(opt =>
        opt.setName('category')
          .setDescription('Prompt category')
          .setRequired(false)
          .addChoices(
            { name: '👤 Character Design', value: 'character' },
            { name: '🏞️ Environment', value: 'environment' },
            { name: '📦 Object/Item', value: 'object' },
            { name: '🌀 Abstract', value: 'abstract' },
            { name: '⭐ Fan Art', value: 'fanart' },
            { name: '🎲 Random', value: 'random' },
          )
      )
  )
  .addSubcommand(sub =>
    sub.setName('showcase')
      .setDescription('Showcase your artwork to the community')
      .addAttachmentOption(opt =>
        opt.setName('artwork')
          .setDescription('Your artwork image')
          .setRequired(true)
      )
      .addStringOption(opt =>
        opt.setName('title')
          .setDescription('Title for your artwork')
          .setRequired(true)
          .setMaxLength(100)
      )
      .addStringOption(opt =>
        opt.setName('description')
          .setDescription('Description of your artwork')
          .setRequired(false)
          .setMaxLength(500)
      )
  )
  .addSubcommand(sub =>
    sub.setName('palette')
      .setDescription('Generate a random color palette')
      .addStringOption(opt =>
        opt.setName('mood')
          .setDescription('Mood/theme for the palette')
          .setRequired(false)
          .addChoices(
            { name: '🌅 Warm', value: 'warm' },
            { name: '❄️ Cool', value: 'cool' },
            { name: '🌈 Vibrant', value: 'vibrant' },
            { name: '🌙 Dark', value: 'dark' },
            { name: '☀️ Light', value: 'light' },
            { name: '🍂 Earthy', value: 'earthy' },
            { name: '🎲 Random', value: 'random' },
          )
      )
  )
  .addSubcommand(sub =>
    sub.setName('challenge')
      .setDescription('Get a timed art challenge')
      .addStringOption(opt =>
        opt.setName('difficulty')
          .setDescription('Challenge difficulty')
          .setRequired(false)
          .addChoices(
            { name: '🟢 Easy (30 min)', value: 'easy' },
            { name: '🟡 Medium (1 hour)', value: 'medium' },
            { name: '🔴 Hard (2 hours)', value: 'hard' },
            { name: '💀 Extreme (15 min)', value: 'extreme' },
          )
      )
  )
  .addSubcommand(sub =>
    sub.setName('tips')
      .setDescription('Get random art tips and techniques')
      .addStringOption(opt =>
        opt.setName('topic')
          .setDescription('Specific topic')
          .setRequired(false)
          .addChoices(
            { name: '✏️ Sketching', value: 'sketching' },
            { name: '🎨 Coloring', value: 'coloring' },
            { name: '💡 Lighting', value: 'lighting' },
            { name: '👤 Anatomy', value: 'anatomy' },
            { name: '🏞️ Backgrounds', value: 'backgrounds' },
            { name: '🎲 Random', value: 'random' },
          )
      )
  );

// ═══════════════════════════════════════════════════════════════════════════════
// ⚡ COMMAND EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();
  
  switch (subcommand) {
    case 'hub':
      return handleArtHub(interaction);
    case 'prompt':
      return handlePrompt(interaction);
    case 'showcase':
      return handleShowcase(interaction);
    case 'palette':
      return handlePalette(interaction);
    case 'challenge':
      return handleChallenge(interaction);
    case 'tips':
      return handleTips(interaction);
    default:
      return interaction.reply({
        content: '❌ Unknown subcommand.',
        ephemeral: true,
      });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 ART HUB
// ═══════════════════════════════════════════════════════════════════════════════

async function handleArtHub(interaction) {
  const embed = new BotEmbed({ color: Colors.ART.MAIN })
    .setTitle(`${Emojis.CATEGORIES.ART} 【 Art Hub 】`)
    .setDescription(
      `${Decorations.FANCY.ART}\n\n` +
      `Welcome to the **BlackHawks Art Hub**!\n` +
      `Your creative space for inspiration and sharing.\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `${Emojis.ART.MAGIC} Prompts`,
        value: 
          `${Emojis.BULLETS.ARROW} Get creative prompts\n` +
          `${Emojis.BULLETS.ARROW} Multiple categories\n` +
          `${Emojis.BULLETS.ARROW} Daily challenges`,
        inline: true,
      },
      {
        name: `${Emojis.ART.FRAME} Showcase`,
        value: 
          `${Emojis.BULLETS.ARROW} Share your art\n` +
          `${Emojis.BULLETS.ARROW} Get feedback\n` +
          `${Emojis.BULLETS.ARROW} Community gallery`,
        inline: true,
      },
      {
        name: `${Emojis.ART.PALETTE} Tools`,
        value: 
          `${Emojis.BULLETS.ARROW} Color palettes\n` +
          `${Emojis.BULLETS.ARROW} Art tips\n` +
          `${Emojis.BULLETS.ARROW} Timed challenges`,
        inline: true,
      }
    )
    .addFields({
      name: `${Decorations.LINES.THIN}`,
      value: `${Emojis.COMMUNITY.LIGHTBULB} **Tip:** Use \`/art prompt\` to get instant inspiration!`,
      inline: false,
    })
    .setFooter({ text: Branding.FOOTERS.ART })
    .setThumbnail(interaction.client.user.displayAvatarURL({ size: 256 }));

  const categorySelect = createPromptCategorySelect('art_prompt_category');
  const navButtons = createNavigationButtons({ home: false, closeId: 'art_close' });

  return interaction.reply({
    embeds: [embed],
    components: [categorySelect, navButtons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ ART PROMPTS
// ═══════════════════════════════════════════════════════════════════════════════

async function handlePrompt(interaction) {
  let category = interaction.options.getString('category') || 'random';
  
  // Handle random category
  if (category === 'random') {
    const categories = Object.keys(ArtPrompts);
    category = categories[Math.floor(Math.random() * categories.length)];
  }
  
  const prompts = ArtPrompts[category];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  const categoryNames = {
    character: 'Character Design',
    environment: 'Environment',
    object: 'Object/Item',
    abstract: 'Abstract',
    fanart: 'Fan Art',
  };
  
  const categoryEmojis = {
    character: '👤',
    environment: '🏞️',
    object: '📦',
    abstract: '🌀',
    fanart: '⭐',
  };
  
  const embed = promptEmbed(prompt, categoryNames[category])
    .addFields(
      {
        name: `${categoryEmojis[category]} Category`,
        value: categoryNames[category],
        inline: true,
      },
      {
        name: `${Emojis.GAMING.DICE} Difficulty`,
        value: getDifficultyRating(),
        inline: true,
      }
    )
    .addTip('Share your creation in the art channel when you\'re done!');

  const buttons = createButtonRow([
    { customId: 'art_prompt_new', label: 'New Prompt', emoji: Emojis.NAV.REFRESH, style: 1 },
    { customId: `art_prompt_${category}`, label: 'Same Category', emoji: categoryEmojis[category], style: 2 },
    { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

function getDifficultyRating() {
  const ratings = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  return ratings[Math.floor(Math.random() * ratings.length)];
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🖼️ SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

async function handleShowcase(interaction) {
  const artwork = interaction.options.getAttachment('artwork');
  const title = interaction.options.getString('title');
  const description = interaction.options.getString('description') || 'No description provided.';
  
  // Validate attachment is an image
  if (!artwork.contentType?.startsWith('image/')) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please upload an image file!`,
      ephemeral: true,
    });
  }
  
  const embed = showcaseEmbed(
    title,
    `${Decorations.FANCY.ART}\n\n` +
    `${description}\n\n` +
    `${Decorations.LINES.THIN}`,
    artwork.url
  )
    .addFields(
      {
        name: `${Emojis.ART.BRUSH} Artist`,
        value: `${interaction.user}`,
        inline: true,
      },
      {
        name: `${Emojis.COMMUNITY.CALENDAR} Shared`,
        value: `<t:${Math.floor(Date.now() / 1000)}:R>`,
        inline: true,
      }
    )
    .setThumbnail(interaction.user.displayAvatarURL({ size: 128 }));

  const buttons = createButtonRow([
    { customId: `art_like_${interaction.user.id}`, label: '0', emoji: Emojis.ART.HEART, style: 2 },
    { customId: `art_save_${interaction.user.id}`, label: 'Save', emoji: '📌', style: 2 },
    { customId: `art_feedback_${interaction.user.id}`, label: 'Feedback', emoji: '💬', style: 1 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════════════════

async function handlePalette(interaction) {
  const mood = interaction.options.getString('mood') || 'random';
  
  const palettes = {
    warm: [
      ['#FF6B6B', '#FFA07A', '#FFD93D', '#FF8C42', '#E85D04'],
      ['#D62828', '#F77F00', '#FCBF49', '#EAE2B7', '#F4A261'],
    ],
    cool: [
      ['#48CAE4', '#00B4D8', '#0077B6', '#023E8A', '#03045E'],
      ['#7209B7', '#560BAD', '#480CA8', '#3A0CA3', '#3F37C9'],
    ],
    vibrant: [
      ['#FF006E', '#8338EC', '#3A86FF', '#06D6A0', '#FFD60A'],
      ['#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'],
    ],
    dark: [
      ['#1A1A2E', '#16213E', '#0F3460', '#533483', '#E94560'],
      ['#2D132C', '#801336', '#C72C41', '#EE4540', '#510A32'],
    ],
    light: [
      ['#FFF5E4', '#FFE3E1', '#FFD1D1', '#FF9494', '#FFABAB'],
      ['#E8F3D6', '#FEFBE9', '#FCF9BE', '#F7E9A0', '#F0E68C'],
    ],
    earthy: [
      ['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'],
      ['#8B5E3C', '#A0522D', '#CD853F', '#D2B48C', '#F5DEB3'],
    ],
  };
  
  let selectedMood = mood;
  if (mood === 'random') {
    const moods = Object.keys(palettes);
    selectedMood = moods[Math.floor(Math.random() * moods.length)];
  }
  
  const moodPalettes = palettes[selectedMood];
  const palette = moodPalettes[Math.floor(Math.random() * moodPalettes.length)];
  
  const moodEmojis = {
    warm: '🌅',
    cool: '❄️',
    vibrant: '🌈',
    dark: '🌙',
    light: '☀️',
    earthy: '🍂',
  };
  
  const colorBlocks = palette.map(color => `\`${color}\``).join(' ');
  const colorPreview = palette.map(color => `█`).join('');
  
  const embed = new BotEmbed({ color: parseInt(palette[0].replace('#', ''), 16) })
    .setTitle(`${Emojis.ART.PALETTE} Color Palette`)
    .setDescription(
      `${Decorations.FANCY.ART}\n\n` +
      `**${moodEmojis[selectedMood]} ${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Palette**\n\n` +
      `${colorBlocks}\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `${Emojis.ART.BRUSH} Colors`,
        value: palette.map((color, i) => `${Emojis.NUMBERS[i + 1]} ${color}`).join('\n'),
        inline: true,
      },
      {
        name: `${Emojis.STATUS.INFO} Usage Tips`,
        value: 
          `${Emojis.BULLETS.DOT} Use ${palette[0]} as primary\n` +
          `${Emojis.BULLETS.DOT} ${palette[2]} for accents\n` +
          `${Emojis.BULLETS.DOT} ${palette[4]} for highlights`,
        inline: true,
      }
    )
    .setFooter({ text: `${Branding.FOOTERS.ART} • Click to generate more!` });

  const buttons = createButtonRow([
    { customId: 'art_palette_new', label: 'New Palette', emoji: Emojis.NAV.REFRESH, style: 1 },
    { customId: `art_palette_${selectedMood}`, label: 'Same Mood', emoji: moodEmojis[selectedMood], style: 2 },
    { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ⏱️ ART CHALLENGE
// ═══════════════════════════════════════════════════════════════════════════════

async function handleChallenge(interaction) {
  const difficulty = interaction.options.getString('difficulty') || 'medium';
  
  const challenges = {
    easy: {
      time: '30 minutes',
      emoji: '🟢',
      prompts: [
        'Draw your favorite food',
        'Sketch a simple landscape',
        'Design a cute mascot',
        'Draw an everyday object',
        'Create a simple pattern',
      ],
    },
    medium: {
      time: '1 hour',
      emoji: '🟡',
      prompts: [
        'Design a character with a unique outfit',
        'Draw a scene from your favorite memory',
        'Create a fantasy creature',
        'Illustrate a weather phenomenon',
        'Design a cozy room interior',
      ],
    },
    hard: {
      time: '2 hours',
      emoji: '🔴',
      prompts: [
        'Create a detailed environment with multiple elements',
        'Design a character with full backstory visualization',
        'Illustrate an action scene with dynamic poses',
        'Create a piece with complex lighting',
        'Design a full scene with foreground, midground, and background',
      ],
    },
    extreme: {
      time: '15 minutes',
      emoji: '💀',
      prompts: [
        'Speed sketch a character from memory',
        'Quick gesture drawings of 5 poses',
        'Rapid environment thumbnail',
        'Express an emotion in abstract form',
        'Capture movement in minimal strokes',
      ],
    },
  };
  
  const challenge = challenges[difficulty];
  const prompt = challenge.prompts[Math.floor(Math.random() * challenge.prompts.length)];
  
  const embed = new BotEmbed({ color: Colors.ART.PROMPTS })
    .setTitle(`${Emojis.GAMING.TARGET} Art Challenge`)
    .setDescription(
      `${Decorations.FANCY.ART}\n\n` +
      `**${challenge.emoji} ${difficulty.toUpperCase()} CHALLENGE**\n\n` +
      `> ${prompt}\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields(
      {
        name: `⏱️ Time Limit`,
        value: challenge.time,
        inline: true,
      },
      {
        name: `${Emojis.GAMING.TROPHY} Difficulty`,
        value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        inline: true,
      },
      {
        name: `${Emojis.STATUS.INFO} Rules`,
        value: 
          `${Emojis.BULLETS.DOT} Start when you're ready\n` +
          `${Emojis.BULLETS.DOT} No references (unless specified)\n` +
          `${Emojis.BULLETS.DOT} Share your result!`,
        inline: false,
      }
    )
    .addTip('Post your finished challenge in the art channel with #ArtChallenge!');

  const buttons = createButtonRow([
    { customId: 'art_challenge_start', label: 'Start Timer', emoji: '⏱️', style: 3 },
    { customId: 'art_challenge_new', label: 'New Challenge', emoji: Emojis.NAV.REFRESH, style: 2 },
    { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💡 ART TIPS
// ═══════════════════════════════════════════════════════════════════════════════

async function handleTips(interaction) {
  const topic = interaction.options.getString('topic') || 'random';
  
  const tips = {
    sketching: [
      'Start with loose, light lines to establish proportions before committing to details.',
      'Practice gesture drawing daily - even 5 minutes helps improve your line confidence.',
      'Use construction shapes (circles, boxes) to build complex forms.',
      'Don\'t be afraid to draw through objects to understand their 3D form.',
      'Vary your line weight to add depth and interest to your sketches.',
    ],
    coloring: [
      'Start with a limited palette and expand as you get comfortable.',
      'Warm colors advance, cool colors recede - use this for depth.',
      'Add a subtle complementary color to shadows for more vibrant results.',
      'Don\'t use pure black for shadows - try dark blues or purples instead.',
      'Color pick from photos to learn natural color relationships.',
    ],
    lighting: [
      'Establish your light source before adding any shading.',
      'Rim lighting can help separate subjects from backgrounds.',
      'Ambient occlusion (soft shadows in crevices) adds realism.',
      'Reflected light bounces color from nearby surfaces.',
      'Squint at your reference to see simplified light and shadow shapes.',
    ],
    anatomy: [
      'Learn the skeleton first - it\'s the foundation of all poses.',
      'Study muscle groups in sections rather than all at once.',
      'Use reference! Even professionals use references.',
      'Practice drawing hands and feet separately - they\'re complex!',
      'Gesture captures movement; anatomy captures form. Practice both.',
    ],
    backgrounds: [
      'Use atmospheric perspective - things get lighter and bluer with distance.',
      'Establish a clear foreground, midground, and background.',
      'Leading lines guide the viewer\'s eye through your composition.',
      'Don\'t detail everything equally - focus detail where you want attention.',
      'Thumbnail your compositions before committing to a full piece.',
    ],
  };
  
  let selectedTopic = topic;
  if (topic === 'random') {
    const topics = Object.keys(tips);
    selectedTopic = topics[Math.floor(Math.random() * topics.length)];
  }
  
  const topicTips = tips[selectedTopic];
  const tip = topicTips[Math.floor(Math.random() * topicTips.length)];
  
  const topicEmojis = {
    sketching: '✏️',
    coloring: '🎨',
    lighting: '💡',
    anatomy: '👤',
    backgrounds: '🏞️',
  };
  
  const embed = new BotEmbed({ color: Colors.ART.MAIN })
    .setTitle(`${Emojis.COMMUNITY.LIGHTBULB} Art Tip`)
    .setDescription(
      `${Decorations.FANCY.ART}\n\n` +
      `**${topicEmojis[selectedTopic]} ${selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)}**\n\n` +
      `> ${tip}\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .addFields({
      name: `${Emojis.STATUS.INFO} Practice Suggestion`,
      value: getPracticeSuggestion(selectedTopic),
      inline: false,
    })
    .setFooter({ text: `${Branding.FOOTERS.ART} • Keep practicing!` });

  const buttons = createButtonRow([
    { customId: 'art_tip_new', label: 'New Tip', emoji: Emojis.NAV.REFRESH, style: 1 },
    { customId: `art_tip_${selectedTopic}`, label: 'Same Topic', emoji: topicEmojis[selectedTopic], style: 2 },
    { customId: 'art_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

function getPracticeSuggestion(topic) {
  const suggestions = {
    sketching: 'Try doing 10 one-minute gesture sketches today!',
    coloring: 'Pick a photo and try to match its colors exactly.',
    lighting: 'Draw a simple sphere with 3 different light sources.',
    anatomy: 'Draw your non-dominant hand from 3 different angles.',
    backgrounds: 'Sketch 5 quick thumbnail compositions in 10 minutes.',
  };
  return suggestions[topic] || 'Practice for at least 15 minutes today!';
}
