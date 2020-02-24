insert into marks
(user_id, time, mood)
values
($1, $2, $3);

select u.username, m.mood, m.time from users u
join marks m on (u.user_id = m.user_id)
where u.user_id = $1;
