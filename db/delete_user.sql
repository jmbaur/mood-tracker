delete from comments where user_id = $1;
delete from moods where user_id = $1;
delete from marks where user_id = $1;
delete from users where user_id = $1;
