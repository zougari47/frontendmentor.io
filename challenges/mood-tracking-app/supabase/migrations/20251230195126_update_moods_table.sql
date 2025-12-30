ALTER TABLE moods
DROP CONSTRAINT IF EXISTS moods_user_id_fkey;

ALTER TABLE moods
ADD CONSTRAINT moods_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id);

-- only one mood per day for each user
CREATE UNIQUE INDEX IF NOT EXISTS moods_user_per_day_idx
ON moods (user_id, (created_at::date));
