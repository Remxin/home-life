-- name: CreateSession :one
INSERT INTO "sessions" (
    id,
    user_id,
    refresh_token,
    user_agent,
    client_ip,
    expires_at
) VALUES (
    @id,
    @user_id,
    @refresh_token,
    @user_agent,
    @client_ip,
    @expires_at
) RETURNING *;

-- name: GetSession :one
SELECT * FROM "sessions"
WHERE id = @id LIMIT 1;

-- name: GetUserSessionsCount :one
SELECT COUNT(id) as count FROM "sessions"
WHERE 
    user_id = @user_id AND
    expires_at > NOW()
LIMIT 1;

-- name: UpdateUserSession :one
UPDATE "sessions"
SET 
    id = @new_id,
    refresh_token = @refresh_token,
    expires_at = @expires_at
WHERE id = @id
RETURNING *;

-- name: DeleteOldestUserSession :one
DELETE FROM "sessions"
WHERE id = (
    SELECT id FROM "sessions" AS s
    WHERE s.user_id = @user_id
    ORDER BY expires_at ASC
    LIMIT 1
)
RETURNING *;

-- name: CleanExpiredSessions :many
DELETE FROM "sessions"
WHERE expires_at < NOW()
RETURNING *;