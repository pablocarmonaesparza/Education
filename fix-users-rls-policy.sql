-- Add INSERT policy for users table
-- This allows users to insert their own record if it doesn't exist yet
-- First drop the policy if it exists, then create it
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;

CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);


-- First drop the policy if it exists, then create it
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;

CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

