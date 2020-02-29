select m.mark_id, m.time, m.mood, c.comment_id, c.comment from marks m left join comments c on ( m.mark_id = c.mark_id ) where m.user_id = 1 order by m.mark_id desc;
