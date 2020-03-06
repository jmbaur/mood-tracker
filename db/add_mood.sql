delete from moods
where num = $1 and user_id = $3;

insert into moods
(num, name, user_id)
values
($1, $2, $3)
returning *;
