# Installation & Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for the scraper)
- Git (optional)

## Quick Start

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies (for scraper)
pip install -r backend/requirements.txt
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run the Menu Scraper (Optional)

```bash
npm run scraper
# or
python backend/scraper/menu_scraper.py
```

## Detailed Setup

### Frontend Setup

1. **Clone or download the project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Available scripts:**
   ```bash
   npm run dev      # Start development server
   npm run build    # Build for production
   npm run start    # Start production server
   npm run lint     # Run ESLint
   ```

4. **Environment variables** (optional):
   Create a `.env.local` file for any API keys or configuration:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

### Backend Scraper Setup

1. **Create Python virtual environment (recommended):**
   ```bash
   cd backend
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the scraper:**
   ```bash
   cd scraper
   python menu_scraper.py
   ```

4. **Schedule automatic scraping:**
   
   **Windows Task Scheduler:**
   - Create a new task
   - Set trigger: Daily at 6:00 AM
   - Set action: `python C:\path\to\menu_scraper.py`

   **Linux/Mac Cron:**
   ```bash
   crontab -e
   # Add this line:
   0 6 * * * cd /path/to/backend/scraper && python menu_scraper.py
   ```

## Production Deployment

### Deploy to GitHub Pages (Free & Easy)

**This project is configured for GitHub Pages static hosting.**

See **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** for complete instructions.

Quick steps:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/kaist-companion-webapp.git
git push -u origin main
```

Then enable GitHub Pages in repository Settings → Pages → Source: GitHub Actions

### Alternative: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Note:** Remove `output: 'export'` from `next.config.js` for Vercel

3. **Deploy:**
   ```bash
   vercel
   ```

### Deploy Backend Scraper

The scraper can run as:
- **Cron job** on a server
- **Cloud function** (AWS Lambda, Google Cloud Functions)
- **GitHub Actions** workflow (scheduled)

Example GitHub Actions workflow:

```yaml
# .github/workflows/scrape-menu.yml
name: Scrape KAIST Menu
on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM UTC
  workflow_dispatch:

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - run: pip install -r backend/requirements.txt
      - run: python backend/scraper/menu_scraper.py
      - name: Upload menu data
        uses: actions/upload-artifact@v2
        with:
          name: menu-data
          path: backend/scraper/menu_data.json
```

## Troubleshooting

### Port 3000 already in use
```bash
# Find and kill the process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Python scraper issues
```bash
# Reinstall dependencies
pip install --upgrade -r backend/requirements.txt

# Check Python version
python --version  # Should be 3.8+
```

## Development Tips

1. **Hot reload:** Changes to files automatically trigger browser refresh

2. **TypeScript errors:** Check the terminal and browser console for detailed error messages

3. **Tailwind CSS:** Use the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for VS Code

4. **Data updates:** Modify JSON files in `/data` to see immediate changes

5. **Component testing:** Each page imports its main component - test components individually

## Next Steps

- Customize the KAIST brand colors in `tailwind.config.js`
- Add more building data in `data/campus.json`
- Enhance the scraper with actual KAIST website selectors
- Integrate Google Maps API for the interactive map
- Add authentication for personalized features
- Create API endpoints in `app/api/` for dynamic data
