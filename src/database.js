import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export async function initializeDatabase() {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQLHOST,
      port: process.env.MYSQLPORT || 3306,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();
    console.log('✓ Database connected successfully');
    
    // Create tables automatically
    await createTables(pool);
    
    connection.release();
    return pool;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    process.exit(1);
  }
}

// Automatically create all required tables
async function createTables(pool) {
  try {
    console.log('📊 Creating tables if they do not exist...');
    
    // Configuration table (no dependencies)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS config (
        id INT PRIMARY KEY AUTO_INCREMENT,
        guild_id BIGINT NOT NULL UNIQUE,
        lore_submission_channel BIGINT,
        moment_submission_channel BIGINT,
        verification_channel BIGINT,
        verifier_role_id BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Lore submissions (create before lore_versions)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lore_submissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        guild_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT NOT NULL,
        status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        verified_at TIMESTAMP NULL,
        verified_by BIGINT,
        verification_message_id BIGINT,
        FOREIGN KEY (guild_id) REFERENCES config(guild_id) ON DELETE CASCADE,
        INDEX idx_guild_status (guild_id, status),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Moment submissions
    await pool.query(`
      CREATE TABLE IF NOT EXISTS moment_submissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        guild_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        content TEXT NOT NULL,
        status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        verified_at TIMESTAMP NULL,
        verified_by BIGINT,
        verification_message_id BIGINT,
        moment_id INT,
        FOREIGN KEY (guild_id) REFERENCES config(guild_id) ON DELETE CASCADE,
        INDEX idx_guild_status (guild_id, status),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Lore table (current version)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lore (
        id INT PRIMARY KEY AUTO_INCREMENT,
        guild_id BIGINT NOT NULL UNIQUE,
        content LONGTEXT NOT NULL,
        current_version INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES config(guild_id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Lore version history (create after lore_submissions)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lore_versions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        guild_id BIGINT NOT NULL,
        version INT NOT NULL,
        content LONGTEXT NOT NULL,
        created_by BIGINT NOT NULL,
        created_from_submission_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES config(guild_id) ON DELETE CASCADE,
        FOREIGN KEY (created_from_submission_id) REFERENCES lore_submissions(id) ON DELETE SET NULL,
        UNIQUE KEY unique_guild_version (guild_id, version)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Moments (individual memories/events)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS moments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        guild_id BIGINT NOT NULL,
        content TEXT NOT NULL,
        submitted_by BIGINT NOT NULL,
        verified_by BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES config(guild_id) ON DELETE CASCADE,
        INDEX idx_guild_id (guild_id),
        INDEX idx_user_id (submitted_by)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Add foreign key to moment_submissions for moment_id
    await pool.query(`
      ALTER TABLE moment_submissions 
      ADD CONSTRAINT fk_moment_id FOREIGN KEY (moment_id) REFERENCES moments(id) ON DELETE SET NULL
    `).catch(() => {}); // Ignore if constraint already exists

    // Create indexes for better query performance
    await pool.query('CREATE INDEX IF NOT EXISTS idx_lore_guild ON lore(guild_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_lore_submissions_guild ON lore_submissions(guild_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_moment_submissions_guild ON moment_submissions(guild_id)');

    console.log('✓ All tables created successfully');
  } catch (error) {
    console.error('✗ Error creating tables:', error.message);
    throw error;
  }
}

export function getPool() {
  return pool;
}

// Helper functions for common database operations

export async function getConfig(guildId) {
  const [rows] = await pool.query('SELECT * FROM config WHERE guild_id = ?', [guildId]);
  return rows[0] || null;
}

export async function setConfig(guildId, configData) {
  const config = await getConfig(guildId);
  
  if (config) {
    const updates = [];
    const values = [];
    for (const [key, value] of Object.entries(configData)) {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
    values.push(guildId);
    
    if (updates.length > 0) {
      await pool.query(
        `UPDATE config SET ${updates.join(', ')} WHERE guild_id = ?`,
        values
      );
    }
  } else {
    await pool.query(
      'INSERT INTO config (guild_id, lore_submission_channel, moment_submission_channel, verification_channel, verifier_role_id) VALUES (?, ?, ?, ?, ?)',
      [guildId, configData.lore_submission_channel, configData.moment_submission_channel, configData.verification_channel, configData.verifier_role_id]
    );
  }
}

export async function getCurrentLore(guildId) {
  const [rows] = await pool.query('SELECT * FROM lore WHERE guild_id = ?', [guildId]);
  return rows[0] || null;
}

export async function setLore(guildId, content, submissionId) {
  const currentLore = await getCurrentLore(guildId);
  
  if (currentLore) {
    // Archive current version before updating
    await pool.query(
      'INSERT INTO lore_versions (guild_id, version, content, created_by, created_from_submission_id) VALUES (?, ?, ?, 0, ?)',
      [guildId, currentLore.current_version, currentLore.content, submissionId]
    );
    
    // Update with new content and increment version
    await pool.query(
      'UPDATE lore SET content = ?, current_version = current_version + 1 WHERE guild_id = ?',
      [content, guildId]
    );
  } else {
    // Create initial lore
    await pool.query(
      'INSERT INTO lore (guild_id, content, current_version) VALUES (?, ?, 1)',
      [guildId, content]
    );
  }
}

export async function getLoreHistory(guildId) {
  const [rows] = await pool.query(
    'SELECT * FROM lore_versions WHERE guild_id = ? ORDER BY version DESC',
    [guildId]
  );
  return rows;
}

export async function getLoreSubmission(submissionId) {
  const [rows] = await pool.query('SELECT * FROM lore_submissions WHERE id = ?', [submissionId]);
  return rows[0] || null;
}

export async function getPendingLoreSubmissions(guildId) {
  const [rows] = await pool.query(
    'SELECT * FROM lore_submissions WHERE guild_id = ? AND status = "pending" ORDER BY submitted_at ASC',
    [guildId]
  );
  return rows;
}

export async function createLoreSubmission(guildId, userId, title, content) {
  const [result] = await pool.query(
    'INSERT INTO lore_submissions (guild_id, user_id, title, content) VALUES (?, ?, ?, ?)',
    [guildId, userId, title, content]
  );
  return result.insertId;
}

export async function updateLoreSubmissionStatus(submissionId, status, verifiedBy, messageId) {
  await pool.query(
    'UPDATE lore_submissions SET status = ?, verified_by = ?, verified_at = NOW(), verification_message_id = ? WHERE id = ?',
    [status, verifiedBy, messageId, submissionId]
  );
}

export async function getMoments(guildId, limit = 10, offset = 0) {
  const [rows] = await pool.query(
    'SELECT * FROM moments WHERE guild_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [guildId, limit, offset]
  );
  return rows;
}

export async function getRandomMoment(guildId) {
  const [rows] = await pool.query(
    'SELECT * FROM moments WHERE guild_id = ? ORDER BY RAND() LIMIT 1',
    [guildId]
  );
  return rows[0] || null;
}

export async function createMomentSubmission(guildId, userId, content) {
  const [result] = await pool.query(
    'INSERT INTO moment_submissions (guild_id, user_id, content) VALUES (?, ?, ?)',
    [guildId, userId, content]
  );
  return result.insertId;
}

export async function getPendingMomentSubmissions(guildId) {
  const [rows] = await pool.query(
    'SELECT * FROM moment_submissions WHERE guild_id = ? AND status = "pending" ORDER BY submitted_at ASC',
    [guildId]
  );
  return rows;
}

export async function createMoment(guildId, content, submittedBy, verifiedBy) {
  const [result] = await pool.query(
    'INSERT INTO moments (guild_id, content, submitted_by, verified_by) VALUES (?, ?, ?, ?)',
    [guildId, content, submittedBy, verifiedBy]
  );
  return result.insertId;
}

export async function getMomentSubmission(submissionId) {
  const [rows] = await pool.query('SELECT * FROM moment_submissions WHERE id = ?', [submissionId]);
  return rows[0] || null;
}

export async function updateMomentSubmissionStatus(submissionId, status, verifiedBy, messageId, momentId = null) {
  await pool.query(
    'UPDATE moment_submissions SET status = ?, verified_by = ?, verified_at = NOW(), verification_message_id = ?, moment_id = ? WHERE id = ?',
    [status, verifiedBy, messageId, momentId, submissionId]
  );
}
