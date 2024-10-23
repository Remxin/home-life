-- name: CreateUser :one
INSERT INTO users (
    id,
    full_name,
    email,
    hashed_password
) VALUES (
    gen_random_uuid(),
    @name,
    @email,
    @password
) RETURNING *;

-- name: GetUserById :one
SELECT * FROM "users"
WHERE id = @id LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM "users"
WHERE email = @email LIMIT 1;

-- name: GetUsersByEmail :many
SELECT u.* FROM "users" u
LEFT JOIN permissions p ON p.id = u.id
WHERE
    u.is_verified = TRUE
    AND u.email LIKE '%' || @email || '%\@%'
    AND (@no_family IS FALSE OR p.family_id IS NULL)
LIMIT 8;


-- name: GetUserWithPermissions :one
SELECT u.id, u.full_name, u.email, u.is_verified, p.* FROM "users" u
LEFT JOIN "permissions" p ON p.id = u.id
WHERE u.id = @id
LIMIT 1;

-- name: UpdateUser :one
UPDATE "users"
SET
    hashed_password = COALESCE(sqlc.narg(hashed_password), hashed_password),
    password_changed_at = COALESCE(sqlc.narg(password_changed_at), password_changed_at),
    full_name = COALESCE(sqlc.narg(full_name), full_name),
    email = COALESCE(sqlc.narg(email), email),
    is_verified = COALESCE(sqlc.narg(is_verified), is_verified)
WHERE
    id = sqlc.arg(id)
RETURNING *;




