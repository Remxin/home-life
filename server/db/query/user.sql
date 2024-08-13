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

-- name: GetUser :one
SELECT * FROM "users"
WHERE id = @id LIMIT 1;

