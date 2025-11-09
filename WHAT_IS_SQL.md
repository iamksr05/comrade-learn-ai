# What is SQL and What Does This File Do?

## What is SQL?

**SQL** (Structured Query Language) is a programming language used to manage and manipulate databases. It's like giving instructions to your database to:
- Create tables (like creating spreadsheets)
- Store data (like adding rows to a spreadsheet)
- Retrieve data (like searching in a spreadsheet)
- Update data (like editing cells)
- Delete data (like removing rows)

## What Does SUPABASE_SCHEMA.sql Do?

This SQL file creates the **database structure** (schema) for your application. Think of it as building the foundation and rooms of a house before you can move furniture in.

### It Does 5 Main Things:

### 1. **Creates Tables** (Like Creating Spreadsheets)
```sql
CREATE TABLE user_profiles (...)
CREATE TABLE user_courses (...)
```
- Creates two "tables" (like Excel spreadsheets)
- `user_profiles` - Stores user information (name, email, settings)
- `user_courses` - Stores user courses and progress

### 2. **Defines Columns** (Like Column Headers)
```sql
id UUID PRIMARY KEY
email TEXT NOT NULL
name TEXT NOT NULL
```
- Defines what information each table stores
- Like column headers in Excel: Name, Email, etc.

### 3. **Sets Rules** (Like Validation Rules)
```sql
CHECK (disability IN ('adhd', 'dyslexia', 'hearing', 'vision', 'none'))
CHECK (progress >= 0 AND progress <= 100)
```
- Ensures data is valid
- Like Excel data validation (only allow certain values)

### 4. **Creates Security** (Like Access Control)
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ...
```
- Ensures users can only see/edit their own data
- Like password-protecting personal files

### 5. **Sets Up Automation** (Like Auto-Update)
```sql
CREATE TRIGGER update_updated_at_column ...
```
- Automatically updates timestamps when data changes
- Like Excel auto-updating formulas

## How to Use This File

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**

### Step 2: Copy and Paste
1. Open `SUPABASE_SCHEMA.sql` from your project
2. Copy **all** the content (Cmd/Ctrl + A, then Cmd/Ctrl + C)
3. Paste into the SQL Editor (Cmd/Ctrl + V)

### Step 3: Run It
1. Click the **Run** button (or press Cmd/Ctrl + Enter)
2. Wait for it to complete (should say "Success")
3. You should see messages like:
   - "CREATE TABLE"
   - "CREATE POLICY"
   - "Success. No rows returned"

### Step 4: Verify
1. Go to **Table Editor** in the left sidebar
2. You should see two tables:
   - `user_profiles`
   - `user_courses`

## What Each Part Does (Simple Explanation)

### User Profiles Table
Stores information about each user:
- **id** - Unique user ID
- **email** - User's email address
- **name** - User's name
- **disability** - User's special ability (adhd, dyslexia, etc.)
- **settings** - User's app settings (notifications, text-to-speech, etc.)
- **created_at** - When account was created
- **updated_at** - When profile was last updated

### User Courses Table
Stores courses for each user:
- **id** - Unique course record ID
- **user_id** - Which user owns this course
- **course_id** - The course identifier
- **course_data** - All course information (stored as JSON)
- **progress** - How much of the course is completed (0-100%)
- **created_at** - When course was created
- **updated_at** - When course was last updated

### Security Policies
Ensures users can only:
- See their own profile
- Edit their own profile
- See their own courses
- Create their own courses
- Delete their own courses

## Why Do You Need This?

Without running this SQL file:
- ❌ Your app won't know where to store user data
- ❌ Tables won't exist in the database
- ❌ The app will show errors when trying to save data

After running this SQL file:
- ✅ Database tables are created
- ✅ Security rules are set up
- ✅ Your app can store and retrieve data
- ✅ Users can only access their own data

## Common Questions

### Q: Do I need to understand SQL to use this?
**A:** No! You just need to copy and paste it into Supabase. The file is already written for you.

### Q: What if I make a mistake?
**A:** You can run it multiple times. It uses `CREATE TABLE IF NOT EXISTS`, so it won't break if tables already exist.

### Q: Can I modify this file?
**A:** Only if you know what you're doing. For now, just run it as-is.

### Q: Do I need to run this every time?
**A:** No, only once when setting up your project. After that, the tables stay in your database.

## Summary

- **SQL** = Language for managing databases
- **SUPABASE_SCHEMA.sql** = Instructions to create your database structure
- **What to do** = Copy, paste, and run in Supabase SQL Editor
- **Result** = Your database is ready to store user data and courses

Think of it like this:
- **Database** = A filing cabinet
- **Tables** = Drawers in the cabinet
- **SQL Schema** = Instructions to build the drawers
- **Running the SQL** = Building the drawers so you can store files

Once you run this SQL file, your database will be ready to use! 🎉

