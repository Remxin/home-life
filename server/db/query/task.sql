-- name: AddTask :one
INSERT INTO "tasks" (
    id,
    name,
    description,
    family_id,
    created_by,
    assigned_to,
    execution_date
) VALUES (
    gen_random_uuid(),
    @name,
    @description,
    @family_id,
    @created_by,
    @assigned_to,
    @execution_date
) RETURNING *;


-- name: MarkTaskAsDone :one
UPDATE "tasks"
SET done = true
WHERE 
    id = @id AND
    family_id = @family_id
RETURNING *;

-- name: DeleteTask :one
DELETE FROM "tasks"
WHERE 
    id = @id AND
    family_id = @family_id
RETURNING *;

-- name: AssignTask :one
UPDATE "tasks"
SET assigned_to = @assigned_to
WHERE 
    id = @id AND
    family_id = @family_id
RETURNING *;

-- name: GetTasks :many
SELECT * 
FROM "tasks"
WHERE
    assigned_to = COALESCE(sqlc.narg(assigned_to), assigned_to) AND
    family_id = sqlc.arg(family_id) AND
    execution_date BETWEEN sqlc.arg(date_from) AND sqlc.arg(date_to);
