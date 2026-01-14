-- Lore Bot MySQL Schema
-- This schema includes all tables for Lore and Moments system with versioning

-- Configuration table
CREATE TABLE IF NOT EXISTS config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  guild_id BIGINT NOT NULL UNIQUE,
  lore_submission_channel BIGINT,
  moment_submission_channel BIGINT,
  verification_channel BIGINT,
  verifier_role_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lore table (current version)
CREATE TABLE IF NOT EXISTS lore (
  id INT PRIMARY KEY AUTO_INCREMENT,
  guild_id BIGINT NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  current_version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (guild_id) REFERENCES config(guild_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lore version history (for archiving previous versions)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lore submissions (pending and approved)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Moments (individual memories/events)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Moment submissions (pending and approved)
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
  FOREIGN KEY (moment_id) REFERENCES moments(id) ON DELETE SET NULL,
  INDEX idx_guild_status (guild_id, status),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better query performance
CREATE INDEX idx_lore_guild ON lore(guild_id);
CREATE INDEX idx_lore_submissions_guild ON lore_submissions(guild_id);
CREATE INDEX idx_moment_submissions_guild ON moment_submissions(guild_id);
