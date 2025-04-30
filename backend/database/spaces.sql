-- Table
CREATE TABLE spaces (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_by TEXT NOT NULL,
    number_of_pages INTEGER NOT NULL,
    access_level TEXT NOT NULL CHECK (access_level IN ('private', 'team', 'public')),
    last_activity_at TIMESTAMP
);

-- Index
CREATE INDEX idx_spaces_created_by ON spaces (created_by);
