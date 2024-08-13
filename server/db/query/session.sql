-- name: CreateSession :one
INSERT INTO "sessions" (
    id,
    user_id,
    refresh_token,
    user_agent,
    client_ip,
    expires_at
) VALUES (
    gen_random_uuid(),
    @user_id,
    @refresh_token,
    @user_agent,
    @client_ip,
    @expires_at
) RETURNING *;

-- name: GetSession :one
SELECT * FROM "sessions"
WHERE id = @id LIMIT 1;