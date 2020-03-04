select mood, count(*) from marks where user_id = $1 and time at time zone 'America/Phoenix' >= date_trunc('week', now() at time zone 'America/Phoenix') group by mood order by mood;
