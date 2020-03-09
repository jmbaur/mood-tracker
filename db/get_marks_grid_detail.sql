get * from marks where user_id = $1 and extract(day from time at time zone 'America/Phoenix') = extract(day from $2);
