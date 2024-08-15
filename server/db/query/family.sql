-- name: CreateFamily :one
INSERT INTO "families" (
    id,
    name,
    owner_id
) VALUES (
    gen_random_uuid(),
    @name,
    @owner_id
) RETURNING *;

-- name: GetMembers :many
SELECT id, full_name, email, is_verified, created_at FROM "users"
WHERE family_id = @family_id;