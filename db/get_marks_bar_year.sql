 select to_char(to_timestamp(to_char(time, 'MM'), 'MM'), 'Mon') as t, count(*) as y from marks where user_id = $1 and mood = $2 and extract(year from time at time zone 'America/Phoenix') = extract(year from now() at time zone 'America/Phoenix') group by t order by t;

