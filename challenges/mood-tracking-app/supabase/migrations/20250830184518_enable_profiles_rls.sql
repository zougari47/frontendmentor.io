ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own profile"
ON profiles
FOR ALL
USING (auth.uid() = id);
