# Daffodil Himalayan - Deployment Guide

## Production Environment Setup

### 1. Prerequisites
- Node.js >= 18.x
- MongoDB Server instance (Atlas or self-hosted)
- Process Manager: PM2 or Docker Container Engine

### 2. Environment Configuration
Create `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/daffodil_himalayan
JWT_SECRET=daffodil_super_secret_production_key_2026
NODE_ENV=production
REGISTRATION_NO=11-2279/2024-DTO-SML
```

### 3. Installation & Seeding
```bash
npm install
npm run seed
```

### 4. Running with PM2
```bash
npm install -g pm2
pm2 start backend/server.js --name "daffodil-himalayan"
```

### 5. Running with Docker Compose
```bash
docker-compose up --build -d
```
