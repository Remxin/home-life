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

-- name: GetFamily :one
SELECT *
FROM families
WHERE id = @family_id
LIMIT 1;

-- name: GetMembers :many
SELECT users.*
FROM users 
INNER JOIN permissions p USING (id) 
WHERE p.family_id = @family_id;
