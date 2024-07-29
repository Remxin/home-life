-- name: CreateFamily :one
INSERT INTO "families" (
    name,
    owner
) VALUES (
    @name,
    @owner
) RETURNING *;

-- name: GetMembers :many
SELECT id, name, email, is_verified, created_at FROM "users"
WHERE family = @family_id;