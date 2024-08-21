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
SELECT * 
FROM users 
INNER JOIN permissions p USING (id) 
WHERE p.family_id = @family_id;
