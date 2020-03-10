select * from marks where user_id = $1 and extract(doy from time at time zone 'America/Phoenix') = $2 and extract(year from time at time zone 'America/Phoenix') = $3;
