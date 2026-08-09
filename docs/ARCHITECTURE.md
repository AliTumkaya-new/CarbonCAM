# 🏗️ CarbonCAM - Route Groups Architecture

## 📐 Proje Mimarisi

Next.js Route Groups ile temiz, ayrıştırılmış mimari:

```
web/app/
├── (marketing)/           # 🌐 Public-facing pages (NO SIDEBAR)
│   ├── layout.tsx        # Navbar + Footer
│   ├── page.tsx          # Landing page (/)
│   ├── docs/
│   │   └── page.tsx      # Documentation (/docs)
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx  # Sign-in page
│   └── sign-up/
│       └── [[...sign-up]]/
│           └── page.tsx  # Sign-up page
│
├── (dashboard)/          # 📊 Authenticated app (WITH SIDEBAR)
│   ├── layout.tsx        # Sidebar + Header
│   ├── dashboard/
│   │   └── page.tsx      # Main dashboard (/dashboard)
│   ├── library/
│   │   └── page.tsx      # Library page (/library)
│   ├── results/
│   │   └── page.tsx      # Results page (/results)
│   └── settings/
│       ├── security/
│       │   └── page.tsx  # Security settings
│       └── team/
│           └── page.tsx  # Team settings
│
├── api/                  # 🔌 API routes
│   ├── calculate/
│   ├── library/
│   └── ...
│
├── layout.tsx            # 🌍 Root layout (ClerkProvider, etc.)
└── globals.css           # 🎨 Global styles
```

---

## 🎯 Route Groups Nedir?

Next.js'te **`(folder)`** formatındaki klasörler URL'de görünmez:

- `app/(marketing)/page.tsx` → `http://localhost:3000/`
- `app/(marketing)/docs/page.tsx` → `http://localhost:3000/docs`
- `app/(dashboard)/dashboard/page.tsx` → `http://localhost:3000/dashboard`

Aynı layout'u paylaşan sayfaları gruplamak için kullanılır.

---

## 📂 Layout Hierarchy

### 1. Root Layout (`app/layout.tsx`)
```tsx
<html>
  <body>
    <ClerkProvider>
      <CrispChat />
      {children} // (marketing) veya (dashboard) buraya render olur
    </ClerkProvider>
  </body>
</html>
```

**Sorumluluklar:**
- ✅ ClerkProvider (auth wrapper)
- ✅ Crisp Chat widget
- ✅ Sentry user context
- ✅ next-intl provider
- ✅ Global fonts ve metadata

---

### 2. Marketing Layout (`app/(marketing)/layout.tsx`)

```tsx
<div>
  <Navbar>                    {/* Transparent navbar */}
    <Logo />
    <LanguageSwitcher />
    <SignInButton />
  </Navbar>

  <main>{children}</main>     {/* Landing page content */}

  <Footer>                    {/* Simple footer */}
    <Links />
    <Copyright />
  </Footer>
</div>
```

**Sorumluluklar:**
- ✅ Navbar (Logo + Sign In)
- ✅ Footer (Links + Copyright)
- ❌ NO SIDEBAR
- ❌ NO Auth koruması (public sayfalar)

**Sayfalar:**
- `/` - Landing page
- `/docs` - Documentation
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

---

### 3. Dashboard Layout (`app/(dashboard)/layout.tsx`)

```tsx
<div className="flex min-h-screen">
  <Sidebar>                   {/* Left sidebar */}
    <Logo />
    <Navigation>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/library">Library</Link>
      <Link href="/results">Results</Link>
      <Link href="/settings">Settings</Link>
    </Navigation>
    <UserProfile />
  </Sidebar>

  <div className="flex-1">
    <Header>                  {/* Top header */}
      <Breadcrumbs />
      <UserButton />
    </Header>

    <main>{children}</main>   {/* Dashboard content */}
  </div>
</div>
```

**Sorumluluklar:**
- ✅ Sidebar (Sol menü)
- ✅ Header (Breadcrumbs + User button)
- ✅ Navigation links
- ✅ Auth check (Clerk yoksa development mode)

**Sayfalar:**
- `/dashboard` - Main dashboard (quick calculator)
- `/library` - Custom machines & materials
- `/results` - Calculation results
- `/settings/team` - Team management
- `/settings/security` - Security settings

---

## 🎨 Visual Difference

### Landing Page (`/`)
```
┌────────────────────────────────────┐
│  [Logo]              [Sign In]     │ ← Navbar (transparent)
├────────────────────────────────────┤
│                                    │
│        LANDING PAGE CONTENT        │
│     (No sidebar, full width)       │
│                                    │
├────────────────────────────────────┤
│  Links  |  Copyright  | Language   │ ← Footer
└────────────────────────────────────┘
```

### Dashboard (`/dashboard`)
```
┌──────┬─────────────────────────────┐
│ SIDE │  [Breadcrumbs]   [User]     │ ← Header
│ BAR  ├─────────────────────────────┤
│      │                             │
│ Home │    DASHBOARD CONTENT        │
│ Dash │   (Quick Calculator)        │
│ Lib  │                             │
│ Res  │                             │
│ Set  │                             │
│      │                             │
│ User │                             │
└──────┴─────────────────────────────┘
```

---

## 🔄 Navigation Flow

### Public → Auth Flow
```
1. User visits: http://localhost:3000/
   ↓
2. Sees: Marketing layout (Navbar + Landing page + Footer)
   ↓
3. Clicks: "Sign In" button
   ↓
4. Redirects: /sign-in (still marketing layout)
   ↓
5. After auth: /dashboard (dashboard layout)
```

### Direct Dashboard Access
```
1. User visits: http://localhost:3000/dashboard
   ↓
2. Middleware check:
   - Clerk enabled? → Check auth
   - Clerk disabled? → Allow (dev mode)
   ↓
3. Shows: Dashboard layout (Sidebar + Content)
```

---

## 📝 Key Files

| File | Purpose | Layout Group |
|------|---------|--------------|
| `app/(marketing)/page.tsx` | Landing page | Marketing |
| `app/(marketing)/layout.tsx` | Marketing layout | - |
| `app/(dashboard)/dashboard/page.tsx` | Main dashboard | Dashboard |
| `app/(dashboard)/layout.tsx` | Dashboard layout | - |
| `app/layout.tsx` | Root layout | - |
| `middleware.ts` | Clerk auth protection | - |

---

## 🎯 Benefits

### 1. Separation of Concerns
- ✅ Marketing pages don't have dashboard sidebar
- ✅ Dashboard pages don't have marketing footer
- ✅ Each group has its own layout logic

### 2. Code Organization
- ✅ Clear distinction between public vs authenticated
- ✅ Easy to find files (grouped by purpose)
- ✅ Scalable structure (add new pages easily)

### 3. Performance
- ✅ Marketing layout loads faster (no sidebar)
- ✅ Dashboard layout loads sidebar once (shared across pages)
- ✅ Next.js caching optimized per group

---

## 🛠️ Common Tasks

### Add New Marketing Page
```bash
# Create: app/(marketing)/pricing/page.tsx
# URL: http://localhost:3000/pricing
# Layout: Navbar + Footer (no sidebar)
```

### Add New Dashboard Page
```bash
# Create: app/(dashboard)/analytics/page.tsx
# URL: http://localhost:3000/analytics
# Layout: Sidebar + Header
```

### Change Marketing Navbar
```bash
# Edit: app/(marketing)/layout.tsx
# Affects: /, /docs, /sign-in, /sign-up
```

### Change Dashboard Sidebar
```bash
# Edit: app/(dashboard)/layout.tsx
# Affects: /dashboard, /library, /results, /settings
```

---

## 🚀 Testing

### Marketing Layout
```bash
# Visit these URLs - should have NO SIDEBAR:
http://localhost:3000/          # Landing page
http://localhost:3000/docs      # Documentation
http://localhost:3000/sign-in   # Sign in
```

### Dashboard Layout
```bash
# Visit these URLs - should have SIDEBAR:
http://localhost:3000/dashboard       # Main dashboard
http://localhost:3000/library         # Library
http://localhost:3000/results         # Results
http://localhost:3000/settings/team   # Team settings
```

---

## ✅ Architecture Checklist

- [x] Route groups created: `(marketing)` and `(dashboard)`
- [x] Marketing layout: Navbar + Footer (no sidebar)
- [x] Dashboard layout: Sidebar + Header
- [x] Root layout: ClerkProvider + global providers
- [x] Landing page: `(marketing)/page.tsx`
- [x] Dashboard: `(dashboard)/dashboard/page.tsx`
- [x] Clean URL structure (no `/marketing/` or `/dashboard/` in URLs)
- [x] Build successful (21 routes compiled)

---

**🎉 Mimari temiz ve profesyonel!**
