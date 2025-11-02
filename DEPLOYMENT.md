# SignBridge Deployment Guide

This guide will walk you through deploying SignBridge to production using Netlify for the frontend and Supabase for the backend.

## Prerequisites

- Node.js 18+ and npm 9+
- Git
- Netlify account
- Supabase account
- Daily.co account (for video calls)
- Resend account (for emails)

## Environment Variables

Create a `.env.local` file in the `app` directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Daily.co Configuration (HIPAA-compliant video)
DAILY_API_KEY=your-daily-api-key
DAILY_RECORDINGS_BUCKET=your-s3-bucket-name
DAILY_RECORDINGS_REGION=us-west-2
DAILY_RECORDINGS_ROLE_ARN=your-aws-role-arn

# Email Configuration (Resend)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=SignBridge <noreply@signbridge.health>

# Application Settings
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## Step 1: Set Up Supabase

### 1.1 Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Save your project URL and anon key

### 1.2 Run Database Migrations

Execute the following SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('patient', 'provider', 'interpreter', 'admin')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  preferred_language VARCHAR(10) DEFAULT 'en',
  preferred_sign_language VARCHAR(10),
  phone VARCHAR(20),
  timezone VARCHAR(50),
  specialty VARCHAR(100),
  languages_spoken TEXT[],
  sign_languages TEXT[],
  rating DECIMAL(3,2),
  communication_preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id),
  provider_id UUID NOT NULL REFERENCES profiles(id),
  interpreter_id UUID REFERENCES profiles(id),
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ NOT NULL,
  actual_start TIMESTAMPTZ,
  actual_end TIMESTAMPTZ,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),
  reason TEXT NOT NULL,
  needs_interpreter BOOLEAN DEFAULT FALSE,
  preferred_sign_language VARCHAR(10),
  notes TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMPTZ,
  cancelled_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Video sessions table
CREATE TABLE video_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID NOT NULL REFERENCES appointments(id),
  room_url TEXT NOT NULL,
  room_name TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  recording_url TEXT,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE video_sessions ENABLE ROW LEVEL SECURITY;

-- Medical records table
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES profiles(id),
  provider_id UUID REFERENCES profiles(id),
  appointment_id UUID REFERENCES appointments(id),
  record_type VARCHAR(20) NOT NULL CHECK (record_type IN ('lab_result', 'prescription', 'imaging', 'note', 'other')),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  file_url TEXT,
  file_name VARCHAR(200),
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

### 1.3 Set Up Storage Buckets

Create a storage bucket for medical records:

```sql
-- Create medical-records bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('medical-records', 'medical-records', true);

-- Set up RLS policies for storage
CREATE POLICY "Users can upload their own medical records"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'medical-records' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own medical records"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'medical-records' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 2: Set Up Daily.co

1. Sign up at [daily.co](https://www.daily.co)
2. Go to Developers > API Keys
3. Create a new API key
4. **Important:** Request HIPAA compliance from Daily.co support
5. Set up cloud recording (optional):
   - Configure AWS S3 bucket for recordings
   - Set up IAM role with appropriate permissions
   - Add bucket details to environment variables

## Step 3: Set Up Resend (Email Service)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Create an API key
4. Add API key to environment variables

## Step 4: Deploy to Netlify

### 4.1 Connect Your Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect your Git repository
4. Select the `app` directory as the base directory

### 4.2 Configure Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Base directory:** `app`

### 4.3 Add Environment Variables

Go to Site settings > Environment variables and add all variables from `.env.local`

### 4.4 Enable Netlify Next.js Plugin

The `netlify.toml` file is already configured with the Next.js plugin.

### 4.5 Deploy

Click "Deploy site" and wait for the build to complete.

## Step 5: Configure Domain and HTTPS

1. Go to Site settings > Domain management
2. Add your custom domain
3. Netlify will automatically provision an SSL certificate

## Step 6: Post-Deployment Checklist

### Security

- [ ] Verify all environment variables are set correctly
- [ ] Test HTTPS is working
- [ ] Verify security headers are applied (check browser dev tools)
- [ ] Test CSP (Content Security Policy) doesn't block required resources
- [ ] Enable Netlify Identity if needed

### Functionality

- [ ] Test user registration and login
- [ ] Test appointment booking flow
- [ ] Test video call functionality
- [ ] Test email notifications
- [ ] Test medical records upload
- [ ] Test all user roles (patient, provider, interpreter)
- [ ] Test language switcher (English/Spanish)

### HIPAA Compliance

- [ ] Verify BAA with Supabase
- [ ] Verify BAA with Daily.co
- [ ] Ensure audit logging is working
- [ ] Test file encryption in Supabase Storage
- [ ] Review and sign BAA with Netlify (if handling PHI)
- [ ] Document security measures

### Monitoring

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Set up uptime monitoring
- [ ] Set up performance monitoring
- [ ] Configure alerts for downtime

## Step 7: Continuous Deployment

Every push to your main branch will automatically trigger a new deployment on Netlify.

### Deploy Previews

Pull requests will automatically get deploy previews. You can test changes before merging.

## Troubleshooting

### Build Failures

1. Check build logs in Netlify dashboard
2. Verify all dependencies are in `package.json`
3. Ensure Node version matches (18+)
4. Clear cache and retry deployment

### Environment Variables Not Working

1. Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding/changing environment variables
3. Check for typos in variable names

### Video Calls Not Working

1. Verify Daily.co API key is correct
2. Check browser console for CSP errors
3. Ensure camera/microphone permissions are granted
4. Test on HTTPS (required for WebRTC)

### Database Connection Issues

1. Verify Supabase URL and keys
2. Check RLS policies are correctly set
3. Review Supabase logs for errors

## Scaling Considerations

### Database

- Monitor Supabase usage and upgrade plan as needed
- Add database indexes for frequently queried fields
- Set up database backups

### File Storage

- Monitor storage usage in Supabase
- Consider CDN for frequently accessed files
- Implement file size limits

### Video Infrastructure

- Monitor Daily.co usage
- Consider upgrading plan for more concurrent participants
- Implement usage limits per user

## Cost Estimates

### Netlify
- Free tier: 100 GB bandwidth, 300 build minutes
- Pro: $19/month for more resources

### Supabase
- Free tier: 500 MB database, 1 GB file storage
- Pro: $25/month for more resources

### Daily.co
- Free tier: 10K participant minutes/month
- Scale: $0.004/participant minute

### Resend
- Free tier: 100 emails/day
- Pro: $20/month for 50K emails

**Estimated monthly cost for small practice (50 patients):** $50-100/month
**Estimated monthly cost for medium practice (200 patients):** $200-400/month

## Support

For deployment issues, contact:
- Netlify: https://answers.netlify.com/
- Supabase: https://supabase.com/dashboard/support
- Daily.co: support@daily.co
- Resend: support@resend.com

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Netlify Next.js Plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [Supabase Documentation](https://supabase.com/docs)
- [Daily.co Documentation](https://docs.daily.co/)
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa/for-professionals/index.html)
