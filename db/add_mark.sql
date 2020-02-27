insert into marks
(user_id, time, mood)
values
($1, $2, $3)
returning *;
