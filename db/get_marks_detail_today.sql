select m.time as t, m.mood as y from marks m left join comments c on ( m.mark_id = c.mark_id ) where m.user_id = $1 and time >= now()::date + interval '1h' order by m.mark_id;
/* select m.time, m.mood, c.comment from marks m left join comments c on ( m.mark_id = c.mark_id ) where m.user_id = $1 and time >= now()::date + interval '1h' order by m.mark_id; */
