-- name: CreateVerifyEmail :one
INSERT INTO "verify_emails" (
    id,
    user_id,
    email,
    secret_code,
    expired_at
) VALUES (
    gen_random_uuid(),
    @user_id,
    @email,
    @secret_code,
    @expired_at
) RETURNING *;

-- name: UpdateVerifyEmail :one
UPDATE "verify_emails"
SET
    is_used = true
WHERE
    id = @id
    AND secret_code = @secret_code
    AND is_used = false
    AND expired_at > NOW()
RETURNING *;