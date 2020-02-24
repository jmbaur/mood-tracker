select u.username, m.mood, m.time from users u
join marks m on (u.user_id = m.user_id)
where u.user_id = $1;
