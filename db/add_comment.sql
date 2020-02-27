insert into comments
(mark_id, comment, user_id)
values
($1, $2, $3)
returning *;
