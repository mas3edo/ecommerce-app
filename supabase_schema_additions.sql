-- =====================================================
-- TechFlow — Supabase Schema Additions
-- Run this in: Supabase Dashboard → SQL Editor
-- =====================================================

-- 1. Profiles Table (Public user info)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. Orders Table (Fake checkout orders)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_name TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders Policies
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin can see all orders (using user_metadata.role)
-- Note: For production, use app_metadata instead
CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

-- =====================================================
-- HOW TO SET A USER AS ADMIN:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click on the user → Edit
-- 3. In "User Metadata" field, set: {"role": "admin"}
-- 4. Save
-- =====================================================
