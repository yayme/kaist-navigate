# KAIST Newcomer & Visitor Companion WebApp

A comprehensive web application to help newcomers and visitors navigate KAIST campus with ease.

## Features

- 🚌 **Transportation Module**: Real-time shuttle tracking with countdown timers
- 🍽️ **Dining Module**: Daily menu displays for all campus cafeterias
- 🗺️ **Interactive Campus Map**: Searchable building directory with key facilities
- ✅ **Newcomer Onboarding**: Interactive checklist with progress tracking
- 📞 **Emergency Contacts**: Quick access to essential campus services

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Backend**: Python scraper for menu data
- **Data Storage**: JSON files for static data, Local Storage for user progress

## Project Structure

```
kaist-companion-webapp/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── dining/            # Dining module
│   ├── transport/         # Transportation module
│   ├── map/               # Campus map
│   └── guide/             # Newcomer guide
├── components/            # React components
│   ├── navigation/        # Navigation components
│   ├── dining/           # Dining-related components
│   ├── transport/        # Transport components
│   ├── map/              # Map components
│   └── guide/            # Guide components
├── lib/                   # Utilities and helpers
├── data/                  # Static JSON data
├── backend/              # Backend services
│   └── scraper/          # Web scrapers
└── public/               # Static assets
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for GitHub Pages

```bash
npm run deploy
```

This creates an optimized static export in the `out/` folder.

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The included workflow will auto-deploy on push to main

Alternatively, enable GitHub Pages from the `gh-pages` branch.

### Running the Menu Scraper

```bash
npm run scraper
```

Note: The scraper runs separately from the static site. Use GitHub Actions to automate it.

## Data Sources

- Transportation schedules: Static data from KAIST Handbook
- Dining menus: Scraped from https://www.kaist.ac.kr/en/html/campus/053001.html
- Building information: Static data from KAIST Handbook
- Emergency contacts: Official KAIST information

## Deployment

This project is optimized for **GitHub Pages** deployment.

See **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** for complete deployment instructions.

## License

MIT
