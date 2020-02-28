-- select mood, extract(hour from time), extract(minute from time) from marks where time >= now()::date + interval '1h' and user_id = 1 order by mark_id;

select mood, time from marks where time >= now()::date + interval '1h' and user_id = 1 order by mark_id;

