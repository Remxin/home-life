-- name: CreatePermissions :one
INSERT INTO "permissions" (
    id,
    can_read,
    can_edit,
    can_create,
    can_modify
) VALUES (
    @id,
    @can_read,
    @can_edit,
    @can_create,
    @can_modify
) RETURNING *;

-- name: GetPermissions :one
SELECT * FROM "permissions"
WHERE id = @id LIMIT 1;