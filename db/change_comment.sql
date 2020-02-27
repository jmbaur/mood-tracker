delete from comments
where comment_id = $1;

insert into comments
(mark_id, comment, user_id)
values
($2, $3, $4)
returning *;
