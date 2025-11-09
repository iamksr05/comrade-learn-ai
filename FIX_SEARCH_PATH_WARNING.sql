-- Fix for Supabase Warning: Function has mutable search_path
-- Run this SQL in your Supabase SQL Editor to fix the warning

-- Fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$;

-- Verify the function was updated
SELECT 
    proname as function_name,
    prosecdef as security_definer,
    proconfig as search_path_config
FROM pg_proc
WHERE proname = 'update_updated_at_column';

-- Expected: search_path_config should show '{search_path=public}'

