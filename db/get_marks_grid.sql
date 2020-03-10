select * from marks m where m.user_id = $1 and m.time at time zone 'America/Phoenix' >= now() at time zone 'America/Phoenix' - interval '100 days';

