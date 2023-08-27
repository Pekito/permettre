-- Check if the database exists; create if not exists
DROP DATABASE IF EXISTS permettre;
CREATE DATABASE permettre;

CREATE TABLE permissions (
    permission_id UUID PRIMARY KEY,
    name TEXT
);

CREATE TABLE users (
    virtual_id UUID PRIMARY KEY,
    id TEXT UNIQUE
);

CREATE TABLE user_permissions (
    user_virtual_id UUID,
    permission_id UUID,
    mode TEXT,
    PRIMARY KEY (user_virtual_id, permission_id),
    FOREIGN KEY (user_virtual_id) REFERENCES users (virtual_id),
    FOREIGN KEY (permission_id) REFERENCES permissions (permission_id)
);

CREATE TABLE user_groups (
    id UUID PRIMARY KEY,
    name TEXT
);

CREATE TABLE user_group_permissions (
    user_group_id UUID,
    permission_id UUID,
    mode TEXT,
    PRIMARY KEY (user_group_id, permission_id),
    FOREIGN KEY (user_group_id) REFERENCES user_groups (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (permission_id)
);

CREATE TABLE user_user_groups (
    user_virtual_id UUID,
    user_group_id UUID,
    PRIMARY KEY (user_virtual_id, user_group_id),
    FOREIGN KEY (user_virtual_id) REFERENCES users (virtual_id),
    FOREIGN KEY (user_group_id) REFERENCES user_groups (id)
);