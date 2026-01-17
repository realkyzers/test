/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎉 FUN COMMANDS
 * Mini-games, interactions, and entertainment features
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { SlashCommandBuilder } from 'discord.js';
import { funEmbed, gameResultEmbed, BotEmbed } from '../embeds/EmbedBuilder.js';
import { 
  createRPSButtons,
  createNumberButtons,
  createNavigationButtons,
  createButtonRow,
  createGameButtons,
} from '../embeds/ComponentBuilder.js';
import { Colors, Emojis, Decorations, Branding } from '../config/theme.js';

// ═══════════════════════════════════════════════════════════════════════════════
// 📋 COMMAND DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════

export const data = new SlashCommandBuilder()
  .setName('fun')
  .setDescription('Fun games and interactive features')
  .addSubcommand(sub =>
    sub.setName('rps')
      .setDescription('Play Rock Paper Scissors')
      .addUserOption(opt =>
        opt.setName('opponent')
          .setDescription('Challenge another user (optional)')
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
    sub.setName('8ball')
      .setDescription('Ask the magic 8-ball a question')
      .addStringOption(opt =>
        opt.setName('question')
          .setDescription('Your question for the 8-ball')
          .setRequired(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('roll')
      .setDescription('Roll dice')
      .addStringOption(opt =>
        opt.setName('dice')
          .setDescription('Dice notation (e.g., 2d6, 1d20+5)')
          .setRequired(false)
      )
  )
  .addSubcommand(sub =>
    sub.setName('flip')
      .setDescription('Flip a coin')
      .addIntegerOption(opt =>
        opt.setName('times')
          .setDescription('Number of flips (1-10)')
          .setRequired(false)
          .setMinValue(1)
          .setMaxValue(10)
      )
  )
  .addSubcommand(sub =>
    sub.setName('choose')
      .setDescription('Let the bot choose for you')
      .addStringOption(opt =>
        opt.setName('options')
          .setDescription('Options separated by commas')
          .setRequired(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('trivia')
      .setDescription('Answer a trivia question')
      .addStringOption(opt =>
        opt.setName('category')
          .setDescription('Trivia category')
          .setRequired(false)
          .addChoices(
            { name: '🎮 Gaming', value: 'gaming' },
            { name: '🎬 Movies', value: 'movies' },
            { name: '🎵 Music', value: 'music' },
            { name: '🔬 Science', value: 'science' },
            { name: '📚 General', value: 'general' },
            { name: '🎲 Random', value: 'random' },
          )
      )
  )
  .addSubcommand(sub =>
    sub.setName('guess')
      .setDescription('Guess the number game')
      .addStringOption(opt =>
        opt.setName('difficulty')
          .setDescription('Difficulty level')
          .setRequired(false)
          .addChoices(
            { name: '🟢 Easy (1-10)', value: 'easy' },
            { name: '🟡 Medium (1-50)', value: 'medium' },
            { name: '🔴 Hard (1-100)', value: 'hard' },
          )
      )
  )
  .addSubcommand(sub =>
    sub.setName('rate')
      .setDescription('Rate something out of 10')
      .addStringOption(opt =>
        opt.setName('thing')
          .setDescription('What to rate')
          .setRequired(true)
      )
  )
  .addSubcommand(sub =>
    sub.setName('ship')
      .setDescription('Calculate love compatibility')
      .addUserOption(opt =>
        opt.setName('user1')
          .setDescription('First user')
          .setRequired(true)
      )
      .addUserOption(opt =>
        opt.setName('user2')
          .setDescription('Second user')
          .setRequired(true)
      )
  );

// ═══════════════════════════════════════════════════════════════════════════════
// ⚡ COMMAND EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();
  
  switch (subcommand) {
    case 'rps':
      return handleRPS(interaction);
    case '8ball':
      return handle8Ball(interaction);
    case 'roll':
      return handleRoll(interaction);
    case 'flip':
      return handleFlip(interaction);
    case 'choose':
      return handleChoose(interaction);
    case 'trivia':
      return handleTrivia(interaction);
    case 'guess':
      return handleGuess(interaction);
    case 'rate':
      return handleRate(interaction);
    case 'ship':
      return handleShip(interaction);
    default:
      return interaction.reply({
        content: '❌ Unknown subcommand.',
        ephemeral: true,
      });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✊ ROCK PAPER SCISSORS
// ═══════════════════════════════════════════════════════════════════════════════

async function handleRPS(interaction) {
  const opponent = interaction.options.getUser('opponent');
  
  if (opponent) {
    // PvP mode
    if (opponent.bot) {
      return interaction.reply({
        content: `${Emojis.STATUS.ERROR} You can't challenge a bot!`,
        ephemeral: true,
      });
    }
    
    if (opponent.id === interaction.user.id) {
      return interaction.reply({
        content: `${Emojis.STATUS.ERROR} You can't challenge yourself!`,
        ephemeral: true,
      });
    }
    
    const embed = funEmbed(
      'Rock Paper Scissors - Challenge!',
      `${Decorations.FANCY.GAMING}\n\n` +
      `${interaction.user} has challenged ${opponent} to Rock Paper Scissors!\n\n` +
      `${opponent}, click a button to accept the challenge!\n\n` +
      `${Decorations.LINES.THIN}`
    )
      .addFields(
        { name: `${Emojis.GAMING.SWORD} Challenger`, value: `${interaction.user}`, inline: true },
        { name: `${Emojis.GAMING.SHIELD} Opponent`, value: `${opponent}`, inline: true },
      );

    const buttons = createRPSButtons(`rps_pvp_${interaction.user.id}_${opponent.id}`);

    return interaction.reply({
      content: `${opponent}`,
      embeds: [embed],
      components: [buttons],
    });
  }
  
  // vs Bot mode
  const embed = funEmbed(
    'Rock Paper Scissors',
    `${Decorations.FANCY.GAMING}\n\n` +
    `Choose your weapon!\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields({
      name: `${Emojis.STATUS.INFO} How to Play`,
      value: 
        `${Emojis.BULLETS.DOT} 🪨 Rock beats ✂️ Scissors\n` +
        `${Emojis.BULLETS.DOT} 📄 Paper beats 🪨 Rock\n` +
        `${Emojis.BULLETS.DOT} ✂️ Scissors beats 📄 Paper`,
      inline: false,
    });

  const buttons = createRPSButtons(`rps_bot_${interaction.user.id}`);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎱 MAGIC 8-BALL
// ═══════════════════════════════════════════════════════════════════════════════

async function handle8Ball(interaction) {
  const question = interaction.options.getString('question');
  
  const responses = [
    // Positive
    { text: 'It is certain.', type: 'positive' },
    { text: 'It is decidedly so.', type: 'positive' },
    { text: 'Without a doubt.', type: 'positive' },
    { text: 'Yes, definitely.', type: 'positive' },
    { text: 'You may rely on it.', type: 'positive' },
    { text: 'As I see it, yes.', type: 'positive' },
    { text: 'Most likely.', type: 'positive' },
    { text: 'Outlook good.', type: 'positive' },
    { text: 'Yes.', type: 'positive' },
    { text: 'Signs point to yes.', type: 'positive' },
    // Neutral
    { text: 'Reply hazy, try again.', type: 'neutral' },
    { text: 'Ask again later.', type: 'neutral' },
    { text: 'Better not tell you now.', type: 'neutral' },
    { text: 'Cannot predict now.', type: 'neutral' },
    { text: 'Concentrate and ask again.', type: 'neutral' },
    // Negative
    { text: 'Don\'t count on it.', type: 'negative' },
    { text: 'My reply is no.', type: 'negative' },
    { text: 'My sources say no.', type: 'negative' },
    { text: 'Outlook not so good.', type: 'negative' },
    { text: 'Very doubtful.', type: 'negative' },
  ];
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  const colors = {
    positive: Colors.SUCCESS,
    neutral: Colors.WARNING,
    negative: Colors.ERROR,
  };
  
  const emojis = {
    positive: '✅',
    neutral: '🤔',
    negative: '❌',
  };
  
  const embed = new BotEmbed({ color: colors[response.type] })
    .setTitle(`🎱 Magic 8-Ball`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `**Your Question:**\n> ${question}\n\n` +
      `**The 8-Ball Says:**\n> ${emojis[response.type]} *${response.text}*\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .setFooter({ text: `${Branding.FOOTERS.DEFAULT} • The 8-ball has spoken!` });

  const buttons = createButtonRow([
    { customId: 'fun_8ball_again', label: 'Ask Again', emoji: '🎱', style: 1 },
    { customId: 'fun_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎲 DICE ROLL
// ═══════════════════════════════════════════════════════════════════════════════

async function handleRoll(interaction) {
  const diceNotation = interaction.options.getString('dice') || '1d6';
  
  // Parse dice notation (e.g., 2d6+5)
  const match = diceNotation.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
  
  if (!match) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Invalid dice notation! Use format like \`2d6\` or \`1d20+5\``,
      ephemeral: true,
    });
  }
  
  const numDice = parseInt(match[1]) || 1;
  const dieSize = parseInt(match[2]);
  const modifier = parseInt(match[3]) || 0;
  
  if (numDice > 100 || dieSize > 1000) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Maximum 100 dice with 1000 sides each!`,
      ephemeral: true,
    });
  }
  
  const rolls = [];
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * dieSize) + 1);
  }
  
  const sum = rolls.reduce((a, b) => a + b, 0);
  const total = sum + modifier;
  
  const embed = funEmbed(
    '🎲 Dice Roll',
    `${Decorations.FANCY.GAMING}\n\n` +
    `**Rolling:** ${diceNotation}\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${Emojis.GAMING.DICE} Rolls`,
        value: rolls.map((r, i) => `Die ${i + 1}: **${r}**`).join('\n') || 'No rolls',
        inline: true,
      },
      {
        name: `${Emojis.GAMING.TROPHY} Result`,
        value: 
          `Sum: ${sum}\n` +
          (modifier !== 0 ? `Modifier: ${modifier > 0 ? '+' : ''}${modifier}\n` : '') +
          `**Total: ${total}**`,
        inline: true,
      }
    );
  
  // Check for special rolls
  if (numDice === 1 && rolls[0] === dieSize) {
    embed.addFields({
      name: `${Emojis.GAMING.FIRE} Critical!`,
      value: 'Maximum roll! 🎉',
      inline: false,
    });
  } else if (numDice === 1 && rolls[0] === 1) {
    embed.addFields({
      name: `${Emojis.STATUS.ERROR} Critical Fail!`,
      value: 'Minimum roll... 😢',
      inline: false,
    });
  }

  const buttons = createButtonRow([
    { customId: `fun_roll_${diceNotation}`, label: 'Roll Again', emoji: '🎲', style: 1 },
    { customId: 'fun_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🪙 COIN FLIP
// ═══════════════════════════════════════════════════════════════════════════════

async function handleFlip(interaction) {
  const times = interaction.options.getInteger('times') || 1;
  
  const results = [];
  for (let i = 0; i < times; i++) {
    results.push(Math.random() < 0.5 ? 'Heads' : 'Tails');
  }
  
  const heads = results.filter(r => r === 'Heads').length;
  const tails = results.filter(r => r === 'Tails').length;
  
  const embed = funEmbed(
    '🪙 Coin Flip',
    `${Decorations.FANCY.SPARKLE}\n\n` +
    (times === 1 
      ? `**Result:** ${results[0] === 'Heads' ? '🟡' : '⚪'} ${results[0]}!`
      : `**Flipping ${times} coins...**`) +
    `\n\n${Decorations.LINES.THIN}`
  );
  
  if (times > 1) {
    embed.addFields(
      {
        name: '🟡 Heads',
        value: `${heads} (${Math.round(heads/times*100)}%)`,
        inline: true,
      },
      {
        name: '⚪ Tails',
        value: `${tails} (${Math.round(tails/times*100)}%)`,
        inline: true,
      },
      {
        name: `${Emojis.STATUS.INFO} Results`,
        value: results.map((r, i) => `${i + 1}. ${r === 'Heads' ? '🟡' : '⚪'}`).join(' '),
        inline: false,
      }
    );
  }

  const buttons = createButtonRow([
    { customId: `fun_flip_${times}`, label: 'Flip Again', emoji: '🪙', style: 1 },
    { customId: 'fun_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🤔 CHOOSE
// ═══════════════════════════════════════════════════════════════════════════════

async function handleChoose(interaction) {
  const optionsString = interaction.options.getString('options');
  const options = optionsString.split(',').map(o => o.trim()).filter(o => o.length > 0);
  
  if (options.length < 2) {
    return interaction.reply({
      content: `${Emojis.STATUS.ERROR} Please provide at least 2 options separated by commas!`,
      ephemeral: true,
    });
  }
  
  const choice = options[Math.floor(Math.random() * options.length)];
  
  const embed = funEmbed(
    '🤔 The Bot Has Chosen',
    `${Decorations.FANCY.SPARKLE}\n\n` +
    `**Options:**\n${options.map((o, i) => `${Emojis.NUMBERS[i + 1] || '•'} ${o}`).join('\n')}\n\n` +
    `${Decorations.LINES.THIN}\n\n` +
    `**I choose:** ✨ **${choice}** ✨\n\n` +
    `${Decorations.LINES.THIN}`
  );

  const buttons = createButtonRow([
    { customId: 'fun_choose_again', label: 'Choose Again', emoji: '🔄', style: 1 },
    { customId: 'fun_close', label: 'Close', emoji: Emojis.NAV.CLOSE, style: 4 },
  ]);

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ❓ TRIVIA
// ═══════════════════════════════════════════════════════════════════════════════

const triviaQuestions = {
  gaming: [
    { q: 'What year was Minecraft officially released?', a: ['2011'], options: ['2009', '2010', '2011', '2012'] },
    { q: 'What is the best-selling video game of all time?', a: ['Minecraft'], options: ['Minecraft', 'GTA V', 'Tetris', 'Wii Sports'] },
    { q: 'What company created Roblox?', a: ['Roblox Corporation'], options: ['Roblox Corporation', 'Epic Games', 'Valve', 'Microsoft'] },
    { q: 'In Minecraft, what do you need to make a Nether Portal?', a: ['Obsidian'], options: ['Obsidian', 'Bedrock', 'Netherite', 'Crying Obsidian'] },
  ],
  movies: [
    { q: 'What year was the first Star Wars movie released?', a: ['1977'], options: ['1975', '1977', '1979', '1980'] },
    { q: 'Who directed Jurassic Park?', a: ['Steven Spielberg'], options: ['Steven Spielberg', 'James Cameron', 'George Lucas', 'Christopher Nolan'] },
    { q: 'What is the highest-grossing film of all time?', a: ['Avatar'], options: ['Avatar', 'Avengers: Endgame', 'Titanic', 'Star Wars'] },
  ],
  music: [
    { q: 'What band was Freddie Mercury the lead singer of?', a: ['Queen'], options: ['Queen', 'The Beatles', 'Led Zeppelin', 'Pink Floyd'] },
    { q: 'What instrument has 88 keys?', a: ['Piano'], options: ['Piano', 'Organ', 'Accordion', 'Harpsichord'] },
    { q: 'Which artist has the most Grammy wins?', a: ['Beyoncé'], options: ['Beyoncé', 'Taylor Swift', 'Adele', 'Michael Jackson'] },
  ],
  science: [
    { q: 'What planet is known as the Red Planet?', a: ['Mars'], options: ['Mars', 'Venus', 'Jupiter', 'Mercury'] },
    { q: 'What is the chemical symbol for gold?', a: ['Au'], options: ['Au', 'Ag', 'Go', 'Gd'] },
    { q: 'How many bones are in the adult human body?', a: ['206'], options: ['186', '196', '206', '216'] },
  ],
  general: [
    { q: 'What is the capital of Japan?', a: ['Tokyo'], options: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'] },
    { q: 'How many continents are there?', a: ['7'], options: ['5', '6', '7', '8'] },
    { q: 'What is the largest ocean on Earth?', a: ['Pacific'], options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'] },
  ],
};

async function handleTrivia(interaction) {
  let category = interaction.options.getString('category') || 'random';
  
  if (category === 'random') {
    const categories = Object.keys(triviaQuestions);
    category = categories[Math.floor(Math.random() * categories.length)];
  }
  
  const questions = triviaQuestions[category];
  const question = questions[Math.floor(Math.random() * questions.length)];
  
  // Shuffle options
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
  
  const categoryEmojis = {
    gaming: '🎮',
    movies: '🎬',
    music: '🎵',
    science: '🔬',
    general: '📚',
  };
  
  const embed = funEmbed(
    `${categoryEmojis[category]} Trivia - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    `${Decorations.FANCY.SPARKLE}\n\n` +
    `**Question:**\n> ${question.q}\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields({
      name: `${Emojis.STATUS.INFO} Options`,
      value: shuffledOptions.map((o, i) => `${Emojis.NUMBERS[i + 1]} ${o}`).join('\n'),
      inline: false,
    })
    .setFooter({ text: `${Branding.FOOTERS.DEFAULT} • You have 30 seconds!` });

  const buttons = createButtonRow(
    shuffledOptions.map((opt, i) => ({
      customId: `trivia_${question.a.includes(opt) ? 'correct' : 'wrong'}_${i}`,
      label: `${i + 1}`,
      style: 2,
    }))
  );

  return interaction.reply({
    embeds: [embed],
    components: [buttons],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔢 GUESS THE NUMBER
// ═══════════════════════════════════════════════════════════════════════════════

// Store active games
const guessGames = new Map();

async function handleGuess(interaction) {
  const difficulty = interaction.options.getString('difficulty') || 'easy';
  
  const ranges = {
    easy: { max: 10, attempts: 5 },
    medium: { max: 50, attempts: 7 },
    hard: { max: 100, attempts: 10 },
  };
  
  const { max, attempts } = ranges[difficulty];
  const number = Math.floor(Math.random() * max) + 1;
  
  // Store game state
  guessGames.set(interaction.user.id, {
    number,
    max,
    attempts,
    remaining: attempts,
    guesses: [],
  });
  
  const difficultyEmojis = { easy: '🟢', medium: '🟡', hard: '🔴' };
  
  const embed = funEmbed(
    '🔢 Guess the Number',
    `${Decorations.FANCY.GAMING}\n\n` +
    `I'm thinking of a number between **1** and **${max}**!\n\n` +
    `${Decorations.LINES.THIN}`
  )
    .addFields(
      {
        name: `${difficultyEmojis[difficulty]} Difficulty`,
        value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        inline: true,
      },
      {
        name: `${Emojis.GAMING.TARGET} Attempts`,
        value: `${attempts} remaining`,
        inline: true,
      },
      {
        name: `${Emojis.STATUS.INFO} How to Play`,
        value: 'Click a number button or type your guess!',
        inline: false,
      }
    );

  // Create number buttons (1-5 or 1-10 depending on difficulty)
  const buttonCount = difficulty === 'easy' ? 5 : 5;
  const row1 = createNumberButtons(`guess_${interaction.user.id}`, 1, buttonCount);
  const row2 = difficulty !== 'easy' 
    ? createNumberButtons(`guess_${interaction.user.id}`, 6, 10)
    : null;

  const components = [row1];
  if (row2) components.push(row2);

  return interaction.reply({
    embeds: [embed],
    components,
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ⭐ RATE
// ═══════════════════════════════════════════════════════════════════════════════

async function handleRate(interaction) {
  const thing = interaction.options.getString('thing');
  
  // Generate a "random" but consistent rating based on the input
  const hash = thing.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = (hash % 11); // 0-10
  
  const ratingBar = '█'.repeat(rating) + '░'.repeat(10 - rating);
  
  let comment;
  if (rating <= 2) comment = 'Yikes... 😬';
  else if (rating <= 4) comment = 'Could be better... 🤔';
  else if (rating <= 6) comment = 'Not bad! 👍';
  else if (rating <= 8) comment = 'Pretty good! 😊';
  else comment = 'Amazing! 🌟';
  
  const embed = funEmbed(
    '⭐ Rating',
    `${Decorations.FANCY.SPARKLE}\n\n` +
    `**Rating:** ${thing}\n\n` +
    `\`${ratingBar}\` **${rating}/10**\n\n` +
    `*${comment}*\n\n` +
    `${Decorations.LINES.THIN}`
  );

  return interaction.reply({
    embeds: [embed],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💕 SHIP
// ═══════════════════════════════════════════════════════════════════════════════

async function handleShip(interaction) {
  const user1 = interaction.options.getUser('user1');
  const user2 = interaction.options.getUser('user2');
  
  // Generate consistent compatibility based on user IDs
  const combined = user1.id + user2.id;
  const hash = combined.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const compatibility = hash % 101; // 0-100
  
  const heartBar = '❤️'.repeat(Math.floor(compatibility / 10)) + '🖤'.repeat(10 - Math.floor(compatibility / 10));
  
  let status, emoji;
  if (compatibility <= 20) { status = 'Not meant to be...'; emoji = '💔'; }
  else if (compatibility <= 40) { status = 'Just friends'; emoji = '🤝'; }
  else if (compatibility <= 60) { status = 'There\'s potential!'; emoji = '💫'; }
  else if (compatibility <= 80) { status = 'Great match!'; emoji = '💕'; }
  else { status = 'Soulmates!'; emoji = '💘'; }
  
  // Create ship name
  const name1 = user1.username.slice(0, Math.ceil(user1.username.length / 2));
  const name2 = user2.username.slice(Math.floor(user2.username.length / 2));
  const shipName = name1 + name2;
  
  const embed = new BotEmbed({ color: compatibility > 50 ? Colors.SUCCESS : Colors.ERROR })
    .setTitle(`${emoji} Love Calculator`)
    .setDescription(
      `${Decorations.FANCY.SPARKLE}\n\n` +
      `**${user1.username}** ${emoji} **${user2.username}**\n\n` +
      `Ship Name: **${shipName}**\n\n` +
      `${heartBar}\n\n` +
      `**Compatibility: ${compatibility}%**\n` +
      `*${status}*\n\n` +
      `${Decorations.LINES.THIN}`
    )
    .setThumbnail(user1.displayAvatarURL({ size: 128 }));

  return interaction.reply({
    embeds: [embed],
  });
}

// Export game state for interaction handler
export { guessGames };
