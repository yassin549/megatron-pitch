# Megatron Waitlist

A premium, conversion-optimized waitlist experience for Megatron - the platform that financializes reality.

## 🚀 Features

-  **Cinematic Loading** - 3000-particle logo formation with progress stages
- **Premium Glassmorphic UI** - Backdrop blur, border glow, liquid animations
- **Interactive Demos** - Eye (holographic terminal), Brain (dual-stage AI), Market (bonding curve)
- **Waitlist Integration** - Supabase-powered with referral system
- **Performance Optimized** - <150KB gzipped, lazy loading, code splitting
- **Accessibility First** - Keyboard navigation, screen reader support, reduced motion

## 📦 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + Custom animations
- **Animation**: Framer Motion
- **Database**: Supabase PostgreSQL
- **Validation**: Zod + React Hook Form
- **TypeScript**: Full type safety

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB
);

CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_referral ON waitlist(referral_code);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

Set environment variables in Vercel dashboard.

### Performance Checklist

- ✅ Images optimized (AVIF/WebP)
- ✅ Fonts preloaded (Space Grotesk, Inter)
- ✅ Code splitting enabled
- ✅ Lazy loading for demos
- ✅ Bundle <150KB gzipped
- ✅ LCP target: <2.5s
- ✅ CLS target: <0.1

## 🎨 Design Tokens

### Colors
- `void` - Near-black background (#0A0A0F)
- `nebula` - Violet gradient (#6B21E0)
- `cyber` - Cyan accent (#06B6D4)
- `plasma` - Danger/energy (#F43F5E)
- `ghost` - Subtle surfaces (rgba(255,255,255,0.03))

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- **Code**: JetBrains Mono

## 📄 Project Structure

```
/app
  /api/waitlist - API endpoint for submissions
  layout.tsx - Root layout with fonts & metadata
  page.tsx - Main landing page
  globals.css - Global styles & utilities
/components
  /loading - CinematicLoader
  /hero - WaitlistForm
  /demos - EyeDemo, BrainDemo, MarketDemo
/lib
  supabase.ts - Database client
  validation.ts - Zod schemas
  rateLimit.ts - Anti-spam protection
  animations.ts - Framer Motion configs
/public
  founder.jpg - Founder headshot
```

## 🔒 Security Features

- **Rate Limiting**: 3 requests/hour per IP, 1/day per email
- **Honeypot**: Hidden field to catch bots
- **Input Validation**: Zod schema validation
- **CORS Protection**: Next.js built-in headers

## ⚡ Performance Notes

- Main bundle: ~140KB (gzipped)
- Demos lazy-loaded: ~15-20KB each
- First paint: <1s
- Interactive: <2.5s (including cinematic loader)

## 📝 License

© 2026 Megatron. All rights reserved.

---

Built with 💜 by the Megatron team
