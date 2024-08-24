-- name: CreateRecipe :one
INSERT INTO "recipes" (
    id,
    created_by,
    public,
    title,
    description,
    iframe_link,
    image_link
) VALUES (
    gen_random_uuid(),
    @created_by,
    @public,
    @title,
    @description,
    @iframe_link,
    @image_link
) RETURNING *;

-- name: UpdateRecipe :one
UPDATE "recipes"
SET
  title = COALESCE(sqlc.narg(title), title),
  public = COALESCE(sqlc.narg(public), public),
  description = COALESCE(sqlc.narg(description), description),
  iframe_link = COALESCE(sqlc.narg(iframe_link), iframe_link),
  image_link = COALESCE(sqlc.narg(image_link), image_link)
WHERE
  id = sqlc.arg(id) AND
  created_by = sqlc.arg(created_by)
RETURNING *;

-- name: GetRecipes :many
SELECT r.*
FROM "recipes" r
INNER JOIN "users" u 
  ON r.created_by = u.id
LEFT JOIN "permissions" p 
  ON u.id = p.id
WHERE 
  p.family_id = COALESCE(sqlc.narg(family_id), family_id) AND
  public = COALESCE(sqlc.narg(public), public) AND 
  (
    sqlc.narg(title)::text IS NULL OR r.title ILIKE '%' || sqlc.narg(title)::text || '%'
  );


  