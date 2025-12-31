ALTER TABLE moods
DROP CONSTRAINT IF EXISTS moods_user_id_fkey;

ALTER TABLE moods
ADD CONSTRAINT moods_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id);

ALTER TABLE moods
DROP CONSTRAINT IF EXISTS moods_mood_level_check,
DROP CONSTRAINT IF EXISTS moods_sleep_hours_check;
