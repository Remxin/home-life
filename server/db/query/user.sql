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

-- name: AddUserToFamily :one
UPDATE "users"
SET
    family_id = @family_id
WHERE
    id = @id
RETURNING *;



