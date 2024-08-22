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