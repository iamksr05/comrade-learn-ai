# Supabase Setup Checklist

## ✅ Pre-Setup (Code is Ready!)
- [x] Supabase client installed
- [x] Authentication context created
- [x] Database service layer created
- [x] All components updated to use Supabase
- [x] Database schema SQL file created
- [x] Documentation created

## 🔧 Setup Steps (Do These Now!)

### 1. Create Supabase Project
- [ ] Go to https://supabase.com and sign up/login
- [ ] Create a new project
- [ ] Save your database password
- [ ] Wait for project to be ready (2-3 minutes)

### 2. Get Credentials
- [ ] Go to Settings → API in Supabase dashboard
- [ ] Copy Project URL
- [ ] Copy anon public key

### 3. Configure Environment
- [ ] Create `.env` file in project root
- [ ] Add `VITE_SUPABASE_URL=your_url`
- [ ] Add `VITE_SUPABASE_ANON_KEY=your_key`
- [ ] Verify `.env` is in `.gitignore` (already done ✅)

### 4. Set Up Database
- [ ] Open SQL Editor in Supabase
- [ ] Copy contents of `SUPABASE_SCHEMA.sql`
- [ ] Run the SQL query
- [ ] Verify tables created in Table Editor

### 5. Enable Authentication
- [ ] Go to Authentication → Providers
- [ ] Enable Email provider

### 6. Test the Application
- [ ] Start dev server: `npm run dev`
- [ ] Try signing up a new user
- [ ] Check Supabase dashboard for new user
- [ ] Try logging in
- [ ] Test creating a course
- [ ] Verify data in Supabase tables

## 🚀 After Setup

### Test Features
- [ ] User registration works
- [ ] User login works
- [ ] Profile page loads user data
- [ ] Profile updates save to database
- [ ] Settings sync with database
- [ ] Course creation saves to database
- [ ] Courses load from database
- [ ] Logout works correctly

### Verify Data
- [ ] Check `user_profiles` table has data
- [ ] Check `user_courses` table has data
- [ ] Verify RLS policies are working
- [ ] Test with multiple users (if needed)

## 📝 Notes

- Keep your `.env` file secure and never commit it
- Your Supabase anon key is safe to use client-side (protected by RLS)
- Database password is only needed for direct database access (not needed for app)

## 🆘 If Something Goes Wrong

1. **Check browser console** for errors
2. **Check Supabase logs** in dashboard
3. **Verify environment variables** are set correctly
4. **Restart dev server** after changing `.env`
5. **Check SQL schema** was run successfully
6. **Verify email provider** is enabled

## 📚 Documentation

- `QUICK_START.md` - Quick setup guide
- `SUPABASE_SETUP.md` - Detailed setup instructions
- `SUPABASE_INTEGRATION_SUMMARY.md` - Technical details
- `SUPABASE_SCHEMA.sql` - Database schema

## 🎉 Ready to Deploy?

When you're ready to deploy:
1. Set environment variables in your hosting platform
2. Use production Supabase project (recommended)
3. Update environment variables in deployment settings
4. Test in production environment

