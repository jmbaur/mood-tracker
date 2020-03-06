delete from moods
where mood_id = $1
returning *;
