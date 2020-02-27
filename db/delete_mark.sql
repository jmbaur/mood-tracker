delete from marks
where mark_id = $1
returning *;
