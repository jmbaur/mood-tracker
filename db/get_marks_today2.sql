select mood, count(*) from marks where user_id = $1 and time >= current_date group by mood order by mood;
