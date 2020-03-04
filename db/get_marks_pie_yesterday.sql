select mood, count(*) from marks where user_id = $1 and extract(day from time) = extract(day from current_date at time zone 'America/Phoenix' - interval '1 day') group by mood order by mood;

