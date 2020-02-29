select * from moods
where user_id = $1
order by num;
