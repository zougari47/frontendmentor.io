INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Public view"
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'avatars');
