-- migrations/init.sql

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the groups table
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_name VARCHAR(255) NOT NULL,
    members_count INTEGER NOT NULL,
    niches JSONB NOT NULL,
    channel_screenshot_url TEXT,
    image_date_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    objective VARCHAR(255),
    platform VARCHAR(100),
    total_budget NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create campaign_targets table
CREATE TABLE IF NOT EXISTS campaign_targets (
    campaign_id INTEGER PRIMARY KEY REFERENCES campaigns(id) ON DELETE CASCADE,
    group_niche VARCHAR(255),
    target_by_group JSONB,
    location VARCHAR(255),
    in_niche_tags JSONB,
    in_group_tags JSONB
);

-- Create campaign_contents table
CREATE TABLE IF NOT EXISTS campaign_contents (
    campaign_id INTEGER PRIMARY KEY REFERENCES campaigns(id) ON DELETE CASCADE,
    content_text TEXT,
    attachment_url TEXT,
    schedule_start TIMESTAMP WITH TIME ZONE,
    schedule_end TIMESTAMP WITH TIME ZONE
);

-- Create campaign_bid_ranges table
CREATE TABLE IF NOT EXISTS campaign_bid_ranges (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    min_members INTEGER,
    max_members INTEGER,
    offer_amount NUMERIC
);

-- Create campaign_selected_groups table
CREATE TABLE IF NOT EXISTS campaign_selected_groups (
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups(id),
    offer_amount NUMERIC,
    PRIMARY KEY (campaign_id, group_id)
);
