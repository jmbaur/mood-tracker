select mood, count(*) from marks where user_id = $1 and time >= date_trunc('week', current_date at time zone 'America/Phoenix') group by mood order by mood;
