# CarbonCAM Development Scripts

## Start Backend (Development)
```powershell
# Windows PowerShell
cd C:\SaaS
.venv\Scripts\activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

```bash
# Linux/Mac
cd /path/to/SaaS
source .venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Start Frontend (Development)
```powershell
cd C:\SaaS\web
npm run dev
```

## Start Both with Docker Compose
```bash
docker-compose up
```

## Build for Production
```bash
# Backend
docker build -t carboncam-backend -f Dockerfile .

# Frontend
cd web
npm run build
npm start
```

## Run Tests
```bash
# Backend tests
pytest

# Frontend tests
cd web
npm test
```

## Code Quality
```bash
# Python
black .
isort .
mypy carboncam_engine/ main.py
pylint carboncam_engine/ main.py

# Frontend
cd web
npm run lint
npx tsc --noEmit
```

## Database Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push

# Or manually run SQL files
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/migrations/FILENAME.sql
```

## Environment Setup Checklist

### Backend (.env.local)
- [ ] SUPABASE_URL
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] CARBONCAM_API_URL (for development: http://localhost:8000)
- [ ] CORS_ALLOW_ORIGINS (for development: http://localhost:3000)
- [ ] RESEND_API_KEY (optional)
- [ ] SENTRY_DSN (optional)

### Frontend (web/.env.local)
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- [ ] CLERK_SECRET_KEY
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] CARBONCAM_API_URL (http://localhost:8000 for dev)
- [ ] RESEND_API_KEY (optional)
- [ ] SENTRY_DSN (optional)
- [ ] NEXT_PUBLIC_CRISP_WEBSITE_ID (optional)

## Troubleshooting

### Port Already in Use
```powershell
# Windows - Kill process on port 8000
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force

# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Python Virtual Environment Issues
```powershell
# Delete and recreate
Remove-Item -Recurse -Force .venv
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Node Modules Issues
```powershell
# Clean install
cd web
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install --legacy-peer-deps
```

### Database Connection Issues
- Verify Supabase credentials in .env.local
- Check if IP is whitelisted in Supabase dashboard
- Ensure database is not paused (free tier auto-pauses after inactivity)

## Production Deployment

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set environment variables from .env.example
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)
1. Connect GitHub repository
2. Root directory: `web`
3. Build command: `npm run build`
4. Install command: `npm install --legacy-peer-deps`
5. Output directory: `.next`
6. Set all environment variables from web/.env.example

### Database (Supabase)
1. Run migrations from `supabase/migrations/` in order
2. Or use Supabase CLI: `supabase db push`
3. Verify all tables are created
4. Run seed data if needed: `psql < supabase/seed.sql`
