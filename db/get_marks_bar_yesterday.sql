select extract(hour from time at time zone 'America/Phoenix') as t, count(*) as y from marks where user_id = $1 and mood = $2 and extract(day from time at time zone 'America/Phoenix') = extract(day from now() at time zone 'America/Phoenix' - interval '1 day') group by t order by t;

