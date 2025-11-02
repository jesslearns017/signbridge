# SignBridge Application

> HIPAA-compliant healthcare communication platform for Deaf and Hard-of-Hearing patients

## 🎯 What Is This?

SignBridge enables Deaf and Hard-of-Hearing patients to communicate with medical providers through:
- **High-quality video** (60fps for sign language clarity)
- **Sign language interpreters** (ASL, LSM, LSE)
- **Live captions** (speech-to-text in real-time)
- **Text chat with text-to-speech**
- **Spanish language support**

All fully HIPAA-compliant and accessible (WCAG 2.1 AA).

## 🏗️ Technology Stack

- **Frontend**: Next.js 14 (React + TypeScript)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Video**: Daily.co (HIPAA-compliant)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **i18n**: next-i18next (EN/ES)
- **Testing**: Jest + Playwright

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Supabase account (free tier OK for development)
- Daily.co account (free tier OK for development)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your Supabase credentials to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Add your Daily.co credentials
NEXT_PUBLIC_DAILY_API_KEY=your_daily_key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Project Structure

```
app/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Dashboard pages by role
│   │   ├── appointments/   # Appointment scheduling
│   │   ├── video-call/     # Video consultation
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── video/          # Video call components
│   │   └── shared/         # Shared components
│   ├── lib/                # Utilities and helpers
│   │   ├── supabase/       # Supabase client
│   │   ├── daily/          # Daily.co video
│   │   └── utils/          # Helper functions
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets
└── tests/                  # Test files
```

## 🔐 Environment Variables

Required for development:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Daily.co
NEXT_PUBLIC_DAILY_API_KEY=your-daily-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

See `.env.example` for complete list.

## 🗄️ Database Setup

1. Create Supabase project at https://supabase.com
2. Run SQL migrations from `../.signbridge-agents/PROJECT-PLAN.md`
3. Enable Row Level Security (RLS) on all tables
4. Enable Email/Password authentication
5. Configure session timeout (15 min for HIPAA)

## 🎨 Design System

### Brand Colors (Deaf Flag)
- **Deaf Blue**: `#0055CC` - Primary brand color
- **Turquoise**: `#00BCD4` - Secondary actions
- **Deaf Yellow**: `#FFD700` - Accents and highlights
- **Navy**: `#001F3F` - Dark backgrounds

### Typography
- **Sans**: Inter (body, UI)
- **Serif**: DM Serif Display (headings)

### Accessibility
- WCAG 2.1 AA compliant
- 4.5:1 color contrast minimum
- Keyboard navigation
- Screen reader compatible
- Visual-first notifications (no audio-only)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format with Prettier

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run E2E tests with Playwright
```

## 🧪 Testing

```bash
# Unit tests (Jest + React Testing Library)
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Accessibility tests
npx @axe-core/cli http://localhost:3000
```

## 📦 Adding UI Components

We use shadcn/ui for accessible components:

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add specific components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
```

## 🔒 HIPAA Compliance

**⚠️ CRITICAL for Production:**

1. **Sign BAAs** before handling real patient data:
   - Supabase BAA (requires Pro plan: $25/month)
   - Daily.co BAA (contact sales)
   - AWS BAA (if using S3/SES)

2. **Enable audit logging** (built into middleware)

3. **Configure encryption**:
   - At rest: Supabase encrypts with AES-256
   - In transit: TLS 1.2+ enforced

4. **Set session timeout**: 15 minutes (configured in Supabase)

5. **Implement patient rights**:
   - Right to access (data export)
   - Right to amend
   - Accounting of disclosures

## 🌎 Internationalization (i18n)

Supports English and Spanish:

```typescript
import { useTranslation } from 'next-i18next'

function Component() {
  const { t } = useTranslation('common')
  return <h1>{t('welcome')}</h1>
}
```

Translation files: `/public/locales/{en,es}/*.json`

## 📊 Build Status

See `BUILD-STATUS.md` for detailed progress tracking.

**Current Status**: Foundation Complete (~15%)

**Next Phase**: Authentication & User Profiles

## 🎯 Features Roadmap

### ✅ Phase 0: Foundation (COMPLETE)
- Project structure
- Configuration files
- Database types
- Supabase integration
- Security headers
- Landing page

### 🔄 Phase 1: Authentication (IN PROGRESS)
- Login/Register pages
- User profiles
- MFA
- Session management

### ⏳ Phase 2: Appointments
- Booking system
- Calendar integration
- Interpreter matching

### ⏳ Phase 3: Video Consultations
- Daily.co integration
- Live captions (speech-to-text)
- Text chat with TTS
- Interpreter joining

### ⏳ Phase 4: Spanish & LSM
- Full Spanish translation
- LSM interpreter support

### ⏳ Phase 5: Dashboards
- Patient/Provider/Interpreter/Admin dashboards

### ⏳ Phase 6: HIPAA Features
- Audit logs UI
- Patient data export
- Compliance reports

### ⏳ Phase 7: Testing & QA
- Comprehensive test suite
- Accessibility audit
- Performance optimization

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Staging (Netlify)
```bash
# Automatic deployment on push to staging branch
git push origin staging
```

### Production (Netlify)
```bash
# Automatic deployment on push to main branch
git push origin main
```

See `../.signbridge-agents/PROJECT-PLAN.md` for detailed deployment guide.

## 📖 Documentation

- **Architecture**: `../.signbridge-agents/PROJECT-PLAN.md`
- **Agent System**: `../.signbridge-agents/docs/README.md`
- **Build Status**: `BUILD-STATUS.md`
- **Quick Start**: `../.signbridge-agents/docs/QUICK-START.md`

## 🆘 Need Help?

### Use the Agent System
We have 20 specialized AI agents to help:

```bash
# See agent list
cat ../.signbridge-agents/INDEX.md

# Quick start guide
cat ../.signbridge-agents/docs/QUICK-START.md
```

**Common questions:**
- Architecture → Architecture Agent
- HIPAA → HIPAA Compliance Agent
- Security → Cybersecurity Agent
- Video → Real-time Video Agent
- Spanish/LSM → Spanish Language & LSM Agent

## 🤝 Contributing

This is a healthcare application handling Protected Health Information (PHI). All contributions must:

1. Pass security review (Cybersecurity Agent)
2. Pass HIPAA compliance review (HIPAA Compliance Agent)
3. Pass accessibility tests (Accessibility Agent)
4. Include comprehensive tests
5. Follow coding standards (ESLint + Prettier)

## 📄 License

© 2025 SignBridge. All rights reserved.

Built with ❤️ for the Deaf and Hard-of-Hearing community.

---

**Status**: Foundation Complete | **Next**: Build Authentication
