# 🚀 GitHub Pages Deployment Guide

## Quick Deploy to GitHub Pages

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - KAIST Companion WebApp"
git branch -M main
git remote add origin https://github.com/yayme/kaist-companion-webapp.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. The workflow will automatically deploy on push

### Step 3: Access Your Site

Your site will be available at:
```
https://yayme.github.io/kaist-companion-webapp/
```

---

## Important Notes for GitHub Pages

### ✅ What Works
- ✅ All React components (client-side)
- ✅ Real-time shuttle tracking
- ✅ Interactive map and search
- ✅ Checklist with localStorage
- ✅ Static data from JSON files
- ✅ All styling and responsiveness

### ⚠️ Limitations
- ❌ No server-side rendering (SSR)
- ❌ No API routes (static site only)
- ❌ Python scraper needs separate automation

### Menu Data Solution
The menu display component uses mock data by default. To add real menu data:

**Option 1: GitHub Actions (Recommended)**
- Use the included workflow in `.github/workflows/scrape-menu.yml`
- Runs Python scraper on schedule
- Commits updated data back to repo

**Option 2: Manual Updates**
- Run scraper locally: `python backend/scraper/menu_scraper.py`
- Commit the generated `menu_data.json`
- Push to GitHub to trigger redeploy

**Option 3: External API**
- Host scraper on another service (Heroku, Railway, etc.)
- Update `DailyMenuDisplay.tsx` to fetch from external API

---

## Repository Setup for Subdirectory

If deploying to `https://username.github.io/repo-name/`:

1. Edit `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/kaist-companion-webapp', // Your repo name
  images: { unoptimized: true },
}
```

2. Rebuild and push:
```bash
npm run deploy
git push
```

---

## Custom Domain (Optional)

1. Add a `CNAME` file to `/public` with your domain:
```
kaist-companion.com
```

2. Configure DNS with your domain provider:
```
Type: CNAME
Host: @
Value: yayme.github.io
```

3. Enable "Enforce HTTPS" in GitHub Pages settings

---

## Automated Deployment

The included workflow (`.github/workflows/deploy.yml`) automatically:
- ✅ Installs dependencies
- ✅ Builds the Next.js app
- ✅ Exports to static HTML
- ✅ Deploys to GitHub Pages

**Triggers:**
- Push to `main` branch
- Manual trigger via Actions tab

---

## Local Testing Before Deploy

Test the static export locally:

```bash
# Build static site
npm run build

# Serve the out folder (install serve first: npm install -g serve)
npx serve out

# Or use Python
cd out
python -m http.server 3000
```

---

## Troubleshooting

### Build fails in GitHub Actions
- Check Node.js version (should be 18+)
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors: `npm run lint`

### Pages not loading correctly
- Verify `basePath` in `next.config.js` matches repo name
- Check browser console for errors
- Ensure `.nojekyll` file exists in `out/` folder

### Images not loading
- Images must be in `/public` folder
- Use `/image.png` paths (not `./image.png`)
- `images.unoptimized: true` is already set

### Styles not applying
- Tailwind CSS is built during export (works automatically)
- Clear browser cache and hard refresh

---

## File Structure for GitHub

```
kaist-companion-webapp/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Auto-deployment workflow
├── public/
│   └── .nojekyll              ← Tells GitHub to skip Jekyll
├── app/                        ← Next.js pages (static exported)
├── components/                 ← React components
├── data/                       ← Static JSON data
├── out/                        ← Generated static site (git ignored)
└── next.config.js             ← Static export configuration
```

---

## Backend Scraper with GitHub Actions

Create `.github/workflows/scrape-menu.yml`:

```yaml
name: Scrape Menu Daily
on:
  schedule:
    - cron: '0 6 * * *'  # 6 AM UTC daily
  workflow_dispatch:

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - run: pip install -r backend/requirements.txt
      - run: python backend/scraper/menu_scraper.py
      - name: Commit results
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add backend/scraper/menu_data.json
          git commit -m "Update menu data" || echo "No changes"
          git push
```

---

## GitHub Pages Checklist

- [ ] Repository pushed to GitHub
- [ ] GitHub Actions enabled in Settings → Pages
- [ ] `.nojekyll` file in `/public`
- [ ] `output: 'export'` in `next.config.js`
- [ ] Build succeeds locally (`npm run build`)
- [ ] Site loads at `username.github.io/repo-name`

---

## Alternative: Deploy from Branch

If you prefer traditional GitHub Pages:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy-branch": "gh-pages -d out"

# Deploy
npm run deploy-branch
```

Then set Source to `gh-pages` branch in Settings → Pages.

---

## Benefits of GitHub Pages

- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ CDN distribution (fast worldwide)
- ✅ Auto-deployment on push
- ✅ Custom domain support
- ✅ 100GB bandwidth/month

---

## Next Steps

1. **Push to GitHub** using the commands above
2. **Enable GitHub Actions** in repository settings
3. **Wait for deployment** (2-3 minutes)
4. **Visit your site** at the GitHub Pages URL
5. **Set up scraper** (optional) with GitHub Actions

Your KAIST Companion app is now live! 🎉

---

**Need Help?**
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- Check workflow logs in GitHub Actions tab
