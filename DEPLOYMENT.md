# Birthday Website - Deployment Guide

## Overview
This is a Next.js application built with React, Tailwind CSS, GSAP animations, and Framer Motion. The site runs on port 5000 by default.

---

## Local Development

### Quick Start
**Windows Users:** Double-click `.dev-startup.bat` to automatically install dependencies and start the dev server.

**Manual Start:**
```bash
npm install
npm run dev
```

The development server will run at `http://localhost:5000`

---

## Production Build

### Local Production Testing
**Windows Users:** Double-click `.prod-startup.bat` to build and start the production server.

**Manual Build:**
```bash
npm install
npm run build
npm start
```

The production server will run at `http://localhost:5000`

---

## Deployment Options

### Option 1: Deploy to Vercel (Recommended - Free)
Vercel is the official hosting for Next.js applications.

1. **Create a Vercel Account**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Connect Your Repository**
   - Go to your Vercel dashboard
   - Click "New Project"
   - Select your GitHub repository (happy)
   - Click "Import"

3. **Configure Settings**
   - Framework: Next.js (auto-detected)
   - Leave other settings as default
   - Click "Deploy"

4. **View Your Site**
   - Your site will be live at a URL like: `https://yourproject.vercel.app`
   - Custom domain can be added in project settings

### Option 2: Deploy to Netlify

1. **Create a Netlify Account**
   - Visit [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy**
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

### Option 3: Deploy to Traditional Hosting (VPS/Shared Hosting)

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   - Copy all files to your server
   - Ensure Node.js is installed (v18+)

3. **Install Dependencies on Server**
   ```bash
   npm install --production
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Use PM2 for Auto-Restart (Optional but Recommended)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "birthday-site" -- start
   pm2 startup
   pm2 save
   ```

### Option 4: Docker Deployment

1. **Create Dockerfile** (if not exists)
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. **Build Docker Image**
   ```bash
   docker build -t birthday-site .
   ```

3. **Run Container**
   ```bash
   docker run -p 5000:5000 birthday-site
   ```

---

## Environment Setup

### Environment Variables (Optional)
Create a `.env.local` file for any environment-specific settings:

```
# Example - not required for current setup
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Performance Optimization

### Already Configured:
- ✅ Image optimization (unoptimized for static hosting)
- ✅ CSS optimization with Tailwind
- ✅ GSAP animations
- ✅ Framer Motion for smooth transitions
- ✅ No-cache headers to ensure fresh content

### Additional Tips:
1. Use a CDN (CloudFlare, Bunny CDN) for faster asset delivery
2. Enable GZIP compression on your server
3. Monitor performance at [PageSpeed Insights](https://pagespeed.web.dev)

---

## Troubleshooting

### Port Already in Use
If port 5000 is in use, the scripts will fail. To fix:
```bash
# Find process on port 5000 (Windows)
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3000
```

### Build Fails
1. Clear cache: `rm -rf .next` (or `rmdir /s .next` on Windows)
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node version: `node --version` (should be v18+)

### High Memory Usage
- The animations and floating elements may use more memory
- Consider reducing animation counts in components if needed
- Use browser DevTools to profile performance

---

## Maintenance

### Update Dependencies
```bash
npm update
npm run build
```

### Monitor Deployment
- **Vercel:** Built-in analytics and monitoring
- **Netlify:** Built-in analytics dashboard
- **VPS:** Use PM2 or Docker monitoring tools

---

## Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `.dev-startup.bat` | Windows quick dev start |
| `.prod-startup.bat` | Windows quick production start |

---

## Support

For issues with Next.js, refer to the official documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Last Updated:** December 4, 2025
**Project:** Birthday Website for Sabriin
