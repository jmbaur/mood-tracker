delete from comments
where comment_id = $1;

delete from marks
where mark_id = $2
returning *;
