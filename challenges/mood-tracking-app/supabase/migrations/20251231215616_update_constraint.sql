ALTER TABLE public.moods
DROP CONSTRAINT moods_user_id_fkey,
ADD CONSTRAINT fk_profile 
  FOREIGN KEY (user_id) 
  REFERENCES public.profiles(id)
  ON DELETE CASCADE;
