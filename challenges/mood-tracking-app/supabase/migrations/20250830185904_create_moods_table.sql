CREATE TABLE moods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  mood_level INT CHECK (mood_level BETWEEN 1 AND 5),
  feelings TEXT[],          -- store selected checkboxes
  journal TEXT,
  sleep_hours INT CHECK (sleep_hours BETWEEN 0 AND 9)
);

-- Enable RLS
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

-- Policy: users can manage only their own moods
CREATE POLICY "Users can manage own moods"
ON moods
FOR ALL
USING (auth.uid() = user_id);
