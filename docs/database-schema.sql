-- =====================================================
-- FAQ Tables
-- =====================================================

CREATE TABLE faq_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key         TEXT NOT NULL UNIQUE,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE faq_category_translations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES faq_categories(id) ON DELETE CASCADE,
    locale      TEXT NOT NULL CHECK (locale IN ('id', 'en')),
    label       TEXT NOT NULL,
    UNIQUE (category_id, locale)
);

CREATE TABLE faq_articles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES faq_categories(id) ON DELETE RESTRICT,
    slug        TEXT NOT NULL UNIQUE,
    icon        TEXT NOT NULL DEFAULT '📄',
    sort_order  INT NOT NULL DEFAULT 0,
    published   BOOLEAN NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE faq_article_translations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id  UUID NOT NULL REFERENCES faq_articles(id) ON DELETE CASCADE,
    locale      TEXT NOT NULL CHECK (locale IN ('id', 'en')),
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
    content     JSONB NOT NULL DEFAULT '[]',
    faq_items   JSONB NOT NULL DEFAULT '[]',
    UNIQUE (article_id, locale)
);

-- =====================================================
-- Tools Tables
-- =====================================================

CREATE TABLE tool_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key         TEXT NOT NULL UNIQUE,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tool_category_translations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES tool_categories(id) ON DELETE CASCADE,
    locale      TEXT NOT NULL CHECK (locale IN ('id', 'en')),
    label       TEXT NOT NULL,
    UNIQUE (category_id, locale)
);

CREATE TABLE tool_articles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id     UUID NOT NULL REFERENCES tool_categories(id) ON DELETE RESTRICT,
    slug            TEXT NOT NULL UNIQUE,
    icon            TEXT NOT NULL DEFAULT '🔧',
    download_url    TEXT NOT NULL DEFAULT '',
    download_version TEXT NOT NULL DEFAULT '',
    sort_order      INT NOT NULL DEFAULT 0,
    published       BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tool_article_translations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id  UUID NOT NULL REFERENCES tool_articles(id) ON DELETE CASCADE,
    locale      TEXT NOT NULL CHECK (locale IN ('id', 'en')),
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
    content     JSONB NOT NULL DEFAULT '[]',
    specs       JSONB NOT NULL DEFAULT '[]',
    tabs        JSONB NOT NULL DEFAULT '[]',
    UNIQUE (article_id, locale)
);

-- =====================================================
-- Blog Tables
-- =====================================================

CREATE TABLE blog_posts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug         TEXT NOT NULL UNIQUE,
    category     TEXT NOT NULL CHECK (category IN ('tutorial', 'news', 'tips')),
    read_time    INT NOT NULL DEFAULT 5,
    author       TEXT NOT NULL DEFAULT 'versedroid',
    featured     BOOLEAN NOT NULL DEFAULT false,
    published    BOOLEAN NOT NULL DEFAULT false,
    cover_image  TEXT,
    published_at TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE blog_post_translations (
    id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id  UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    locale   TEXT NOT NULL CHECK (locale IN ('id', 'en')),
    title    TEXT NOT NULL,
    excerpt  TEXT NOT NULL,
    content  JSONB NOT NULL DEFAULT '[]',
    UNIQUE (post_id, locale)
);

CREATE TABLE blog_related_posts (
    post_id         UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    related_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, related_post_id),
    CHECK (post_id != related_post_id)
);

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX idx_faq_articles_category ON faq_articles(category_id);
CREATE INDEX idx_faq_articles_published ON faq_articles(published) WHERE published = true;
CREATE INDEX idx_faq_articles_sort ON faq_articles(sort_order);
CREATE INDEX idx_faq_article_trans_locale ON faq_article_translations(article_id, locale);

CREATE INDEX idx_tool_articles_category ON tool_articles(category_id);
CREATE INDEX idx_tool_articles_published ON tool_articles(published) WHERE published = true;
CREATE INDEX idx_tool_article_trans_locale ON tool_article_translations(article_id, locale);

CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX idx_blog_post_trans_locale ON blog_post_translations(post_id, locale);

-- =====================================================
-- RLS (Row Level Security)
-- =====================================================

ALTER TABLE faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_article_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_article_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_related_posts ENABLE ROW LEVEL SECURITY;

-- Public: read published content only
CREATE POLICY "Public read faq_categories" ON faq_categories FOR SELECT USING (true);
CREATE POLICY "Public read faq_category_translations" ON faq_category_translations FOR SELECT USING (true);
CREATE POLICY "Public read faq_articles" ON faq_articles FOR SELECT USING (published = true);
CREATE POLICY "Public read faq_article_translations" ON faq_article_translations
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM faq_articles WHERE id = article_id AND published = true)
    );

CREATE POLICY "Public read tool_categories" ON tool_categories FOR SELECT USING (true);
CREATE POLICY "Public read tool_category_translations" ON tool_category_translations FOR SELECT USING (true);
CREATE POLICY "Public read tool_articles" ON tool_articles FOR SELECT USING (published = true);
CREATE POLICY "Public read tool_article_translations" ON tool_article_translations
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM tool_articles WHERE id = article_id AND published = true)
    );

CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read blog_post_translations" ON blog_post_translations
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM blog_posts WHERE id = post_id AND published = true)
    );
CREATE POLICY "Public read blog_related_posts" ON blog_related_posts FOR SELECT USING (true);

-- Admin: full access (authenticated users)
CREATE POLICY "Admin full access faq_categories" ON faq_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faq_category_translations" ON faq_category_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faq_articles" ON faq_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faq_article_translations" ON faq_article_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access tool_categories" ON tool_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access tool_category_translations" ON tool_category_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access tool_articles" ON tool_articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access tool_article_translations" ON tool_article_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog_post_translations" ON blog_post_translations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blog_related_posts" ON blog_related_posts FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- Auto-update updated_at trigger
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER faq_articles_updated_at
    BEFORE UPDATE ON faq_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tool_articles_updated_at
    BEFORE UPDATE ON tool_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();