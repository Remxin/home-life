-- name: CreateFamily :one
INSERT INTO "families" (
    id,
    name,
    owner
) VALUES (
    gen_random_uuid(),
    @name,
    @owner
) RETURNING *;

-- name: GetMembers :many
SELECT id, full_name, email, is_verified, created_at FROM "users"
WHERE family = @family_id;