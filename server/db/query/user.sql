-- name: CreateUser :one
INSERT INTO users (
    name,
    email,
    password
) VALUES (
    @name,
    @email,
    @password
) RETURNING *;

-- name: GetUser :one
SELECT * FROM "users"
WHERE id = @id LIMIT 1;

