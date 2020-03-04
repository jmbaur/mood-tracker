select mood, count(*) from marks where user_id = $1 and extract(month from time) = extract(month from current_date at time zone 'America/Phoenix') group by mood order by mood;
