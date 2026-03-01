# 🏛️ Civic Action Intelligence Platform

An AI-powered civic engagement platform that empowers citizens to report local environmental and infrastructure issues, receive actionable guidance, and track community progress — all with transparency and accountability.

## ✨ Features

- **📷 Image-Based Reporting** — Upload photos of civic issues (pollution, road damage, tree cutting, waste dumping)
- **🤖 AI Analysis (GPT-4o Vision)** — Automatic categorization, severity assessment, and structured 3-level action guidance
- **📊 Transparency Dashboard** — Public view of all reported issues with category filtering and status tracking
- **🔒 Security** — Helmet, rate limiting, file validation, and input sanitization
- **☁️ Cloud-Ready** — Designed for MongoDB Atlas + Cloudinary (works locally without them)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite, Lucide Icons, Framer Motion |
| **Backend** | Node.js, Express 5, Mongoose |
| **AI** | OpenAI GPT-4o Vision API |
| **Database** | MongoDB Atlas (or local MongoDB) |
| **Storage** | Cloudinary (or local `/uploads`) |
| **Security** | Helmet, express-rate-limit, Multer validation |

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas URI)
- OpenAI API Key

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/civic-action-platform.git
cd civic-action-platform

# Install dependencies (all-in-one)
npm run install-all

# Configure environment
cp .env.example .env
# Edit .env with your keys
```

### Running Locally

#### Option 1: Standard Development (Recommended for local tests)
```bash
# In one terminal, start the backend
cd server
node index.js

# In a second terminal, start the frontend
cd client
npm run dev
```

#### Option 2: Vercel CLI (Simulates production functions)
```bash
# Requires Vercel CLI: npm install -g vercel
vercel dev
```

### Environment Variables (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/civic_action
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development

# Optional (for cloud image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📁 Project Structure

```
civic-action-platform/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # UI Components
│   │   ├── App.jsx            # Routing
│   │   └── index.css          # Design System
│   └── package.json
├── server/                    # Express Backend
│   ├── config/                # DB & Cloudinary config
│   ├── controllers/           # Request handlers
│   ├── middleware/             # Upload, rate limiting
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   ├── services/              # AI service
│   └── index.js               # Entry point
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT License
