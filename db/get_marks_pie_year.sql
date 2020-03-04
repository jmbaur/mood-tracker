select mood, count(*) from marks where user_id = $1 group by mood order by mood;
