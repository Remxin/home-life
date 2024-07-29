-- name: CreatePermissions :one
INSERT INTO "permissions" (
    id,
    can_read,
    can_edit,
    can_create
) VALUES (
    @id,
    @can_read,
    @can_edit,
    @can_create
) RETURNING *;

-- name: GetPermissions :one
SELECT * FROM "permissions"
WHERE id = @id LIMIT 1;