-- ManCaveAI Database Schema
-- Created: 2025-12-26

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SEO Pages Table
-- Stores generated SEO page content and metadata
CREATE TABLE IF NOT EXISTS seo_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    meta_description TEXT,
    h1 VARCHAR(500),
    content TEXT,
    keywords JSONB DEFAULT '[]'::jsonb,
    category VARCHAR(100),
    published BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON seo_pages(slug);
CREATE INDEX IF NOT EXISTS idx_seo_pages_published ON seo_pages(published);
CREATE INDEX IF NOT EXISTS idx_seo_pages_category ON seo_pages(category);

-- 2. Keywords Table
-- Tracks keywords, their metrics, and mapping
CREATE TABLE IF NOT EXISTS keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keyword VARCHAR(500) UNIQUE NOT NULL,
    search_volume INTEGER,
    difficulty INTEGER CHECK (difficulty >= 0 AND difficulty <= 100),
    category VARCHAR(100),
    priority INTEGER DEFAULT 0,
    target_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster keyword searches
CREATE INDEX IF NOT EXISTS idx_keywords_keyword ON keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_keywords_category ON keywords(category);
CREATE INDEX IF NOT EXISTS idx_keywords_priority ON keywords(priority DESC);

-- 3. Analytics Table
-- Tracks page performance metrics
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_slug VARCHAR(255) NOT NULL,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    avg_time_on_page INTEGER, -- in seconds
    bounce_rate DECIMAL(5,2),
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Foreign key to seo_pages
    FOREIGN KEY (page_slug) REFERENCES seo_pages(slug) ON DELETE CASCADE
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_page_slug ON analytics(page_slug);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page_date ON analytics(page_slug, date);

-- 4. Content Generations Table
-- Tracks AI-generated content versions and quality
CREATE TABLE IF NOT EXISTS content_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID,
    prompt TEXT NOT NULL,
    generated_content TEXT NOT NULL,
    model_used VARCHAR(100),
    version INTEGER DEFAULT 1,
    quality_score DECIMAL(3,2),
    tokens_used INTEGER,
    generation_time INTEGER, -- in milliseconds
    status VARCHAR(50) DEFAULT 'draft',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Foreign key to seo_pages
    FOREIGN KEY (page_id) REFERENCES seo_pages(id) ON DELETE CASCADE
);

-- Indexes for content generation queries
CREATE INDEX IF NOT EXISTS idx_content_gen_page_id ON content_generations(page_id);
CREATE INDEX IF NOT EXISTS idx_content_gen_created ON content_generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_gen_version ON content_generations(page_id, version);

-- 5. Page Keywords Junction Table
-- Many-to-many relationship between pages and keywords
CREATE TABLE IF NOT EXISTS page_keywords (
    page_id UUID NOT NULL,
    keyword_id UUID NOT NULL,
    relevance_score DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    PRIMARY KEY (page_id, keyword_id),
    FOREIGN KEY (page_id) REFERENCES seo_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (keyword_id) REFERENCES keywords(id) ON DELETE CASCADE
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_seo_pages_updated_at BEFORE UPDATE ON seo_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_keywords_updated_at BEFORE UPDATE ON keywords
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_keywords ENABLE ROW LEVEL SECURITY;

-- Public read access for seo_pages (for website visitors)
CREATE POLICY "Public read access for published pages" ON seo_pages
    FOR SELECT USING (published = true);

-- Service role has full access (for your backend)
CREATE POLICY "Service role full access seo_pages" ON seo_pages
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access keywords" ON keywords
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access analytics" ON analytics
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access content_generations" ON content_generations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access page_keywords" ON page_keywords
    FOR ALL USING (auth.role() = 'service_role');

-- Insert some sample data (optional, comment out if not needed)
-- INSERT INTO keywords (keyword, category, priority) VALUES
-- ('man cave ideas', 'general', 10),
-- ('basement man cave', 'location', 9),
-- ('garage man cave', 'location', 9),
-- ('man cave bar', 'feature', 8);

COMMENT ON TABLE seo_pages IS 'Stores SEO-optimized page content and metadata';
COMMENT ON TABLE keywords IS 'Tracks keywords, search metrics, and targeting information';
COMMENT ON TABLE analytics IS 'Stores page performance and visitor analytics';
COMMENT ON TABLE content_generations IS 'Tracks AI-generated content versions and quality metrics';
COMMENT ON TABLE page_keywords IS 'Junction table linking pages to their target keywords';
