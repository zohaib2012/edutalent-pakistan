# EduTalent Pakistan

Pakistan's Largest Online Scholarship Testing System - For Grade 1 to University Students.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| File Storage | Cloudinary |

## Project Structure

```
├── client/              # React Frontend
│   └── src/
│       ├── pages/       # All website pages
│       └── services/    # API services
├── server/              # Node.js Backend
│   └── src/
│       ├── models/      # MongoDB schemas
│       ├── routes/      # API routes
│       ├── controllers/ # Business logic
│       └── middleware/  # Auth, upload, etc.
├── api/                 # Vercel serverless entry
└── vercel.json          # Vercel deployment config
```

## Local Development

```bash
# Terminal 1 - Backend
cd server && npm install && npm run dev

# Terminal 2 - Frontend
cd client && npm install && npm run dev

# Seed demo data (needs MongoDB)
cd server && npm run seed
```

## Demo Credentials

| Panel | URL | Email/Reg# | Password |
|-------|-----|------------|----------|
| Admin | /admin/login | admin@edutalent.edu.pk | admin123 |
| Student | /login | ETP-2025-P1-0001 | student123 |

## Deployment

### Frontend + Backend on Vercel
1. Connect GitHub repo to Vercel
2. Set Environment Variables in Vercel:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_ADMIN_SECRET=your_admin_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email
   SMTP_PASS=your_password
   CLIENT_URL=https://your-domain.vercel.app
   ```
3. Deploy - Vercel auto-detects Vite + serverless functions
