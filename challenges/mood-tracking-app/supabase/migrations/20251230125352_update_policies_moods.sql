DROP POLICY "Users can manage own moods" ON moods;

CREATE POLICY "Users can view own moods"
ON moods
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own moods"
ON moods
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own moods"
ON moods
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own moods"
ON moods
FOR DELETE
USING (auth.uid() = user_id);

ALTER TABLE moods
ADD CONSTRAINT mood_level_range
CHECK (mood_level BETWEEN 0 AND 4);

ALTER TABLE moods
ALTER COLUMN sleep_hours TYPE float8
USING sleep_hours::float8;

ALTER TABLE moods
ADD CONSTRAINT sleep_hours_allowed
CHECK (sleep_hours IN (1.0, 3.5, 5.5, 7.5, 10.0));
