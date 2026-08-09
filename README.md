# CarbonCAM - Carbon Footprint Tracking for Manufacturing

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Node 18+](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/)

CarbonCAM is a comprehensive SaaS platform for tracking and analyzing the carbon footprint of manufacturing processes. Built with Next.js, FastAPI, and Supabase.

## 🚀 Features

- **Real-time Carbon Calculations**: Calculate carbon emissions from machining operations
- **Batch Processing**: Upload and process multiple calculations via Excel
- **Asset Library**: Manage machines and materials with custom carbon factors
- **Multi-language Support**: English, German, and Turkish
- **Team Management**: Role-based access control with Clerk authentication
- **API Access**: RESTful API with rate limiting and API key management
- **Audit Logging**: Track all actions across your organization
- **Email Notifications**: Automated alerts and reports via Resend

## 📋 Prerequisites

- **Node.js** 18+ and npm/pnpm/yarn
- **Python** 3.11+
- **Supabase** account (for database)
- **Clerk** account (for authentication)
- **Resend** account (for emails, optional)
- **Sentry** account (for error tracking, optional)

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Clerk** - Authentication and user management
- **next-intl** - Internationalization
- **Recharts** - Data visualization
- **Driver.js** - Interactive tours

### Backend
- **FastAPI** - Python API framework
- **Uvicorn** - ASGI server
- **Pandas** - Data processing
- **FPDF2** - PDF generation
- **Supabase** - PostgreSQL database
- **Redis** - Rate limiting (optional)
- **Sentry** - Error monitoring

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/carboncam.git
cd carboncam
```

### 2. Environment Variables

Copy the example environment files and fill in your credentials:

```bash
# Root level (for Python backend)
cp .env.example .env.local

# Web directory (for Next.js frontend)
cp web/.env.example web/.env.local
```

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `CARBONCAM_API_URL` - Backend API URL
- `RESEND_API_KEY` - Resend API key (optional)
- `SENTRY_DSN` - Sentry DSN (optional)

### 3. Database Setup

Run Supabase migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

Or manually execute the migration files in order from `supabase/migrations/`

### 4. Backend Setup (Python)

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 5. Frontend Setup (Next.js)

```bash
cd web
npm install
# or
pnpm install
# or
yarn install
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend (FastAPI):**
```bash
# Make sure virtual environment is activated
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd web
npm run dev
```

Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Production Build

**Backend:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Frontend:**
```bash
cd web
npm run build
npm start
```

## 📁 Project Structure

```
carboncam/
├── api/                      # Vercel serverless functions
├── carboncam_engine/         # Python calculation engine
│   ├── machining.py          # Machining calculations
│   └── email_service.py      # Email sending service
├── docs/                     # Documentation
├── supabase/                 # Database migrations and seed
│   └── migrations/           # SQL migration files
├── web/                      # Next.js frontend
│   ├── app/                  # App router pages
│   ├── emails/               # Email templates
│   ├── locales/              # i18n translations
│   └── public/               # Static assets
├── main.py                   # FastAPI application
├── requirements.txt          # Python dependencies
└── vercel.json              # Vercel deployment config
```

## 🔧 Configuration

### Rate Limiting

The API uses SlowAPI for rate limiting. Configure in [main.py](main.py):
- Default: 100 requests per minute
- Authenticated users: Higher limits based on plan

### Email Templates

Customize email templates in:
- Python: `carboncam_engine/email_templates/`
- React Email: `web/emails/templates/`

### Internationalization

Add translations in `web/locales/`:
- `en.json` - English
- `de.json` - German  
- `tr.json` - Turkish

## 🧪 Testing

```bash
# Backend tests
pytest

# Frontend tests
cd web
npm test
```

## 📊 API Documentation

Visit `/docs` endpoint when running the backend to see interactive Swagger documentation.

Key endpoints:
- `POST /calculate` - Calculate single carbon footprint
- `POST /batch/process` - Process Excel batch
- `GET /library/machines` - List machines
- `GET /library/materials` - List materials
- `POST /developer/api-key` - Manage API keys

## 🚢 Deployment

### Vercel (Recommended for Frontend)

```bash
cd web
vercel
```

### Render/Railway (Backend)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy with build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Docker

```bash
# Build
docker-compose build

# Run
docker-compose up
```

## 🔐 Security

- All API endpoints are protected with Clerk authentication
- API keys are hashed before storage
- Rate limiting prevents abuse
- CORS configured for production domains
- Sentry for error tracking and monitoring

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support, email support@carboncam.com or join our Discord channel.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Database by [Supabase](https://supabase.com/)
- Authentication by [Clerk](https://clerk.com/)
- Email by [Resend](https://resend.com/)
